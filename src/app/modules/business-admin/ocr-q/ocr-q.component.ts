import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MiscService, DocIdLogService, RegionService, MessageUserService } from 'src/app/services';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ocr-q',
  templateUrl: './ocr-q.component.html',
  styleUrls: ['./ocr-q.component.scss'],
})
export class OcrQComponent implements OnInit {
  displayedColumns: any[] = [
    'docId',
    'processMode',
    'region',
    'type',
    'logicalSystem',
    'createdDateTime',
    'status',
  ];
  ocrQLogs: any[] = [];
  total: number = 0;
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  dataSource!: MatTableDataSource<any>;
  pageEvent: PageEvent;
  order = '-createdDateTime';
  size: number = 10;
  limits = [5, 10, 25, 50];
  page: number = 1;
  queryParams: any = {
    size: this.size,
    order: this.order,
    page: this.page,
    docId: '',
    region: '',
    status: '',
  };
  searchForm: any = {
    docId: '',
    region: '',
    status: '',
  };
  statusList: any[] = [
    { name: 'Success', value: 'SUCCESS' },
    { name: 'Failed', value: 'FAILED' },
  ];
  regionListDropDown: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private misc: MiscService,
    private docIdLogService: DocIdLogService,
    private regionService: RegionService,
    private messageSer: MessageUserService
  ) {
    this.messageSer.appSidebar = false;
  }

  ngOnInit(): void {
    this.initialLoader = true;
    this.getUrlParams();
    this.getRegions();
  }
  // pagination and sorting start

  private getRegions() {
    this.regionService.getAllRegion().subscribe({
      next: (res: any) => {
        this.regionListDropDown = res;
        console.log(this.regionListDropDown);
      },
      error: (err: any) => {},
    });
  }

  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.order = sort.active;
      this.queryParams.order = this.order;
      this.page;
      this.size;
      this.getLogs();
    } else if (sort.direction === 'desc') {
      this.order = '-' + sort.active;
      this.queryParams.order = this.order;
      this.page;
      this.size;
      this.getLogs();
    }
  }

  onPaginateChange(event: any) {
    this.initialLoader = true;
    this.page = event.pageIndex + 1;
    this.size = event.pageSize;
    this.queryParams.page = this.page;
    this.queryParams.size = this.size;
    this.getLogs();
  }
  // pagination and sorting end

  private getArgsObj() {
    const obj: any = {
      size: this.size,
      orderBy: this.order,
      page: this.page,
    };
    if (this.searchForm.docId) obj['docId'] = this.searchForm.docId;
    if (this.searchForm.region) obj['region'] = this.searchForm.region;
    if (this.searchForm.status) obj['status'] = this.searchForm.status;
    return obj;
  }

  getLogs() {
    this.docIdLogService.getOcrQLogs(this.getArgsObj()).subscribe({
      next: (res: any) => {
        this.ocrQLogs = res['content'];
        this.total = res.totalElements;
        this.initialLoader = false;
        this.resettingLoader = false;
        this.isLoading = false;
        if (this.resettingLoader) {
          this.size = 10;
          this.page = 1;
          this.order = '-createdDateTime';
          this.queryParams.size = 10;
          this.queryParams.page = 1;
          this.queryParams.docId = '';
          this.queryParams.region = '';
          this.queryParams.status = '';
        }
        this.updateQueryParams(
          this.queryParams.size,
          this.queryParams.page,
          this.queryParams.order,
          this.queryParams.docId,
          this.queryParams.region,
          this.queryParams.status
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
    _size: number,
    _page: number,
    _order: string,
    _docId: string,
    _region: string,
    _status: string
  ) {
    const queryParams: any = {
      size: _size,
      page: _page,
      order: _order,
      docId: _docId,
      region: _region,
      status: _status,
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
      if (params['orderBy']) {
        this.queryParams.order = params['orderBy'];
        this.order = params['orderBy'];
      }
      this.getLogs();
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

  reset() {
    this.resettingLoader = true;
    this.order = '-createdDateTime';
    this.size = 10;
    this.page = 1;
    this.queryParams.docId = '';
    this.queryParams.region = '';
    this.queryParams.status = '';
    this.updateQueryParams(
      this.size,
      this.page,
      (this.order = '-createdDateTime'),
      '',
      '',
      ''
    );
    this.searchForm = {};
    this.queryParams = {};
    this.resettingLoader = true;
    this.getLogs();
  }

  search() {
    this.isLoading = true;
    this.queryParams.docId = this.searchForm.docId || '';
    this.queryParams.region = this.searchForm.region || '';
    this.queryParams.status = this.searchForm.status || '';
    this.page = 1;
    this.getLogs();
  }  

  ngOnDestroy(): void {
    this.messageSer.appSidebar = true;
  }

}
