import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { MessageUserService, MiscService } from 'src/app/services';
import { SmartKeyStoreConfigService } from 'src/app/services/smart-key-store.service';
import { DeleteConfirmationModalComponent } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.component';
import { SystemConfigService } from 'src/app/services/system-config.service';
import { SystemConfigDetailsComponent } from './system-config-details/system-config-details.component';


@Component({
  selector: 'app-system-config',
  templateUrl: './system-config.component.html',
  styleUrls: ['./system-config.component.scss']
})
export class SystemConfigComponent {
  initialLoader: boolean = false;
  isLoading: boolean = false;
  smartStoreKeyConfigData: any = [];
  role:any;
  displayedColumns: any = ['key', 'value', 'action'];
  @ViewChild('deleteModal', { static: false })
  deleteModal: DeleteConfirmationModalComponent;
  deleteId: number;
  isDelete: boolean = false;
  constructor(
    private messageSer: MessageUserService,
    private sysConfigService: SystemConfigService,
    private router: Router,
    private dialog: NgDialogAnimationService,
    private messageService: MessageService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private miscService: MiscService
  ) {
    this.messageSer.appSidebar = false;
  }

  ngOnInit(): void {
    this.role = JSON.parse(localStorage.getItem('_user')||'');
    this.role = this.role['user']['role'];
    if(this.role !== 'SuperAdmin'){
      this.displayedColumns.pop();
    }
    this.initialLoader = true;
    this.getSmartKeyStoreConfig();
  }

  getSmartKeyStoreConfig() {
    this.sysConfigService.getAllSystemConfig().subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.initialLoader = false;
        this.smartStoreKeyConfigData = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  openConfirmationModal(val: any) {
    this.deleteId = val;
    this.deleteModal.show();
  }

  deleteSmartKeyStoreConfig() {
    this.isDelete = true;
    this.sysConfigService.deleteSmartKeyStoreConfig(this.deleteId.toString()).subscribe({
      next: (res: any) => {
        this.isDelete = false;
        this.deleteModal.hide();
        this.getSmartKeyStoreConfig();
      },
      error: (err: any) => {
        this.isDelete = false;
      },
    });
  }

  openDialog(id: string) {
    this.dialog
      .open(SystemConfigDetailsComponent, {
        disableClose: true,
        height: '100%',
        width: '35%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: id,
      })
      .afterClosed()
      .subscribe((val) => {
        console.log(val, 'smartkeycompo')
        this.getSmartKeyStoreConfig();
      });
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
        queryParams: {},
      })
      .toString();
    this.location.replaceState(url);
  }

  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }
}
