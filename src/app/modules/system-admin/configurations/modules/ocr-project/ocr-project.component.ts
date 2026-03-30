import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, MessageUserService, MiscService } from 'src/app/services';
import { OcrProjectService } from 'src/app/services/ocr-project.service';
import { DeleteConfirmationModalComponent } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.component';
import { Location } from '@angular/common';
import * as saveAs from 'file-saver';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-ocr-project',
  templateUrl: './ocr-project.component.html',
  styleUrls: ['./ocr-project.component.scss']
})
export class OcrProjectComponent implements OnInit {
  displayedColumns = [
    'check',
    'projectId',
    'projectNameOrGuid',
    'pageSize',
    'autoVerification',
    'action',
  ];

  total: number = 0;
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  dataSource!: MatTableDataSource<any>;
  pageEvent: PageEvent;
  ocrProfile: any[] = ['FCI', 'MDI'];
  order = '-id';
  size: number = 10;
  limits = [5, 10, 25, 50];
  page: number = 1;
  engineTypes: any=[]
  queryParams: any = {
    limit: 10,
    order: '-projectNameOrGuid',
    page: 1,
    profileName: '',
    engineType: ''
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
    private ocrProjectService: OcrProjectService,
    private commonService: CommonService,
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
      '/system-admin/configurations/ocr-projects/edit/' + element.id
    );
  }

  deleteOcrProject() {
    this.isDelete = true;
    this.ocrProjectService.deleteOcrProfile(this.deleteId).subscribe({
      next: (res: any) => {
        this.isDelete = false;
        this.getOcrProjects();
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
    this.getOcrProjects();
  }

  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.queryParams.order = '-' + sort.active;
    } else if (sort.direction === 'desc') {
      this.queryParams.order = sort.active;
    }
    this.getOcrProjects();
  }

  reset() {
    this.resettingLoader = true;
    this.queryParams.order = '-id';
    this.queryParams.profileName = '';
    this.queryParams.engineType = '';
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
    this.getOcrProjects();
  }

  search() {
    this.isLoading = true;
    this.page = 1;
    this.getOcrProjects();
  }

  private getArgsObj() {
    const obj: any = {
      limit: this.queryParams.limit,
      order: this.queryParams.order,
      page: this.queryParams.page
    };
    if (this.queryParams.profileName)
      obj['profileName'] = this.queryParams.profileName;
    if (this.queryParams.engineType)
      obj['engineType'] = this.queryParams.engineType;
    return obj;
  }

  private getOcrProjects() {
    this.ocrProjectService.getOcrProjectsPage(this.getArgsObj()).subscribe({
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
          this.queryParams.profileName,
          this.queryParams.engineType
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
    _profileName: any | '',
    _engineType:any | ''
  ) {
    const queryParams: any = {
      limit: _limit,
      page: _page,
      order: _order,
      profileName: _profileName || '',
      engineType: _engineType || ''
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

      if (params['profileName']) {
        this.queryParams.profileName = params['profileName'];
      }
      if (params['engineType']) {
        this.queryParams.engineType = params['engineType'];
      }
      this.getOcrProjects();
    });
  }

  getEngines() {
    this.commonService.getEngines().subscribe({
      next: (res: any) => {
        this.engineTypes = res;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.resettingLoader = false;
      },
    });
  }

  duplicate(element: any){
    // this.ocrProjectService.duplicateProfile(element.id).subscribe({
    //   next: (res: any) => {
    //     this.getOcrProjects();
    //   },
    //   error: (err: any) => {
    //     this.isLoading = false;
    //     this.resettingLoader = false;
    //   },
    // });
    this.router.navigateByUrl(
      '/system-admin/configurations/ocr-projects/copy/' + element.id
    );
  }

  select(event:any, item:any){
    if(!event.target.checked && this.selectedList){
      let removeIndex = this.selectedList.findIndex((data:any)=> data.id === item.id)
      this.selectedList.splice(removeIndex, 1)
    }
    this.selectedList=[];
    this.ocrProfile.map((element, index) => {
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
      projectNameOrGuid : this.queryParams.profileName
    }
    let array : any = [];
    if(this.selectedList?.length){
      array = this.selectedList.map((elem:any) => elem.id)
    }
    this.ocrProjectService.exportOcrProject(qry, array).subscribe({
      next: (res: any) => {
        this.isDownload = false;
        console.log(res, 'res');
        if (res instanceof Blob) {
          saveAs(res, 'ocr_project.zip');
          this.selectedList = [];
          this.exportButton = false;
          this.getOcrProjects();
          this.toast.success({detail:"SUCCESS",summary:'Download Successfully'});
        }
      },
      error: (err: any) => {
        console.log(err, 'err')
      }
    })
  }

}
