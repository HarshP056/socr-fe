import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageUserService, MiscService, ApplciationLogService, OCRService, ChannelService } from 'src/app/services';
import { Location } from '@angular/common';
import { PdfDocumentViewerComponent } from 'src/app/shared/components/pdf-document-viewer/pdf-document-viewer.component';
import { NgDialogAnimationService } from 'ng-dialog-animation';

@Component({
  selector: 'app-application-log',
  templateUrl: './application-log.component.html',
  styleUrls: ['./application-log.component.scss'],
})
export class ApplicationLogComponent implements OnInit, OnDestroy {
  displayedColumns: any[] = [
    'title',
    'dateTime',
    'type',
    'name',
    'description',
    'apiPath',
  ];
  application: any[] = [];
  searchForm: any = {
    username: '',
  };
  total: number = 0;
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  dataSource!: MatTableDataSource<any>;
  pageEvent: PageEvent;
  channels: any[] = [];
  order = '-dateTime';
  size: number = 10;
  limits = [5, 10, 25, 50];
  page: number = 1;
  queryParams: any = {
    size: this.size,
    order: this.order,
    page: this.page,
    username: '',
  };
  documentId: string;

  constructor(
    private oCRService: OCRService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private misc: MiscService,
    private applicationService: ApplciationLogService,
    private messageSer: MessageUserService
  ) {
    this.messageSer.appSidebar = false;
  }

  ngOnInit(): void {
    this.initialLoader = true;
    this.getUrlParams();
  }

  // pagination and sorting start
  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.order = sort.active;
      this.queryParams.order = this.order;
      this.page;
      this.size;
      this.getAppliction();
    } else if (sort.direction === 'desc') {
      this.order = '-' + sort.active;
      this.queryParams.order = this.order;
      this.page;
      this.size;
      this.getAppliction();
    }
  }

  onPaginateChange(event: any) {
    this.initialLoader = true;
    this.page = event.pageIndex + 1;
    this.size = event.pageSize;
    this.queryParams.page = this.page;
    this.queryParams.size = this.size;
    this.getAppliction();
  }
  // pagination and sorting end

  // search filter and reset start

  reset() {
    this.resettingLoader = true;
    this.order = '-dateTime';
    this.size = 10;
    this.page = 1;
    this.updateQueryParams(this.size, this.page, (this.order = '-dateTime'));
    this.searchForm = {};
    this.queryParams = {};
    this.resettingLoader = true;
    this.getAppliction();
  }

  search() {
    this.isLoading = true;
    this.page = 1;
    this.getAppliction();
  }

  private getArgsObj() {
    const obj: any = {
      size: this.size,
      orderBy: this.order,
      page: this.page,
    };
    return obj;
  }

  getAppliction() {
    this.applicationService.getApplicationLogPage(this.getArgsObj()).subscribe({
      next: (res: any) => {
        this.application = res['content'];
        this.total = res.totalElements;
        this.initialLoader = false;
        this.resettingLoader = false;
        this.isLoading = false;
        if (this.resettingLoader) {
          this.size = 10;
          this.page = 1;
          this.order = '-dateTime';
          this.searchForm = {};
          this.queryParams.size = 10;
          this.queryParams.page = 1;
        }
        this.updateQueryParams(
          this.queryParams.size,
          this.queryParams.page,
          this.queryParams.order
        );
      },
      error: (err: any) => {
        this.initialLoader = false;
        this.resettingLoader = false;
        this.isLoading = false;
      },
    });
  }

  private updateQueryParams(_size: number, _page: number, _order: string) {
    const queryParams: any = {
      size: _size,
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

  private getUrlParams() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['size'] && this.misc.isPositiveInteger(params['size'])) {
        this.queryParams.size = params['size'];
        this.updateSize(params['size']);
      }
      if (params['page'] && this.misc.isPositiveInteger(params['page'])) {
        this.queryParams.page = Number(params['page']);
        this.page = Number(params['page']);
      }
      if (params['orderBy']) {
        this.queryParams.order = params['orderBy'];
        this.order = params['orderBy'];
      }
      this.getAppliction();
    });
  }

  private updateSize(limit: number) {
    this.size = limit;
    // update limits array if limit recived from URL parameters is not present
    if (!this.limits.includes(Number(limit))) {
      this.limits.push(Number(limit));
      this.limits.sort((a, b) => {
        return a - b;
      });
    }
  }

  ngOnDestroy(): void {
    this.messageSer.appSidebar = true;
  }

}
