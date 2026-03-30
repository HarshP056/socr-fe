import { Component, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageUserService, MiscService } from 'src/app/services';
import { LogicalSystemService } from 'src/app/services/logical-system.service';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { CreateLogicalSystemComponent } from './component/create-logical-system/create-logical-system.component';
import { MessageService } from 'primeng/api';
import { DeleteConfirmationModalComponent } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-logical-systems',
  templateUrl: './logical-systems.component.html',
  styleUrls: ['./logical-systems.component.scss'],
})
export class LogicalSystemsComponent {
  initialLoader: boolean = false;
  isLoading: boolean = false;
  logicalSystemData: any = [];
  role:any;
  displayedColumns: any = ['systemId', 'docIdLogicType', 'description', 'action'];
  @ViewChild('deleteModal', { static: false })
  deleteModal: DeleteConfirmationModalComponent;
  deleteId: number;
  isDelete: boolean = false;
  constructor(
    private messageSer: MessageUserService,
    private logicalSystemService: LogicalSystemService,
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
    this.getLogicalSystems();
  }

  getLogicalSystems() {
    this.logicalSystemService.getAllLogicalSystems().subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.initialLoader = false;
        this.logicalSystemData = res;
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

  deleteSystem() {
    this.isDelete = true;
    this.logicalSystemService.deleteLogicalSystem(this.deleteId.toString()).subscribe({
      next: (res: any) => {
        this.isDelete = true;
        this.deleteModal.hide();
        this.getLogicalSystems();
      },
      error: (err: any) => {
        this.isDelete = true;
      },
    });
  }

  openDialog(id: string) {
    this.dialog
      .open(CreateLogicalSystemComponent, {
        disableClose: true,
        height: '100%',
        width: '35%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: id,
      })
      .afterClosed().subscribe((val) => {
          this.getLogicalSystems();
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
