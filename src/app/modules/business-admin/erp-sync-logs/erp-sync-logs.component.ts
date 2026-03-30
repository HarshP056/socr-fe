import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { ERPDialogComponent } from './component/erp-dialog.component';
import { MessageUserService, MiscService, LogicalSystemService, ERPSyncService } from 'src/app/services';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { BasicModalComponent } from 'src/app/shared/modals/basic-modal/basic-modal.component';

interface queryParams {
  page: number;
  order: string;
  limit: number;
}

interface searchParams {
  type: string;
  uuid: string;
}

@Component({
  selector: 'erp-sync-logs',
  templateUrl: './erp-sync-logs.component.html',
  styleUrls: ['./erp-sync-logs.component.scss'],
})
export class ERPSyncLogsComponent implements OnInit, OnDestroy {
  erpSyncLogs: any[] = [];
  logicalSytemList: any[] = [];
  subTypeList:any[] = ['SYNC','ACK'];
  displayedColumns: string[] = [
    'uuid',
    'type',
    'subType',
    'error',
    'logicalSystem',
    'response',
    'lastUpdated',
    'status',
    'action',
  ];

  searchParams: any = {
    type: '',
    uuid: '',
    logicalSystem: ''
  };

  queryParams: any = {
    page: 1,
    order: '-lastUpdated',
    limit: 10,
    type: '',
    uuid: '',
    logicalSystem: '',
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

  @ViewChild('addAdvancedSearchModal', { static: false })
  addAdvancedSearchModal: BasicModalComponent;
  @ViewChild('addAdvancedSearchView', { static: false })
  addAdvancedSearchView: TemplateRef<any>;

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
    this.initialLoader = true;
    this.getLogicalSystem();
    this.getUrlParams();
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
    };
    if (this.searchParams.type) obj['type'] = this.searchParams.type;
    if (this.searchParams.type) obj['subType'] = this.searchParams.subType;
    if (this.searchParams.uuid) obj['uuid'] = this.searchParams.uuid;
    if (this.searchParams.logicalSystem)
      obj['logicalSystem'] = this.searchParams.logicalSystem;
    if (this.queryParams?.lastUpdated?.length > 0){
      obj['fromDate'] = this.queryParams.fromDate.split('T')[0];
      obj['toDate'] = this.queryParams.toDate.split('T')[0];
    }
    return obj;
  }

  getExceptions() {
    this.erpSyncService.getErpSyncLogs(this.getArgsObj()).subscribe({
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
          this.searchParams.type,
          this.searchParams.subType,
          this.searchParams.uuid,
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

  // onPageChange(event: PageEvent) {
  //   this.initialLoader = true;
  //   this.queryParams.limit = event.pageSize;
  //   this.pageInd = event.pageIndex;
  //   this.queryParams.page = event.pageIndex + 1;
  //   this.getExceptions();
  // }

  // sortChange(sort: Sort) {
  //   if (sort.direction === 'asc') {
  //     this.queryParams.order = '-' + sort.active;
  //   } else if (sort.direction === 'desc') {
  //     this.queryParams.order = sort.active;
  //   }
  //   this.getExceptions();
  // }

  openDialog(id: string) {
    this.dialog.open(ERPDialogComponent, {
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
    this.getExceptions();
  }

  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.queryParams.order = '-' + sort.active;
    } else if (sort.direction === 'desc') {
      this.queryParams.order = sort.active;
    }
    this.getExceptions();
  }

  private updateQueryParams(
    _limit: number,
    _page: number,
    _order: string,
    _type: string,
    _subType: string,
    _uuid: any | '',
    _logicalSystem: any | '',
    _fromDate: string,
    _toDate: string,
    _lastUpdated: string,
  ) {
    const queryParams: any = {
      limit: _limit,
      page: _page,
      order: _order,
      type: _type,
      subType: _subType,
      uuid: _uuid || '',
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
      this.getExceptions();
    });
  }

  search() {
    this.isLoading = true;
    // this.searchParams.query = this.searchForm.query || '';
    this.queryParams.page = 1;
    this.pageInd = 0;
    this.getExceptions();
  }

  reset() {
    this.resettingLoader = true;
    this.queryParams.order = '-lastUpdated';
    // this.queryParams.orderBy = 'agentId';
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
      '',
      '',
      ''
    );
    this.searchParams = {};
    this.queryParams.fromDate = '';
    this.queryParams.toDate = '';
    this.queryParams.lastUpdated = [];
    this.resettingLoader = true;
    this.getExceptions();
  }

  downloadERPXML(id:any){
    console.log("hello")
    this.erpSyncService.downloadERP(id).subscribe({
      next: (res: any) => {
        const file = new File([res], id, {type:'application/xml'})
        let url = URL.createObjectURL(file)
        const a = document.createElement('a')
        a.href = url
        a.download = file.name
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      },
      error: (err: any) => {
        console.log(err.error.text);
      }
    })
  }

  onDateRangeSelected() {
    if (this.queryParams.lastUpdated?.length) {
      this.queryParams.fromDate = moment.utc(this.queryParams.lastUpdated[0])
        .startOf('day')
        .toISOString();
      this.queryParams.toDate = moment.utc(this.queryParams.lastUpdated[1])
        .endOf('day')
        .toISOString();
    }
    console.log(this.queryParams)
  }

  removeDate() {
    this.queryParams.lastUpdated = [];
    this.queryParams.fromDate = '';
    this.queryParams.toDate = '';
  }

  ngOnDestroy(): void {
    this.messageSer.appSidebar = true;
  }

  openAdvancedSearchPopUp() {
    this.addAdvancedSearchModal.templateRef = this.addAdvancedSearchView;
    this.addAdvancedSearchModal.show();
  }

}
