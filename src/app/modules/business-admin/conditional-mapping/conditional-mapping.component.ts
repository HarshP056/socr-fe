import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonService, MiscService } from 'src/app/services';
import { LogicalSystemService } from 'src/app/services/logical-system.service';
import { ConditionalDialogComponent } from './component/conditional-dialog/conditional-dialog.component';
import { ConditionMappingService } from 'src/app/services/conditional-mapping.service';

interface queryParams {
  page: number;
  order: string;
  limit: number;
}

interface searchParams {
  logicalSystem: string;
}

@Component({
  selector: 'app-conditional-mapping',
  templateUrl: './conditional-mapping.component.html',
  styleUrls: ['./conditional-mapping.component.scss']
})
export class ConditionalMappingComponent {

  @ViewChild(MatMenuTrigger) ddTrigger: MatMenuTrigger;

  mappings: any = [];
  displayedColumns: string[] = ['id', 'logicalSystem', 'taxCode', 'description','erpCode','erpDescription','generalLedger', 'action'];
  oauthId: string = '';
  isWait: boolean = false;
  pageInd: number = 0;
  logicalSytemList: any = [];

  queryParams: queryParams = {
    page: 1,
    order: 'id',
    limit: 10,
  };
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;

  searchParams: searchParams = {
    logicalSystem: '',
  };
  totalElements: number = 0;

  constructor(
    private mappingService: ConditionMappingService,
    private messageService: MessageService,
    private commonService: CommonService,
    private dialog: NgDialogAnimationService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private miscService: MiscService,
    private logicalSystemService: LogicalSystemService
  ) {}

  ngOnInit(): void {
    this.initialLoader = true;
    this.getLogicalSystem();
    this.getUrlParams();
  }

  private getArgsObj() {
    const obj: any = {
      limit: this.queryParams.limit,
      order: this.queryParams.order,
      page: this.queryParams.page,
    };
    if (this.searchParams.logicalSystem)
      obj['logicalSystem'] = this.searchParams.logicalSystem;
    return obj;
  }

  getAllMapping() {
    this.mappingService.getMapping(this.getArgsObj()).subscribe({
      next: (res: any) => {
        this.mappings = res['content'];
        this.totalElements = res.totalElements;
        this.resettingLoader = false;
        this.initialLoader = false;
        this.isLoading = false;
        this.updateQueryParams(
          this.queryParams.limit,
          this.queryParams.page,
          this.queryParams.order,
          this.searchParams.logicalSystem,
        );
      },
      error: (err: any) => {
        this.isLoading = false;
        this.resettingLoader = false;
      },
    });
  }

  deleteUser(id: number) {
    this.mappingService.deleteMapping(id.toString()).subscribe({
      next: (res: any) => {
        this.getAllMapping();
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

  private getLogicalSystem() {
    this.logicalSystemService.getAllLogicalSystems().subscribe((res: any) => {
      this.logicalSytemList = res;
    });
  }

  openDialog(id: string) {
    this.dialog
      .open(ConditionalDialogComponent, {
        disableClose: true,
        height: '100%',
        width: '35%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: id,
      })
      .afterClosed()
      .subscribe((val) => {
        this.getAllMapping();
      });
  }

  onPageChange(event: PageEvent) {
    this.initialLoader = true;
    this.queryParams.limit = event.pageSize;
    this.pageInd = event.pageIndex;
    this.queryParams.page = event.pageIndex + 1;
    this.getAllMapping();
  }

  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.queryParams.order = '-' + sort.active;
    } else if (sort.direction === 'desc') {
      this.queryParams.order = sort.active;
    }
    this.getAllMapping();
  }

  private updateQueryParams(
    _limit: number,
    _page: number,
    _order: string,
    _logicalSystem: any | '',
  ) {
    const queryParams: any = {
      limit: _limit,
      page: _page,
      order: _order,
      logicalSystem: _logicalSystem || '',
    };
    const url = this.router
      .createUrlTree([], {
        relativeTo: this.activatedRoute,
        queryParams: {...queryParams, ...this.searchParams}
      })
      .toString();
    this.location.replaceState(url);
  }

  getUrlParams() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['limit'] && this.miscService.isPositiveInteger(params['limit'])) {
        this.queryParams.limit = params['limit'];
      }
      if (params['page'] && this.miscService.isPositiveInteger(params['page'])) {
        this.queryParams.page = Number(params['page'])
        this.pageInd = Number(params['page'])-1;
      }
      if (params['order']) {
        this.queryParams.order = params['order'];
      }

      if (params['logicalSystem']) {
        this.searchParams.logicalSystem = params['logicalSystem'];
      }
      this.getAllMapping();
    });
  }

  search() {
    this.isLoading = true;
    this.queryParams.page = 1;
    this.pageInd = 0;
    this.getAllMapping();
  }

  reset() {
    this.resettingLoader = true;
    this.queryParams.order = 'id';
    this.searchParams.logicalSystem = '';
    this.queryParams.limit = 10;
    this.queryParams.page = 1;
    this.pageInd = 0;
    this.updateQueryParams(
      this.queryParams.limit,
      this.queryParams.page,
      (this.queryParams.order = 'id'),
      '',
    );
    this.resettingLoader = true;
    this.getAllMapping();
  }

}
