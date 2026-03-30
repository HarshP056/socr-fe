import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { UserDialogComponent } from './component/user-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonService, MiscService, StorageService } from 'src/app/services';

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
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  @ViewChild(MatMenuTrigger) ddTrigger: MatMenuTrigger;

  users: any = [];
  displayedColumns: string[] = ['firstName', 'role', 'status', 'action'];
  oauthId: string = '';
  isWait: boolean = false;
  pageInd: number = 0;
  rolesOptions: any = [];

  queryParams: queryParams = {
    page: 1,
    order: 'firstName',
    limit: 10,
  };
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;

  searchParams: searchParams = {
    role: '',
    query: '',
  };
  totalElements: number = 0;
  user: any;
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private commonService: CommonService,
    private dialog: NgDialogAnimationService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private miscService: MiscService,
    private storageService : StorageService
  ) {}

  ngOnInit(): void {
    this.initialLoader = true;
    this.getAllRoles();
    this.getUrlParams();
    this.user = this.storageService.getUser();
  }

  private getArgsObj() {
    const obj: any = {
      limit: this.queryParams.limit,
      order: this.queryParams.order,
      page: this.queryParams.page,
    };
    if (this.searchParams.query) obj['query'] = this.searchParams.query;
    if (this.searchParams.role) obj['role'] = this.searchParams.role;
    return obj;
  }


  getAllUsers() {
    console.log('user');
    this.userService.getUsers(this.getArgsObj()).subscribe({
      next: (res: any) => {
        console.log('user');

        this.users = res['content'];
        this.totalElements = res.totalElements;
        this.resettingLoader = false;
        this.initialLoader = false;
        this.isLoading = false;
        this.updateQueryParams(
          this.queryParams.limit,
          this.queryParams.page,
          this.queryParams.order,
          this.searchParams.query,
          this.searchParams.role
        );
      },
      error: (err: any) => {
        this.isLoading = false;
        this.resettingLoader = false;
      },
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id.toString()).subscribe({
      next: (res: any) => {
        this.getAllUsers();
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Success',
        //   detail: res.message,
        // });
      },
      error: (err: any) => {
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Error',
        //   detail: 'Some error occurred!!',
        // });
      },
    });
  }

  getAllRoles() {
    this.commonService.getRoles().subscribe({
      next: (res: any) => {
        this.rolesOptions = res;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.resettingLoader = false;
      },
    });
  }

  openDialog(id: string) {
    this.dialog
      .open(UserDialogComponent, {
        disableClose: true,
        height: '100%',
        width: '35%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: id,
      })
      .afterClosed()
      .subscribe((val) => {
        console.log(val);
        setTimeout(() => {
          this.getAllUsers();
          console.log('val');
        }, 1000);
      });
  }

  onPageChange(event: PageEvent) {
    this.initialLoader = true;
    this.queryParams.limit = event.pageSize;
    this.pageInd = event.pageIndex;
    this.queryParams.page = event.pageIndex + 1;
    this.getAllUsers();
  }

  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.queryParams.order = '-' + sort.active;
    } else if (sort.direction === 'desc') {
      this.queryParams.order = sort.active;
    }
    this.getAllUsers();
  }

  private updateQueryParams(
    _limit: number,
    _page: number,
    _order: string,
    _query: any | '',
    _role: any | ''
  ) {
    const queryParams: any = {
      limit: _limit,
      page: _page,
      order: _order,
      query: _query || '',
      role: _role || '',
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

      if (params['query']) {
        this.searchParams.query = params['query'];
      }
      if (params['role']) {
        this.searchParams.role = params['role'];
      }
      this.getAllUsers();
    });
  }

  search() {
    this.isLoading = true;
    // this.searchParams.query = this.searchForm.query || '';
    this.queryParams.page = 1;
    this.pageInd = 0;
    this.getAllUsers();
  }

  reset() {
    this.resettingLoader = true;
    this.queryParams.order = 'firstName';
    // this.queryParams.orderBy = 'agentId';
    this.searchParams.role = '';
    this.searchParams.query = '';
    this.queryParams.limit = 10;
    this.queryParams.page = 1;
    this.pageInd = 0;
    this.updateQueryParams(
      this.queryParams.limit,
      this.queryParams.page,
      (this.queryParams.order = 'firstName'),
      '',
      ''
    );
    this.resettingLoader = true;
    this.getAllUsers();
  }
}
