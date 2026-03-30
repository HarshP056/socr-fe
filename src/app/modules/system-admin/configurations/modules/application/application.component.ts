import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MessageService } from 'primeng/api';
import { MessageUserService, MiscService } from 'src/app/services';
import { ApplicationDialogComponent } from './component/application-dialog.component';
import { ApplicationService } from 'src/app/services/application.service';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
interface queryParams {
  page: number;
  order: string;
  limit: number;
}

interface searchParams {
  role: string;
  query: string;
}
@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnDestroy, OnInit {
  @ViewChild(MatMenuTrigger) ddTrigger: MatMenuTrigger;

  applicationData: any = [];
  displayedColumns: string[] = [
    'appId',
    'expiryDate',
    // 'appSecret',
    'ipWhiteListEnabled',
    'ipWhiteList',
    'scope',
    'logicalSystem',
    'encodingMethod',
    'action',
  ];
  oauthId: string = '';
  isWait: boolean = false;
  pageInd: number = 0;

  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;

  queryParams: queryParams = {
    page: 1,
    order: '-id',
    limit: 10,
  };

  searchParams: searchParams = {
    role: '',
    query: '',
  };
  totalElements: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageSer: MessageUserService,
    private messageService: MessageService,
    private dialog: NgDialogAnimationService,
    private location: Location,
    private _applicationService: ApplicationService,
    private miscService: MiscService
  ) {
    this.messageSer.appSidebar = false;
  }
  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }

  ngOnInit(): void {
    this.initialLoader = true;
    this.getUrlParams();
  }

  private getArgsObj() {
    const obj: any = {
      limit: this.queryParams.limit,
      order: this.queryParams.order,
      page: this.queryParams.page,
    };
    return obj;
  }

  getApplicationPage() {
    this._applicationService.getApplicationPage(this.getArgsObj()).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.initialLoader = false;
        this.resettingLoader = false;
        this.applicationData = res.content;
        this.totalElements = res.totalElements;
        this.updateQueryParams(
          this.queryParams.limit,
          this.queryParams.page,
          this.queryParams.order
        );
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  deleteUser(id: number) {
    this._applicationService.deleteApplication(id.toString()).subscribe({
      next: (res: any) => {
        this.getApplicationPage();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message,
        });
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

  openDialog(id: string) {
    this.dialog
      .open(ApplicationDialogComponent, {
        disableClose: true,
        height: '100%',
        width: '35%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: id,
      })

      .afterClosed()

      .subscribe((val) => {
        this.getApplicationPage();
      });
  }

  onPageChange(event: PageEvent) {
    this.initialLoader = true;
    this.queryParams.limit = event.pageSize;
    this.pageInd = event.pageIndex;
    this.queryParams.page = event.pageIndex + 1;
    this.getApplicationPage();
  }

  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.queryParams.order = '-' + sort.active;
    } else if (sort.direction === 'desc') {
      this.queryParams.order = sort.active;
    }
    this.getApplicationPage();
  }

  private updateQueryParams(_limit: number, _page: number, _order: string) {
    const queryParams: any = {
      limit: _limit,
      page: _page,
      order: _order,
    };
    const url = this.router
      .createUrlTree([], {
        relativeTo: this.activatedRoute,
        queryParams: { ...queryParams, ...this.searchParams },
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
      this.getApplicationPage();
    });
  }
}
