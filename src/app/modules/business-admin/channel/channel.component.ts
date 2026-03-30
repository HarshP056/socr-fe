import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageUserService } from 'src/app/services/message-user.service';
import { Location } from '@angular/common';
import { MiscService } from 'src/app/services';
import { Sort } from '@angular/material/sort';
import { ChannelService } from 'src/app/services/channel.service';
import { BasicModalComponent } from 'src/app/shared/modals/basic-modal/basic-modal.component';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { DeleteConfirmationModalComponent } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.component';
import { ReadEmailService } from 'src/app/services/read-email.service';
import { ViewChannelLogComponent } from './components/view-channel-log/view-channel-log.component';
@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements OnInit {
  displayedColumns = [
    'usernameId',
    'enabled',
    'processorType',
    'mode',
    'type',
    'authType',
    // 'action',
  ];
  searchForm: any = {
    username: '',
  };
  total: number = 0;
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  dataSource!: MatTableDataSource<any>;
  pageEvent: PageEvent;
  channels: any[] = [];
  order = '-usernameId';
  size: number = 10;
  limits = [5, 10, 25, 50];
  page: number = 1;
  queryParams: any = {
    size: this.size,
    order: this.order,
    page: this.page,
    username: '',
  };
  @ViewChild('addEmialModal', { static: false })
  addEmialModal: BasicModalComponent;
  @ViewChild('addEmialView', { static: false })
  addEmialView: TemplateRef<any>;
  editChannel: string;
  getChannel: any;
  @ViewChild('deleteModal', { static: false })
  deleteModal: DeleteConfirmationModalComponent;
  deleteId: number;
  isDelete: boolean = false;
  isViewLog: boolean=false;
  constructor(
    private messageSer: MessageUserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private misc: MiscService,
    private channelService: ChannelService,
    private dialog: NgDialogAnimationService,
    // private dialog: NgDialogAnimationService,
    private reamService: ReadEmailService
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

  run(element: any) {
    element.isWaiting = true;
    this.reamService.readEmail(element.id).subscribe({
      next: (res: any) => {
        console.log(element.isWaiting);
        element.isWaiting = false;
        // this.isprocess = false;
        this.getAllChannels();
      },
      error: (err) => {
        element.isWaiting = false;
        // this.isprocess = false;
      },
    });
  }

  deleteChannel() {
    this.isDelete = true;
    this.channelService.deleteChannel(this.deleteId).subscribe({
      next: (res: any) => {
        this.isDelete = false;
        this.getAllChannels();
        this.deleteModal.hide();
      },
      error: (err) => {
        this.isDelete = false;
      },
    });
  }

  createEmail() {
    this.editChannel = 'new';
    this.addEmialModal.templateRef = this.addEmialView;
    this.addEmialModal.show();
  }

  goToScanner() {
    this.router.navigateByUrl('/system-admin/configurations/channel/scanner');
  }

  goToFtp() {
    this.router.navigateByUrl(
      '/system-admin/configurations/channel/ftp-channel'
    );
  }
  goToThicklineChannel() {
    this.router.navigateByUrl(
      '/system-admin/configurations/channel/thick-client-channel'
    );
  }

  EditChannelType(element: any) {
    this.router.navigateByUrl(
      '/business-admin/channel/edit-channel/' + element.id
    );
  }

  EditChannel(element: any) {
    this.editChannel = 'edit';
    this.getChannel = element;
    this.addEmialModal.templateRef = this.addEmialView;
    this.addEmialModal.show();
  }

  onSuccess(val: any) {
    // this.editMode = false;
    // this.getAlldataObject();
    // this.createWorkFlowModal.hide();
  }

  // pagination and sorting start

  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.order = sort.active;
      this.queryParams.order = this.order;
      this.page;
      this.size;
      this.getAllChannels();
    } else if (sort.direction === 'desc') {
      this.order = '-' + sort.active;
      this.queryParams.order = this.order;
      this.page;
      this.size;
      this.getAllChannels();
    }
  }

  onPaginateChange(event: any) {
    this.initialLoader = true;
    this.page = event.pageIndex + 1;
    this.size = event.pageSize;
    this.queryParams.page = this.page;
    this.queryParams.size = this.size;
    this.getAllChannels();
  }
  // pagination and sorting end

  // search filter and reset start

  reset() {
    this.resettingLoader = true;
    this.order = '-usernameId';
    this.size = 10;
    this.page = 1;
    this.updateQueryParams(
      this.size,
      this.page,
      (this.order = '-usernameId'),
      ''
    );
    this.searchForm = {};
    this.queryParams = {};
    this.resettingLoader = true;
    this.getAllChannels();
  }
  search() {
    this.isLoading = true;
    this.queryParams.username = this.searchForm.username || '';
    this.page = 1;
    this.getAllChannels();
  }

  // search filter and reset end
  private getArgsObj() {
    const obj: any = {
      limit: this.size,
      order: this.order,
      page: this.page,
    };
    if (this.searchForm.username) obj['username'] = this.searchForm.username;
    return obj;
  }

  private getAllChannels() {
    this.channelService.getCannelByPage(this.getArgsObj()).subscribe({
      next: (res: any) => {
        this.channels = res['content'];
        this.total = res.totalElements;
        this.initialLoader = false;
        this.resettingLoader = false;
        this.isLoading = false;
        if (this.resettingLoader) {
          this.size = 10;
          this.page = 1;
          this.order = '-usernameId';
          this.searchForm = {};
          this.queryParams.size = 10;
          this.queryParams.page = 1;
          this.queryParams.username = '';
        }
        this.updateQueryParams(
          this.queryParams.size,
          this.queryParams.page,
          this.queryParams.order,
          this.queryParams.username
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
    _size: number,
    _page: number,
    _order: string,
    _username: any | ''
  ) {
    const queryParams: any = {
      size: _size,
      page: _page,
      order: _order,
      username: _username || '',
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
      if (params['order']) {
        this.queryParams.order = params['order'];
        this.order = params['order'];
      }

      if (params['username']) {
        this.queryParams.username = params['username'];
        this.searchForm.username = params['username'];
      }
      this.getAllChannels();
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

  
  openViewLog(id: string) {
    this.dialog
      .open(ViewChannelLogComponent, {
        disableClose: true,
        height: '100%',
        width: '35%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: id,
      })
      .afterClosed();
  }

  // api call and queryparams end
}
