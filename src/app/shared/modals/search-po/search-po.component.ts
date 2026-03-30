import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MessageService } from 'primeng/api';
import { VendorService, MiscService, LogicalSystemService, SystemConfigService } from 'src/app/services';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search-po',
  templateUrl: './search-po.component.html',
  styleUrls: ['./search-po.component.scss']
})
export class SearchPoComponent implements OnInit {
  @Output() onsubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onclose: EventEmitter<null> = new EventEmitter<null>();

  totlaElements: any;
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  displayedColumns: any[] = [
    'purchaseOrderNumber',
    'poDate',
    'supplierName',
    'status',
    'amount',
    'deliveryDate',
    'logicalSystem'
  ];
  page: number = 1;
  order: any = '-poDate';
  limits = [5, 10, 25, 50];
  limit: number = 10;
  pageInd: number = 0;
  orders: any[] = [];
  systems: any[] = [];
  selectedFile: File;
  systemConfig: any = {
    enable: false
  };


constructor(
  private vendorService: VendorService,
  private messageService: MessageService,
  private activatedRoute: ActivatedRoute,
  private router: Router,
  private location: Location,
  private misc: MiscService,
  private dialog: NgDialogAnimationService,
  private logicalService: LogicalSystemService,
  private systemConfigService: SystemConfigService
) {}

  ngOnInit(): void {
    this.initialLoader = true;
    this.getUrlParams();
    this.getLogicalSystem();
  }

  private updateQueryParams(
    _limit: number,
    _page: number,
    _order: string,
    _purchaseOrderNumber: string,
    _logicalSystem: string
  ) {
    const searchQueryParams: any = {
      limit: _limit,
      page: _page,
      order: _order,
      purchaseOrderNumber: _purchaseOrderNumber,
      logicalSystem: _logicalSystem,
    };
    const url = this.router
      .createUrlTree([], {
        relativeTo: this.activatedRoute,
        queryParams: searchQueryParams,
      })
      .toString();
    this.location.replaceState(url);
  }

  private getUrlParams() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['limit'] && this.misc.isPositiveInteger(params['limit'])) {
        this.searchQueryParams.limit = params['limit'];
        this.updateSize(params['limit']);
      }
      if (params['page'] && this.misc.isPositiveInteger(params['page'])) {
        this.searchQueryParams.page = Number(params['page']);
        this.page = Number(params['page']);
        this.pageInd = Number(params['page']) - 1;
      }
      if (params['order']) {
        this.searchQueryParams.order = params['order'];
        this.order = params['order'];
      }
      if (params['purchaseOrderNumber']) {
        this.searchQueryParams.purchaseOrderNumber = params['purchaseOrderNumber'];
      }
      if (params['logicalSystem']) {
        this.searchQueryParams.logicalSystem = params['logicalSystem'];
      }
      this.getAllPO();
    });
  }

  private updateSize(limit: number) {
    this.limit = limit;
    // update limits array if limit recived from URL parameters is not present
    if (!this.limits.includes(Number(limit))) {
      this.limits.push(Number(limit));
      this.limits.sort((a, b) => {
        return a - b;
      });
    }
  }

  searchQueryParams: any = {
    page: 1,
    order: '-poDate',
    limit: 10,
    purchaseOrderNumber: '',
    logicalSystem: '',
  };

  getAllPO() {
    this.isLoading = true;
    this.vendorService.getAllPO(this.searchQueryParams).subscribe(
      (res: any) => {
        this.orders = res.content;
        this.totlaElements = res.totalElements;
        this.isLoading = false;
        this.initialLoader = false;
        this.resettingLoader = false;
        this.updateQueryParams(
          this.searchQueryParams.limit,
          this.searchQueryParams.page,
          this.searchQueryParams.order,
          this.searchQueryParams.purchaseOrderNumber,
          this.searchQueryParams.logicalSystem
        );
      },
      (err) => {
        this.isLoading = false;
        this.resettingLoader = false;
      }
    );
  }

  reset(){
    this.resettingLoader = true;
    this.searchQueryParams.page = 1;
    this.searchQueryParams.order = '-poDate';
    this.searchQueryParams.purchaseOrderNumber = '';
    this.searchQueryParams.logicalSystem = '';
    this.pageInd = 0;

    this.updateQueryParams(
      this.searchQueryParams.limit,
      this.searchQueryParams.page,
      this.searchQueryParams.order,
      this.searchQueryParams.purchaseOrderNumber,
      this.searchQueryParams.logicalSystem);
      this.resettingLoader = true;
      this.getAllPO();
  }

  search() {
    this.isLoading = true;
    this.searchQueryParams.page = 1;
    this.getAllPO();
  }

  onPageChange(event: any) {
    this.initialLoader = true;
    this.pageInd = event.pageIndex;
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.searchQueryParams.page = this.page;
    this.searchQueryParams.limit = this.limit;
    this.getAllPO();
  }

  getLogicalSystem() {
    this.logicalService.getAllLogicalSystems().subscribe({
      next: (res: any) => {
        this.systems = res;
        this.initialLoader = false;
      },
      error: (err: any) => {
        this.initialLoader = false;
      },
    });
  }

  onFileSelected(event : any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onSelectPO(elem:any){
    this.onsubmit.emit(elem)
    this.reset();
  }

  close() {
    this.onclose.emit();
  }

}