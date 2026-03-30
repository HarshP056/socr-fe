import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MiscService, DocIdLogService, RegionService, MessageUserService, CommonService } from 'src/app/services';
import { Location } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-file-logs',
  templateUrl: './file-logs.component.html',
  styleUrls: ['./file-logs.component.scss']
})
export class FileLogsComponent implements OnInit {

displayedColumns: any[] = [
    'channelName',
    'fileName',
    'docId',
    'processedDateTime',
    'status',
    'reason',
    'action'
  ];
  fileLogs: any[] = [];
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  dataSource!: MatTableDataSource<any>;
  pageEvent: PageEvent;
  order = '-processedDateTime';
  limit: number = 10;
  limits = [5, 10, 25, 50];
  page: number = 1;
  queryParams: any = {
    limit: this.limit,
    order: this.order,
    page: this.page,
    channelName: '',
    fileName: '',
    docId: '',
    status: '',
    reason:'',
    dateRange: [],
    fromDate: '',
    toDate: ''
  };

  statusList: any[] = [
    { name: 'Processed', value: 'Processed' },
    { name: 'Failed', value: 'Failed' },
  ];
  maxDate = new Date();
  totalElements: number = 0;
  pageInd: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private misc: MiscService,
    private commonService: CommonService,
    private messageSer: MessageUserService
  ) {
    this.messageSer.appSidebar = false;
  }

  ngOnInit(): void {
    this.initialLoader = true;
    this.getUrlParams();
  }


  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.order = sort.active;
      this.queryParams.order = this.order;
      this.page;
      this.limit;
      this.getLogs();
    } else if (sort.direction === 'desc') {
      this.order = '-' + sort.active;
      this.queryParams.order = this.order;
      this.page;
      this.limit;
      this.getLogs();
    }
  }

  onPaginateChange(event: any) {
    this.initialLoader = true;
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.queryParams.page = this.page;
    this.queryParams.limit = this.limit;
    this.getLogs();
  }

  private getArgsObj() {
    console.log(this.queryParams)
    const obj: any = {
      limit: this.limit,
      order: this.order,
      page: this.page,
    };
    if (this.queryParams.channelName) obj['channelName'] = this.queryParams.channelName;
    if (this.queryParams.fileName) obj['fileName'] = this.queryParams.fileName;
    if (this.queryParams.docId) obj['docId'] = this.queryParams.docId;
    if (this.queryParams.status) obj['status'] = this.queryParams.status;
    if (this.queryParams.reason) obj['reason'] = this.queryParams.reason;
    if (this.queryParams?.dateRange?.length > 0){
          obj['fromDate'] = moment(this.queryParams.fromDate).format('YYYY-MM-DD');
          obj['toDate'] = moment(this.queryParams.toDate).format('YYYY-MM-DD')
    }
    return obj;
  }

  getLogs() {
    console.log(this.getArgsObj)
    this.commonService.getFileLogs(this.getArgsObj()).subscribe({
      next: (res: any) => {
        this.fileLogs = res['content'];
        this.totalElements = res.totalElements;
        this.initialLoader = false;
        this.resettingLoader = false;
        this.isLoading = false;
        this.updateQueryParams(
          this.queryParams.limit,
          this.queryParams.page,
          this.queryParams.order,
          this.queryParams.channelName,
          this.queryParams.fileName,
          this.queryParams.docId,
          this.queryParams.status,
          this.queryParams.reason,
          this.queryParams.fromDate,
          this.queryParams.toDate
        );
      },
      error: (err: any) => {
        this.initialLoader = false;
        this.resettingLoader = false;
        this.isLoading = false;
      },
    });
  }

  private updateQueryParams(
    _limit: number,
    _page: number,
    _order: string,
    _channelName: string,
    _fileName: string,
    _docId: string,
    _status: string,
    _reason: string,
    _fromDate: string,
     _toDate: string,
  ) {
    const queryParams: any = {
      limit: _limit,
      page: _page,
      order: _order,
      channelName: _channelName,
      fileName: _fileName,
      docId: _docId,
      status: _status,
      reason: _reason,
      fromDate: _fromDate,
      toDate: _toDate
    };
    const url = this.router
      .createUrlTree([], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
      })
      .toString();
    this.location.replaceState(url);
  }

  private getUrlParams() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['limit'] && this.misc.isPositiveInteger(params['limit'])) {
        this.queryParams.limit = params['limit'];
        this.updateSize(params['limit']);
      }
      if (params['page'] && this.misc.isPositiveInteger(params['page'])) {
        this.queryParams.page = Number(params['page']);
        this.page = Number(params['page']);
      }
      if (params['order']) {
        this.queryParams.order = params['order'];
        this.order = params['order'];
      }
      if (params['order']) {
        this.queryParams.order = params['order'];
        this.order = params['order'];
      }
       if (params['dateRange']) {
        params['dateRange'][0]=new Date(params['dateRange'][0])
        params['dateRange'][1]=new Date(params['dateRange'][1])
        this.queryParams.dateRange = params['dateRange'];
      }
      if (params['fromDate']) {
        this.queryParams.fromDate = params['fromDate'];
      }
      if (params['toDate']) {
        this.queryParams.toDate = params['toDate'];
      }
      this.getLogs();
    });
  }

  private updateSize(limit: number) {
    this.limit = limit;
    if (!this.limits.includes(Number(limit))) {
      this.limits.push(Number(limit));
      this.limits.sort((a, b) => {
        return a - b;
      });
    }
  }

  reset() {
    this.resettingLoader = true;
    this.order = '-processedDateTime';
    this.limit = 10;
    this.page = 1;
    this.queryParams.channelName = '';
    this.queryParams.fileName = '';
    this.queryParams.docId = '';
    this.queryParams.status = '';
    this.queryParams.reason = '';
    this.queryParams.fromDate = '';
    this.queryParams.toDate = '';
    this.updateQueryParams(
      this.limit,
      this.page,
      (this.order = '-processedDateTime'),
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    );
    this.queryParams = {};
    this.queryParams.dateRange = [];
    this.resettingLoader = true;
    this.getLogs();
  }

  search() {
    this.isLoading = true;
    this.queryParams.channelName = this.queryParams.channelName || '';
    this.queryParams.fileName = this.queryParams.fileName || '';
    this.queryParams.docId = this.queryParams.docId || '';
    this.queryParams.status = this.queryParams.status || '';
    this.queryParams.reason = this.queryParams.reason || '';
    this.page = 1;
    this.getLogs();
  }  

  onDateRangeSelected() {
      if (this.queryParams.dateRange?.length) {
        this.queryParams.fromDate = moment(this.queryParams.dateRange[0])
          .startOf('day')
          .toISOString();
        this.queryParams.toDate = moment(this.queryParams.dateRange[1])
          .endOf('day')
          .toISOString();
      }
  }
  
  removeDate() {
      this.queryParams.dateRange = [];
      this.queryParams.fromDate = '';
      this.queryParams.toDate = '';
  }

  getDoc(element: any) {
    const docId: any = element.attachment.documentid;
    this.commonService.downloadFile(element.attachment.systemId, docId).subscribe({
      next: (res: any) => {
        const url = res.status
        window.open(url, "_blank");
      },
      error: (error) => { },
    });
  }

  ngOnDestroy(): void {
    this.messageSer.appSidebar = true;
  }

}
