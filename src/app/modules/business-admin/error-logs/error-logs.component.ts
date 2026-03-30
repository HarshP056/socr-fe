import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { ErrorDialogComponent } from './component/error-dialog.component';
import { MiscService, ExceptionService, MessageUserService } from 'src/app/services';
import { Location } from '@angular/common';
import moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicModalComponent } from 'src/app/shared/modals/basic-modal/basic-modal.component';

interface queryParams {
  page: number;
  order: string;
  limit: number;
}

interface searchParams {
  dateRange: any[];
  startDate: string;
  status: string;
  errorCode: string;
  endDate: string;
  title: string;
  txId: string;
  uri: string;
}
@Component({
  selector: 'app-error-logs',
  templateUrl: './error-logs.component.html',
  styleUrls: ['./error-logs.component.scss'],
})
export class ErrorLogsComponent implements OnInit, OnDestroy {
  @ViewChild('comment', { static: false })
  comment: BasicModalComponent;
  @ViewChild('addComment', { static: false })
  addComment: TemplateRef<any>;
  @ViewChild('errorLog', { static: false })
  errorLog: TemplateRef<any>;
  errorLogs: any[] = [];
  displayedColumns: string[] = [
    'title',
    'txId',
    'uri',
    'dateTime',
    'status',
    'action',
  ];
  title: any;
  status = ['NEW', 'RESOLVED']
  searchParams: searchParams = {
    dateRange: [],
    startDate: '',
    status: '',
    errorCode: '',
    endDate: '',
    title: '',
    txId: '',
    uri: '',
  };

  queryParams: queryParams = {
    page: 1,
    order: '-dateTime',
    limit: 10,
  };
  totalElements: number = 0;
  pageInd: number = 0;
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  maxDate = new Date();
  txId: any;

  constructor(
    private exceptionService: ExceptionService,
    public dialog: NgDialogAnimationService,
    private miscService: MiscService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private messageSer: MessageUserService
  ) {
    this.messageSer.appSidebar = false;
  }

  ngOnInit(): void {
    this.initialLoader = true;
    this.getUrlParams();
  }

  getExceptions() {
    this.exceptionService
      .getExceptions(this.queryParams, this.searchParams)
      .subscribe({
        next: (res: any) => {
          this.errorLogs = res.content;
          this.totalElements = res.totalElements;
          this.resettingLoader = false;
          this.initialLoader = false;
          this.isLoading = false;
          this.updateQueryParams(
            this.queryParams.limit,
            this.queryParams.page,
            this.queryParams.order,
            this.searchParams.startDate,
            this.searchParams.status,
            this.searchParams.endDate,
            this.searchParams.errorCode,
            this.searchParams.title,
            this.searchParams.txId,
            this.searchParams.uri
          );
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  // onPageChange(event: PageEvent) {
  //   this.queryParams.limit = event.pageSize;
  //   this.pageInd = event.pageIndex;
  //   this.queryParams.page = event.pageIndex + 1;
  //   this.getExceptions();
  // }

  // sortChange(sort: Sort) {
  //   if (sort.direction === "asc") {
  //     this.queryParams.order = "-" + sort.active;
  //   } else if (sort.direction === "desc") {
  //     this.queryParams.order = sort.active;
  //   }
  //   this.getExceptions();
  // }

  openErrorLog(element: string) {
    this.txId = element;
    this.title = 'Error Log';
    this.comment.templateRef = this.errorLog;
    this.comment.show();
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
    _startDate: string,
    _status: string,
    _endDate: string,
    _errorCode: string,
    _title: string,
    _txId: string,
    _uri: string
  ) {
    const queryParams: any = {
      limit: _limit,
      page: _page,
      order: _order,
      startDate: _startDate,
      status: _status,
      endDate: _endDate,
      errorCode: _errorCode,
      title: _title,
      txId: _txId,
      uri: _uri,
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
        // this.updateSize(params['limit']);
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
      if (params['startDate']) {
        this.searchParams.startDate = params['startDate'];
      }
      if (params['errorCode']) {
        this.searchParams.errorCode = params['errorCode'];
      }
      if (params['endDate']) {
        this.searchParams.endDate = params['endDate'];
      }
      if (params['title']) {
        this.searchParams.title = params['title'];
      }
      if (params['txId']) {
        this.searchParams.txId = params['txId'];
      }
      if (params['status']) {
        this.searchParams.status = params['status'];
      }
      if (params['uri']) {
        this.searchParams.uri = params['uri'];
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
    this.queryParams.order = '-dateTime';
    // this.queryParams.orderBy = 'agentId';
    this.searchParams.dateRange = [];
    this.searchParams.startDate = '';
    this.searchParams.errorCode = '';
    this.searchParams.endDate = '';
    this.searchParams.title = '';
    this.searchParams.txId = '';
    this.searchParams.uri = '';
    this.queryParams.limit = 10;
    this.queryParams.page = 1;
    this.searchParams.status = ''
    this.pageInd = 0;
    this.updateQueryParams(
      this.queryParams.limit,
      this.queryParams.page,
      (this.queryParams.order = '-dateTime'),
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    );
    this.resettingLoader = true;
    this.getExceptions();
  }

  onDateRangeSelected() {
    if (this.searchParams.dateRange?.length) {
      this.searchParams.startDate = moment(this.searchParams.dateRange[0])
        .startOf('day')
        .toISOString();
      this.searchParams.endDate = moment(this.searchParams.dateRange[1])
        .endOf('day')
        .toISOString();
    }
  }

  removeDate() {
    this.searchParams.dateRange = [];
    this.searchParams.startDate = '';
    this.searchParams.endDate = '';
  }

  addComments(value: any) {
    this.txId = value;
    this.title = 'Resolved';
    this.comment.templateRef = this.addComment;
    this.comment.show();
  }

  onSuccess(event: any) {
    this.comment.hide();
    this.getUrlParams();
  }

  onErrorClose(event: any) {
    this.comment.hide();
    this.getUrlParams();
  }

  ngOnDestroy(): void {
    this.messageSer.appSidebar = true;
  }

}
