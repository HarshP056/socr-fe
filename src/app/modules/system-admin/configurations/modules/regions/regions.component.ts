import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MessageUserService, MiscService } from 'src/app/services';
import { DocIdRangeService } from 'src/app/services/doc-id-range.service';
import { RegionService } from 'src/app/services/region.service';
import { DeleteConfirmationModalComponent } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.component';
import { RegionDetailsComponent } from './region-details/region-details.component';


@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent {
  displayedColumns = [
    'docIdRange',
    'name',
    'action',
  ];
  // searchForm: any = {
  //   profileName: '',
  // };
  total: number = 0;
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  dataSource!: MatTableDataSource<any>;
  pageEvent: PageEvent;
  regionData: any[] = [];
  order = '-id';
  size: number = 10;
  limits = [5, 10, 25, 50];
  page: number = 1;
  docIdRangeData: any=[]
  queryParams: any = {
    limit: 10,
    order: '-id',
    page: 1,
    docIdRange: '',
    name: ''
  };

  @ViewChild('deleteModal', { static: false })
  deleteModal: DeleteConfirmationModalComponent;
  deleteId: number;
  isDelete: boolean = false;
  constructor(
    private messageSer: MessageUserService,
    private docIdRangeService: DocIdRangeService,
    private activatedRoute: ActivatedRoute,
    private dialog: NgDialogAnimationService,
    private router: Router,
    private location: Location,
    private misc: MiscService,
    private regionService: RegionService,
  ) {
    this.messageSer.appSidebar = false;
  }
  ngOnInit(): void {
    this.initialLoader = true;
    this.getDocIdRange();
    this.getUrlParams();
  }

  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }
  openConfirmationModal(val: any) {
    this.deleteId = val.id;
    this.deleteModal.show();
  }


  openDialog(id: string) {

    this.dialog
      .open(RegionDetailsComponent, {
        disableClose: true,
        height: '100%',
        width: '35%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: id,
      })
      .afterClosed()
      .subscribe((val) => {
        this.getRegions();
      });
  }

  deleteRegion() {
    this.isDelete = true;
    this.regionService.deleteRegion(this.deleteId).subscribe({
      next: (res: any) => {
        this.isDelete = false;
        this.getRegions();
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
    this.getRegions();
  }

  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.queryParams.order = '-' + sort.active;
    } else if (sort.direction === 'desc') {
      this.queryParams.order = sort.active;
    }
    this.getRegions();
  }
  // pagination and sorting end

  // search filter and reset start
  reset() {
    this.resettingLoader = true;
    this.queryParams.order = '-id';
    this.queryParams.docIdRange = '';
    this.queryParams.name = '';
    this.queryParams.limit = 10;
    this.queryParams.page = 1;
    this.page = 1;
    this.updateQueryParams(
      this.queryParams.limit,
      this.queryParams.page,
      (this.queryParams.order = 'id'),
      '',
      ''
    );
    this.resettingLoader = true;
    this.getRegions();
  }

  search() {
    this.isLoading = true;
    this.page = 1;
    this.getRegions();
  }


  // search filter and reset end
  private getArgsObj() {
    const obj: any = {
      limit: this.queryParams.limit,
      order: this.queryParams.order,
      page: this.queryParams.page
    };
    if (this.queryParams.docIdRange)
      obj['docIdRange'] = this.queryParams.docIdRange;
    if (this.queryParams.name)
      obj['name'] = this.queryParams.name;
   
    return obj;
  }

  private getRegions() {
    this.regionService.getAllRegion().subscribe({
      next: (res: any) => {
        this.regionData = res;
        console.log(this.regionData)
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
        //   this.queryParams.profileName = '';
        // }
        this.updateQueryParams(
          this.queryParams.limit,
          this.queryParams.page,
          this.queryParams.order,
          this.queryParams.docIdRange,
          this.queryParams.name
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
    _docIdRange: any | '',
    _name:any | ''
  ) {
    const queryParams: any = {
      limit: _limit,
      page: _page,
      order: _order,
      docIdRange: _docIdRange || '',
      name: _name || ''
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

      if (params['docIdRange']) {
        this.queryParams.docIdRange = params['docIdRange'];
        // this.searchForm.profileName = params['profileName'];
      }
      if (params['name']) {
        this.queryParams.name = params['name'];
        // this.searchForm.profileName = params['profileName'];
      }
      this.getRegions();
    });
  }

  getDocIdRange() {
    this.docIdRangeService.getAllDocIdRange().subscribe({
      next: (res: any) => {
        this.docIdRangeData = res;
      },
      error: (err: any) => {
      },
    });
  }
}
