import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MessageService } from 'primeng/api';
import { MessageUserService, MiscService } from 'src/app/services';
import { EmailTemplatesService } from 'src/app/services/email-templates.service';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { EmailTemplateDetailsComponent } from './component/email-template-details/email-template-details.component';
import { DeleteConfirmationModalComponent } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.component';
import { NgToastService } from 'ng-angular-popup';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-email-templates',
  templateUrl: './email-templates.component.html',
  styleUrls: ['./email-templates.component.scss'],
})
export class EmailTemplatesComponent {
  @ViewChild(MatMenuTrigger) ddTrigger: MatMenuTrigger;
  @ViewChild('deleteModal', { static: false })
  deleteModal: DeleteConfirmationModalComponent;
  applicationData: any = [];
  displayedColumns: string[] = ['check', 'title', 'type', 'enabled', 'action'];
  emailTemplateTypes: any = [];
  deleteId: number;
  isDelete: boolean = false;
  oauthId: string = '';
  isWait: boolean = false;
  pageInd: number = 0;
  emailTemplatesData: any = [];
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  isDownload: boolean = false;
  selectedList:any=[]
  exportButton: boolean = false;
  queryParams = {
    page: 1,
    order: '-templateId',
    limit: 10,
  };

  searchParams = {
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
    private emailtemplatesService: EmailTemplatesService,
    private miscService: MiscService,
    private toast: NgToastService
  ) {
    this.messageSer.appSidebar = false;
  }
  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }

  ngOnInit(): void {
    this.initialLoader = true;
    this.getUrlParams();
    this.getAllEmailTemplateTypes();
  }

  getEmailTemplates() {
    this.emailtemplatesService.getAllEmailTemplates().subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.initialLoader = false;
        this.resettingLoader = false;
        this.emailTemplatesData = res;
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

  getAllEmailTemplateTypes() {
    this.emailtemplatesService.getEmailTemplateTypes().subscribe({
      next: (res: any) => {
        this.emailTemplateTypes = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  openConfirmationModal(val: any) {
    this.deleteId = val.id;
    this.deleteModal.show();
  }
  onEdit(val: any) {
    this.router.navigateByUrl(
      '/system-admin/configurations/email-templates/edit-email-template/' + val
    );
  }

  deleteEmailTemplate() {
    this.emailtemplatesService
      .deleteEmailTemplates(this.deleteId.toString())
      .subscribe({
        next: (res: any) => {
          this.deleteModal.hide();
          this.getEmailTemplates();
        },
        error: (err: any) => {},
      });
  }

  openDialog(id: string) {
    this.dialog
      .open(EmailTemplateDetailsComponent, {
        disableClose: true,
        height: '100%',
        width: '35%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: id,
      })
      .afterClosed()
      .subscribe((val) => {
        this.getEmailTemplates();
      });
  }

  onPageChange(event: PageEvent) {
    this.initialLoader = true;
    this.queryParams.limit = event.pageSize;
    this.pageInd = event.pageIndex;
    this.queryParams.page = event.pageIndex + 1;
    this.getEmailTemplates();
  }

  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.queryParams.order = '-' + sort.active;
    } else if (sort.direction === 'desc') {
      this.queryParams.order = sort.active;
    }
    this.getEmailTemplates();
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
      this.getEmailTemplates();
    });
  }

   select(event:any, item:any){
      if(!event.target.checked && this.selectedList){
        let removeIndex = this.selectedList.findIndex((data:any)=> data.id === item.id)
        this.selectedList.splice(removeIndex, 1)
      }
      this.selectedList=[];
      this.emailTemplatesData.map((element:any, index:any) => {
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
      let array : any = [];
      if(this.selectedList?.length){
        array = this.selectedList.map((elem:any) => elem.id)
      }
      this.emailtemplatesService.exportEmailTemplates(array).subscribe({
        next: (res: any) => {
          this.isDownload = false;
          console.log(res, 'res');
          if (res instanceof Blob) {
            saveAs(res, 'email_templates.zip');
            this.selectedList = [];
            this.exportButton = false;
            this.getEmailTemplates();
            this.toast.success({detail:"SUCCESS",summary:'Download Successfully'});
          }
        },
        error: (err: any) => {
          console.log(err, 'err')
        }
      })
    }
}
