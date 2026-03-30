import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatMenuTrigger } from '@angular/material/menu';
import { DeleteConfirmationModalComponent } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageUserService, MiscService } from 'src/app/services';
import { MessageService } from 'primeng/api';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { SSOService } from 'src/app/services/sso.service';
import { SaveSsoClientConfigComponent } from './save-sso-client-config/save-sso-client-config.component';
@Component({
  selector: 'app-sso-client-config',
  templateUrl: './sso-client-config.component.html',
  styleUrls: ['./sso-client-config.component.scss']
})
export class SsoClientConfigComponent {
  @ViewChild(MatMenuTrigger) ddTrigger: MatMenuTrigger;
  @ViewChild('deleteModal', { static: false })
  deleteModal: DeleteConfirmationModalComponent;
  applicationData: any = [];
  displayedColumns: string[] = ['name', 'type', 'clientId', 'redirectURI', 'createdDate','action'];
  emailTemplateTypes: any = [];
  deleteId: number;
  isDelete: boolean = false;
  oauthId: string = '';
  isWait: boolean = false;
  pageInd: number = 0;
  ssoClientConfigData: any = [];
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;

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
    private ssoClientConfigService: SSOService,
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

  getSSOClientConfig() {
    this.ssoClientConfigService.getAllSSOConfig().subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.initialLoader = false;
        this.resettingLoader = false;
        this.ssoClientConfigData = res;
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


  openConfirmationModal(val: any) {
    this.deleteId = val.id;
    this.deleteModal.show();
  }
  onEdit(val: any) {
    this.router.navigateByUrl(
      '/system-admin/configurations/email-templates/edit-email-template/' + val
    );
  }

  deleteSSOClientConfig() {
    this.ssoClientConfigService
      .deleteSSOConfig(this.deleteId.toString())
      .subscribe({
        next: (res: any) => {
          this.deleteModal.hide();
          this.getSSOClientConfig();
        },
        error: (err: any) => {},
      });
  }

  openDialog(id: string) {
    this.dialog
      .open(SaveSsoClientConfigComponent, {
        disableClose: true,
        height: '100%',
        width: '35%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: id,
      })
      .afterClosed()
      .subscribe((val) => {
        this.getSSOClientConfig();
      });
  }

  onPageChange(event: PageEvent) {
    this.initialLoader = true;
    this.queryParams.limit = event.pageSize;
    this.pageInd = event.pageIndex;
    this.queryParams.page = event.pageIndex + 1;
    this.getSSOClientConfig();
  }

  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.queryParams.order = '-' + sort.active;
    } else if (sort.direction === 'desc') {
      this.queryParams.order = sort.active;
    }
    this.getSSOClientConfig();
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
      this.getSSOClientConfig();
    });
  }
}
