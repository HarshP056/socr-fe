import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageUserService } from 'src/app/services';
import { XInvoiceMappingConfigService } from 'src/app/services/xinvoice-mapping-config.service';

@Component({
  selector: 'app-xinvoice-mapping-config-edit',
  templateUrl: './xinvoice-mapping-config-edit.component.html',
})
export class XInvoiceMappingConfigEditComponent implements OnInit, OnDestroy {
  editMode = 'new';
  configId: string = '';
  isWait = false;
  checkName = false;

  invoiceTypes = [
    'CII_XINVOICE',
    'UBL_PEPPOL_BIS_30',
    'UBL_GENERIC',
    'PAGERO_INTERNAL',
    'CUSTOM_XML',
  ];
  dataTypes = ['STRING', 'NUMBER', 'DATE'];

  showGuide = false;

  config: any = {
    name: '',
    invoiceType: '',
    namespaces: {},
    lineItemsXPath: '',
    headerMappings: [],
    lineItemMappings: [],
    applyDataDerivation: false,
    detectVendor: true,
    setInvoiceDocTypeFromRoot: false,
    skipEmptyLineItems: false,
    lineItemSkipWhenEmpty: [],
    concatenateAddress: false,
    checkPoForNaValues: false,
  };

  nsList: any[] = [];
  /** Comma-separated string for lineItemSkipWhenEmpty (UI binding) */
  lineItemSkipWhenEmptyStr = '';

  constructor(
    private configService: XInvoiceMappingConfigService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private messageSer: MessageUserService
  ) {
    this.messageSer.appSidebar = false;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.configId = params.id;
      if (this.configId) {
        this.editMode = 'edit';
        this.loadConfig();
      }
    });
  }

  ngOnDestroy(): void {
    this.messageSer.appSidebar = true;
  }

  private loadConfig(): void {
    this.configService.findById(this.configId).subscribe({
      next: (res: any) => {
        this.config = res;
        if (!this.config.headerMappings) this.config.headerMappings = [];
        if (!this.config.lineItemMappings) this.config.lineItemMappings = [];
        if (!Array.isArray(this.config.lineItemSkipWhenEmpty)) this.config.lineItemSkipWhenEmpty = [];
        this.lineItemSkipWhenEmptyStr = (this.config.lineItemSkipWhenEmpty || []).join(', ');
        this.namespacesToList();
        this.sortMappings(this.config.headerMappings);
        this.sortMappings(this.config.lineItemMappings);
      },
      error: () => {},
    });
  }

  private namespacesToList(): void {
    this.nsList = [];
    if (this.config.namespaces) {
      Object.keys(this.config.namespaces).forEach((key) => {
        this.nsList.push({ prefix: key, uri: this.config.namespaces[key] });
      });
    }
  }

  private listToNamespaces(): void {
    this.config.namespaces = {};
    this.nsList.forEach((ns) => {
      if (ns.prefix && ns.uri) {
        this.config.namespaces[ns.prefix] = ns.uri;
      }
    });
  }

  addNamespace(): void {
    this.nsList.push({ prefix: '', uri: '' });
  }

  removeNamespace(index: number): void {
    this.nsList.splice(index, 1);
  }

  // --- Sorting: keeps same targetFields grouped, sorted by priority within group ---

  sortMappings(mappings: any[]): void {
    mappings.sort((a: any, b: any) => {
      const fieldCmp = (a.targetField || '').localeCompare(b.targetField || '');
      if (fieldCmp !== 0) return fieldCmp;
      return (a.priority || 1) - (b.priority || 1);
    });
  }

  // --- Grouping helpers for the template ---

  isFirstInGroup(mappings: any[], index: number): boolean {
    if (index === 0) return true;
    return mappings[index].targetField !== mappings[index - 1].targetField;
  }

  isFallbackRow(mappings: any[], index: number): boolean {
    return !this.isFirstInGroup(mappings, index);
  }

  getGroupCount(mappings: any[], targetField: string): number {
    return mappings.filter((m: any) => m.targetField === targetField).length;
  }

  maxXmlPathWidth(mappings: any[]): number {
    const maxLen = mappings.reduce((max: number, m: any) => Math.max(max, (m.xmlPath || '').length), 0);
    return Math.max(maxLen, 30) + 4;
  }

  // --- Priority validation: warns if same targetField has duplicate priorities ---

  hasDuplicatePriority(mappings: any[], index: number): boolean {
    const current = mappings[index];
    if (!current.targetField) return false;
    return mappings.some(
      (m: any, i: number) =>
        i !== index &&
        m.targetField === current.targetField &&
        m.priority === current.priority
    );
  }

  // --- Add / Remove ---

  addMapping(mappings: any[]): void {
    mappings.push({
      targetField: '',
      xmlPath: '',
      priority: 1,
      dataType: 'STRING',
      dateFormat: '',
      valueRegex: '',
    });
  }

  addFallback(mappings: any[], index: number): void {
    const source = mappings[index];
    const maxPriority = mappings
      .filter((m: any) => m.targetField === source.targetField)
      .reduce((max: number, m: any) => Math.max(max, m.priority || 1), 0);

    const newRow = {
      targetField: source.targetField,
      xmlPath: '',
      priority: maxPriority + 1,
      dataType: source.dataType,
      dateFormat: source.dateFormat,
      valueRegex: source.valueRegex || '',
    };

    mappings.splice(index + 1, 0, newRow);
  }

  removeMapping(mappings: any[], index: number): void {
    const removed = mappings[index];
    mappings.splice(index, 1);
    this.renumberPriorities(mappings, removed.targetField);
  }

  private renumberPriorities(mappings: any[], targetField: string): void {
    if (!targetField) return;
    const group = mappings.filter((m: any) => m.targetField === targetField);
    group.sort((a: any, b: any) => (a.priority || 1) - (b.priority || 1));
    group.forEach((m: any, i: number) => m.priority = i + 1);
  }

  // --- On targetField change, re-sort so grouping stays correct ---

  onTargetFieldChange(mappings: any[]): void {
    this.sortMappings(mappings);
  }

  // --- Submit ---

  submit(): void {
    this.isWait = true;
    if (!this.config.name) {
      this.checkName = true;
      this.isWait = false;
      return;
    }
    this.listToNamespaces();
    this.config.lineItemSkipWhenEmpty = this.lineItemSkipWhenEmptyStr
      .split(',')
      .map((s: string) => s.trim())
      .filter(Boolean);

    if (this.editMode === 'edit') {
      this.configService.update(this.configId, this.config).subscribe({
        next: () => { this.isWait = false; this.onBack(); },
        error: () => { this.isWait = false; },
      });
    } else {
      this.configService.create(this.config).subscribe({
        next: () => { this.isWait = false; this.onBack(); },
        error: () => { this.isWait = false; },
      });
    }
  }

  onBack(): void {
    this.location.back();
  }
}
