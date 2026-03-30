import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MessageService } from 'primeng/api';
import { MessageUserService, MiscService } from 'src/app/services';
import { OcrCronService } from 'src/app/services/ocr-cron.service';
import { Location } from '@angular/common';
import { ExecutionLogsComponent } from './execution-logs/execution-logs.component';

interface queryParams {
  page: number;
  order: string;
  limit: number;
}

interface searchParams {
  dateRange: any[];
  startDate: string | null;
  status: string;
  errorCode: string;
  endDate: string | null;
  title: string;
  txId: string;
  uri: string;
}

@Component({
  selector: 'app-cron-logs',
  templateUrl: './cron-logs.component.html',
  styleUrls: ['./cron-logs.component.scss']
})
export class CronLogsComponent implements OnInit, OnDestroy {

  cronLogs: any[] = [];
  displayedColumns: string[] = [
    'id',
    'description',
    'pettern',
    'lastExecution',
    'enable',
    'action',
  ];
  title: any;
  status = ['NEW', 'RESOLVED']

  queryParams: queryParams = {
    page: 1,
    order: '-lastExecution',
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
    private cronService: OcrCronService,
    public dialog: NgDialogAnimationService,
    private messageService: MessageService,
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

  getCronLogs() {
    this.cronService
      .getCronDetails(this.queryParams)
      .subscribe({
        next: (res: any) => {
          this.cronLogs = res.content;
          this.totalElements = res.totalElements;
          this.resettingLoader = false;
          this.initialLoader = false;
          this.isLoading = false;
          this.updateQueryParams(
            this.queryParams.limit,
            this.queryParams.page,
            this.queryParams.order,
          );
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  runNewJob(data: any) {
    this.cronService
      .runNewJob(data.id)
      .subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          this.getCronLogs();
        },
        error: (err: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Some error occurred!!',
          });
        },
      });
  }

  onPageChange(event: PageEvent) {
    this.initialLoader = true;
    this.queryParams.limit = event.pageSize;
    this.pageInd = event.pageIndex;
    this.queryParams.page = event.pageIndex + 1;
    this.getCronLogs();
  }

  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.queryParams.order = '-' + sort.active;
    } else if (sort.direction === 'desc') {
      this.queryParams.order = sort.active;
    }
    this.getCronLogs();
  }

  private updateQueryParams(
    _limit: number,
    _page: number,
    _order: string,
  ) {
    const queryParams: any = {
      limit: _limit,
      page: _page,
      order: _order,
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

      this.getCronLogs();
    });
  }

  openExecutionLog(data: any) {
    this.dialog
      .open(ExecutionLogsComponent, {
        disableClose: true,
        height: '100%',
        width: '85%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: data.id,
      })
      .afterClosed()
  }

  changeStatus(id: any, element: any) {
    console.log(element)
       const obj = {
        description : element.description,
        enable : element.enable,
        pettern : element.pettern,

        }
        console.log(obj)

    this.cronService
      .statusChange(id , obj)
      .subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          this.getCronLogs();
        },
        error: (err: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Some error occurred!!',
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.messageSer.appSidebar = true;
  }

}
