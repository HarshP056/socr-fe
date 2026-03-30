import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageUserService, MiscService, OcrMapperConfigService, CommonService } from 'src/app/services';
import { DeleteConfirmationModalComponent } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.component';
import { Location } from '@angular/common';
import { MetadataConfigService } from 'src/app/services/metadata-config.service';
import { NgToastService } from 'ng-angular-popup';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-metadata-mapping',
  templateUrl: './metadata-mapping.component.html',
  styleUrls: ['./metadata-mapping.component.scss']
})
export class MetadataMappingComponent implements OnInit {

  displayedColumns = [
    'check',
    'id',
    'name',
    'action',
  ];
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
  isDownload: boolean = false;
  selectedList:any=[]
  exportButton: boolean = false;

  constructor(
    private messageSer: MessageUserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private misc: MiscService,
    private metadataConfigService: MetadataConfigService,
    private toast: NgToastService
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
      '/system-admin/configurations/metadata-mapping/edit-meta-field-data/' + element.id
    );
  }

  deleteOcrProfile() {
    this.isDelete = true;
    this.metadataConfigService.deleteMetaDataMapping(this.deleteId).subscribe({
      next: (res: any) => {
        this.isDelete = false;
        this.getAllMetaDataConfig();
        this.deleteModal.hide();
      },
      error: (err) => {
        this.isDelete = false;
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.initialLoader = true;
    this.queryParams.limit = event.pageSize;
    this.page = event.pageIndex;
    this.queryParams.page = event.pageIndex + 1;
    this.getAllMetaDataConfig();
  }

  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.queryParams.order = '-' + sort.active;
    } else if (sort.direction === 'desc') {
      this.queryParams.order = sort.active;
    }
    this.getAllMetaDataConfig();
  }

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
    this.getAllMetaDataConfig();
  }

  search() {
    this.isLoading = true;
    this.page = 1;
    this.getAllMetaDataConfig();
  }

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

  private getAllMetaDataConfig() {
    this.metadataConfigService.getAllMetaData(this.getArgsObj()).subscribe({
      next: (res: any) => {
        this.ocrProfile = res['content'];
        this.total = res.totalElements;
        this.initialLoader = false;
        this.resettingLoader = false;
        this.isLoading = false;
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
      }
      if (params['order']) {
        this.queryParams.order = params['order'];
      }

      if (params['name']) {
        this.queryParams.name = params['name'];
      }
      this.getAllMetaDataConfig();
    });
  }

     select(event:any, item:any){
        if(!event.target.checked && this.selectedList){
          let removeIndex = this.selectedList.findIndex((data:any)=> data.id === item.id)
          this.selectedList.splice(removeIndex, 1)
        }
        this.selectedList=[];
        this.ocrProfile.map((element:any, index:any) => {
          if (element.multiSelect) {
            this.selectedList.push(element);
          }
        });
        console.log(this.selectedList)
        if(this.selectedList?.length){
          this.exportButton = true;
        }
        else{
          this.exportButton = false;
        }

      }

      export(){
        this.isDownload = true;
        let qry: any = {
          name : this.queryParams.name
        }
        let array : any = [];
        if(this.selectedList?.length){
          array = this.selectedList.map((elem:any) => elem.id)
        }
        this.metadataConfigService.exportMetaMapping(qry,array).subscribe({
          next: (res: any) => {
            this.isDownload = false;
            console.log(res, 'res');
            if (res instanceof Blob) {
              saveAs(res, 'metadata_config.zip');
              this.selectedList = [];
              this.exportButton = false;
              this.getAllMetaDataConfig();
              this.toast.success({detail:"SUCCESS",summary:'Download Successfully'});
            }
          },
          error: (err: any) => {
            console.log(err, 'err')
          }
        })
      }

  duplicate(element: any){
    console.log(element)
    this.router.navigateByUrl(
      '/system-admin/configurations/metadata-mapping/copy/' + element.id
    );
  }
}
