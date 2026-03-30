import { Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonService, MessageUserService, MiscService, OcrConfigService } from 'src/app/services';
import { DeleteConfirmationModalComponent } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.component';
import { OcrMapperConfigService } from 'src/app/services/ocr-mapper-config.service';

@Component({
  selector: 'app-ocr-field-mapping',
  templateUrl: './ocr-field-mapping.component.html',
  styleUrls: ['./ocr-field-mapping.component.scss']
})
export class OcrFieldMappingComponent {
  displayedColumns = [
    'id',
    'name',
    'action',
  ];
  // searchForm: any = {
  //   name: '',
  // };
  total: number = 0;
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  dataSource!: MatTableDataSource<any>;
  pageEvent: PageEvent;
  ocrProfile: any[] = [];
  order = '-id';
  size: number = 10;
  limits = [5, 10, 25, 50];
  page: number = 1;
  engineTypes: any=[]
  queryParams: any = {
    limit: 10,
    order: '-id',
    page: 1,
    name: '',
  };

  @ViewChild('deleteModal', { static: false })
  deleteModal: DeleteConfirmationModalComponent;
  deleteId: number;
  isDelete: boolean = false;
  constructor(
    private messageSer: MessageUserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private misc: MiscService,
    private ocrMapperConfig: OcrMapperConfigService,
    private commonService: CommonService
  ) {
    this.messageSer.appSidebar = false;
  }
  ngOnInit(): void {
    this.initialLoader = true;
    this.getUrlParams();
  }

  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }
  openConfirmationModal(val: any) {
    this.deleteId = val.id;
    this.deleteModal.show();
  }

  Edit(element: any) {
    this.router.navigateByUrl(
      '/system-admin/configurations/ocr-field-mapping/edit-ocr-field-data/' + element.id
    );
  }

  deleteOcrProfile() {
    this.isDelete = true;
    this.ocrMapperConfig.deleteOcrFieldMapping(this.deleteId).subscribe({
      next: (res: any) => {
        this.isDelete = false;
        this.getAllOcrProfile();
        this.deleteModal.hide();
      },
      error: (err) => {
        this.isDelete = false;
      },
    });
  }

  // pagination and sorting start

  // sortChange(sort: Sort) {
  //   if (sort.direction === 'asc') {
  //     this.queryParams.order = sort.active;
  //     this.queryParams.order = this.queryParams.order;
  //     this.queryParams.page;
  //     this.queryParams.size;
  //     this.getAllOcrProfile();
  //   } else if (sort.direction === 'desc') {
  //     this.queryParams.order = '-' + sort.active;
  //     this.queryParams.order = this.queryParams.order;
  //     this.queryParams.page;
  //     this.queryParams.size;
  //     this.getAllOcrProfile();
  //   }
  // }

  // onPaginateChange(event: any) {
  //   this.initialLoader = true;
  //   this.queryParams.page = event.pageIndex + 1;
  //   this.queryParams.size = event.pageSize;
  //   this.page = this.page;
  //   this.queryParams.size = this.size;
  //   this.getAllOcrProfile();
  // }
  onPageChange(event: PageEvent) {
    this.initialLoader = true;
    this.queryParams.limit = event.pageSize;
    this.page = event.pageIndex;
    this.queryParams.page = event.pageIndex + 1;
    this.getAllOcrProfile();
  }

  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.queryParams.order = '-' + sort.active;
    } else if (sort.direction === 'desc') {
      this.queryParams.order = sort.active;
    }
    this.getAllOcrProfile();
  }
  // pagination and sorting end

  // search filter and reset start
  reset() {
    this.resettingLoader = true;
    this.queryParams.order = '-id';
    this.queryParams.name = '';
    this.queryParams.limit = 10;
    this.queryParams.page = 1;
    this.page = 1;
    this.updateQueryParams(
      this.queryParams.limit,
      this.queryParams.page,
      (this.queryParams.order = 'id'),
      ''
    );
    this.resettingLoader = true;
    this.getAllOcrProfile();
  }

  search() {
    this.isLoading = true;
    this.page = 1;
    this.getAllOcrProfile();
  }


  // search filter and reset end
  private getArgsObj() {
    const obj: any = {
      limit: this.queryParams.limit,
      order: this.queryParams.order,
      page: this.queryParams.page
    };
    if (this.queryParams.name)
      obj['name'] = this.queryParams.name;
    return obj;
  }

  private getAllOcrProfile() {
    this.ocrMapperConfig.getAllOcrData(this.getArgsObj()).subscribe({
      next: (res: any) => {
        this.ocrProfile = res['content'];
        this.total = res.totalElements;
        this.initialLoader = false;
        this.resettingLoader = false;
        this.isLoading = false;
        // if (this.resettingLoader) {
        //   this.size = 10;
        //   this.page = 1;
        //   this.order = '-id';
        //   this.searchForm = {};
        //   this.queryParams.size = 10;
        //   this.queryParams.page = 1;
        //   this.queryParams.name = '';
        // }
        this.updateQueryParams(
          this.queryParams.limit,
          this.queryParams.page,
          this.queryParams.order,
          this.queryParams.name,
        );
      },
      error: (err: any) => {
        this.isLoading = false;
        this.resettingLoader = false;
        this.initialLoader = false;
      },
    });
  }

  private updateQueryParams(
    _limit: number,
    _page: number,
    _order: string,
    _name: any | '',
  ) {
    const queryParams: any = {
      limit: _limit,
      page: _page,
      order: _order,
      name: _name || '',
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
      }
      if (params['page'] && this.misc.isPositiveInteger(params['page'])) {
        this.queryParams.page = Number(params['page']);
        // this.queryParams.page = Number(params['page']);
      }
      if (params['order']) {
        this.queryParams.order = params['order'];
        // this.order = params['order'];
      }

      if (params['name']) {
        this.queryParams.name = params['name'];
        // this.searchForm.name = params['name'];
      }
      this.getAllOcrProfile();
    });
  }
}
