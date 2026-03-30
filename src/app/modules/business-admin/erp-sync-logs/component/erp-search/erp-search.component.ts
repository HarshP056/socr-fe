import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { ERPSyncService, MiscService, LogicalSystemService, MessageUserService } from 'src/app/services';
import { ERPDialogComponent } from '../erp-dialog.component';
import { Location } from '@angular/common';

interface queryParams {
  page: number;
  order: string;
  limit: number;
}

interface searchParams {
  query: string;
  logicalSystem: string;
}
@Component({
  selector: 'app-erp-search',
  templateUrl: './erp-search.component.html',
  styleUrls: ['./erp-search.component.scss']
})
export class ErpSearchComponent implements OnInit {
  @Output() onsubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onclose: EventEmitter<null> = new EventEmitter<null>();

  erpSyncLogs: any[] = [];
  logicalSytemList: any[] = [];
  subTypeList:any[] = ['SYNC','ACK'];
  displayedColumns: string[] = [
    'uuid',
    'lastUpdated',
    'action',
  ];

  searchParams: any = {
    query: '',
    logicalSystem: ''
  };

  queryParams: any = {
    page: 1,
    order: '-lastUpdated',
    limit: 10,
    logicalSystem: '',
    query: '',
    fromDate: '',
    toDate: '',
    lastUpdated:[]
  };
  totalElements: number = 0;
  pageInd: number = 0;
  isLoading: boolean = false;
  initialLoader: boolean = false;
  resettingLoader: boolean = false;
  maxDate = new Date();

  constructor(
    private erpSyncService: ERPSyncService,
    public dialog: NgDialogAnimationService,
    private miscService: MiscService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private logicalSystemService: LogicalSystemService,
    private messageSer: MessageUserService
  ) {
    this.messageSer.appSidebar = false;
  }

  ngOnInit(): void {
    this.initialLoader = false;
    this.getLogicalSystem();
    this.erpSyncLogs = [];
  }

  private getLogicalSystem() {
    this.logicalSystemService.getAllLogicalSystems().subscribe((res: any) => {
      this.logicalSytemList = res;
    });
  }

  private getArgsObj() {
    const obj: any = {
      limit: this.queryParams.limit,
      order: this.queryParams.order,
      page: this.queryParams.page,
      logicalSystem : this.searchParams.logicalSystem,
      query: this.searchParams.query
    };
    return obj;
  }

  openDialog(id: string) {
    this.dialog.open(ErpSearchComponent, {
      disableClose: true,
      height: '100%',
      width: '35%',
      animation: { to: 'left' },
      position: { top: '0px', bottom: '0px', right: '0px' },
      data: id,
    });
  }

  onPageChange(event: PageEvent) {
    this.initialLoader = true;
    this.queryParams.limit = event.pageSize;
    this.pageInd = event.pageIndex;
    this.queryParams.page = event.pageIndex + 1;
    this.getErpSyncXMLLikeLogs();
  }

  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.queryParams.order = '-' + sort.active;
    } else if (sort.direction === 'desc') {
      this.queryParams.order = sort.active;
    }
    this.getErpSyncXMLLikeLogs();
  }

  private updateQueryParams(
    _limit: number,
    _page: number,
    _order: string,
    _query: string,
    _logicalSystem: any | '',
    _fromDate: string,
    _toDate: string,
    _lastUpdated: string,
  ) {
    const queryParams: any = {
      limit: _limit,
      page: _page,
      order: _order,
      query: _query,
      logicalSystem: _logicalSystem || '',
      fromDate: _fromDate,
      toDate: _toDate,
      lastUpdated: _lastUpdated,
    };
    const url = this.router
      .createUrlTree([], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
      })
      .toString();
    this.location.replaceState(url);
  }

  getUrlParams() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (
        params['limit'] &&
        this.miscService.isPositiveInteger(params['limit'])
      ) {
        this.queryParams.limit = params['limit'];
      }
      if (
        params['page'] &&
        this.miscService.isPositiveInteger(params['page'])
      ) {
        this.queryParams.page = Number(params['page']);
        this.pageInd = Number(params['page']) - 1;
      }
      if (params['order']) {
        this.queryParams.order = params['order'];
      }

      if (params['uuid']) {
        this.searchParams.uuid = params['uuid'];
      }
      if (params['logicalSystem']) {
        this.searchParams.logicalSystem = params['logicalSystem'];
      }
      if (params['type']) {
        this.searchParams.uuid = params['type'];
      }
      this.getErpSyncXMLLikeLogs();
    });
  }

  search() {
    this.isLoading = true;
    this.queryParams.page = 1;
    this.pageInd = 0;
    this.getErpSyncXMLLikeLogs();
  }

  reset() {
    this.resettingLoader = true;
    this.queryParams.order = '-lastUpdated';
    this.searchParams.type = '';
    this.searchParams.subType = '';
    this.searchParams.uuid = '';
    this.queryParams.limit = 10;
    this.queryParams.page = 1;
    this.pageInd = 0;
    this.updateQueryParams(
      this.queryParams.limit,
      this.queryParams.page,
      (this.queryParams.order = '-lastUpdated'),
      '',
      '',
      '',
      '',
      ''
    );
    this.searchParams = {};
    this.queryParams.fromDate = '';
    this.queryParams.toDate = '';
    this.queryParams.lastUpdated = [];
    this.resettingLoader = true;
    this.getErpSyncXMLLikeLogs();
  }

  getErpSyncXMLLikeLogs() {
    this.erpSyncService.getErpSyncXMLLikeLogs(this.getArgsObj()).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.resettingLoader = false;
        this.initialLoader = false;
        this.erpSyncLogs = res.content;
        this.totalElements = res.totalElements;
        this.updateQueryParams(
          this.queryParams.limit,
          this.queryParams.page,
          this.queryParams.order,
          this.searchParams.query,
          this.searchParams.logicalSystem,
          this.queryParams.fromDate,
          this.queryParams.toDate,
          this.queryParams.lastUpdated
        );
        console.log(this.updateQueryParams)
      },
      error: (err: any) => {
        this.isLoading = false;
        this.resettingLoader = false;
        console.log(err);
      },
    });
  }

  downloadXML(item:any){
    const file = new File([item.data], item.uuid, {type:'application/xml'})
        let url = URL.createObjectURL(file)
        const a = document.createElement('a')
        a.href = url
        a.download = file.name
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
  }

  close() {
    this.onclose.emit();
  }


}
