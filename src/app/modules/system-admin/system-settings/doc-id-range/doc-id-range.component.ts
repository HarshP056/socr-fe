import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { MessageUserService, MiscService } from 'src/app/services';
import { LogicalSystemService } from 'src/app/services/logical-system.service';
import { DocIdRangeService } from 'src/app/services/doc-id-range.service';
import { CreateDocidRangeComponent } from './components/create-docid-range/create-docid-range.component';
import { DeleteConfirmationModalComponent } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-doc-id-range',
  templateUrl: './doc-id-range.component.html',
  styleUrls: ['./doc-id-range.component.scss']
})
export class DocIdRangeComponent {
  initialLoader: boolean = false;
  isLoading: boolean = false;
  docIdRangeData: any = [];
  role:any;
  displayedColumns: any = ['id', 'seqStart','seqEnd','sequence', 'action'];
  @ViewChild('deleteModal', { static: false })
  deleteModal: DeleteConfirmationModalComponent;
  deleteId: number;
  isDelete: boolean = false;
  constructor(
    private messageSer: MessageUserService,
    private docIdRangeService: DocIdRangeService,
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
    this.getDocIdRange();
  }

  getDocIdRange() {
    this.docIdRangeService.getAllDocIdRange().subscribe({
      next: (res: any) => {
        console.log(res)
        this.isLoading = false;
        this.initialLoader = false;
        this.docIdRangeData = res;
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

  deleteDocIdRange() {
    this.isDelete = true;
    this.docIdRangeService.deleteDocIdRange(this.deleteId.toString()).subscribe({
      next: (res: any) => {
        this.isDelete = false;
        this.deleteModal.hide();
        this.getDocIdRange();
      },
      error: (err: any) => {
        this.isDelete = false;
      },
    });
  }

  checkForSuperAdmin(){
    return this.role === 'SuperAdmin';
  }

  openDialog(id: string) {
    this.dialog
      .open(CreateDocidRangeComponent, {
        disableClose: true,
        height: '100%',
        width: '35%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: id,
      })
      .afterClosed()
      .subscribe(val => {
        this.getDocIdRange();
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
