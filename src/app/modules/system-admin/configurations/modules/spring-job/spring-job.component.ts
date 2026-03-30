import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { PageEvent } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MessageService } from 'primeng/api';
import { MessageUserService, MiscService } from 'src/app/services';
import { SpringJobService } from 'src/app/services/spring-job.service';
import { DeleteConfirmationModalComponent } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { ReadEmailService } from 'src/app/services/read-email.service';
import { SpringLogsComponent } from './spring-logs/spring-logs.component';

@Component({
  selector: 'app-spring-job',
  templateUrl: './spring-job.component.html',
  styleUrls: ['./spring-job.component.scss']
})
export class SpringJobComponent {
  displayedColumns = [
    'jobName',
    'cronType',
    'cronExpession',
    // 'lastUpdated',
    'jobDesc',
    'status',
    'log',
    'action',
  ];
  total: number = 0;
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  readEmailLoading: boolean = false;
  splitPageLoading: boolean = false;
  sendToOcrLoading: boolean = false;
  recognizeLoading: boolean = false;
  dataSource!: MatTableDataSource<any>;
  pageEvent: PageEvent;
  JobDetails: any[] = [];
  order = '-id';
  size: number = 10;
  limits = [5, 10, 25, 50];
  page: number = 1;
  engineTypes: any = [];
  queryParams: any = {
    limit: 10,
    order: '-createdDate',
    page: 1,
  };
  @ViewChild('deleteModal', { static: false })
  deleteModal: DeleteConfirmationModalComponent;
  deleteId: number;
  isDelete: boolean = false;
  isViewLog: boolean = false;
  istriggerWaiting: boolean = false;
  constructor(
    private messageSer: MessageUserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private misc: MiscService,
    private jobSerive: SpringJobService,
    private dialog: NgDialogAnimationService,
    private readEmailService: ReadEmailService
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

  runEmail() {
    this.readEmailLoading = true;
    this.readEmailService.runReadEmail().subscribe({
      next: (res: any) => {
        this.readEmailLoading = false;
        this.getAllJobs();
      },
      error: (err) => {
        this.readEmailLoading = false;
      },
    });
  }
  runSplitPage() {
    this.splitPageLoading = true;
    this.readEmailService.runSplitPage().subscribe({
      next: (res: any) => {
        this.splitPageLoading = false;
        this.getAllJobs();
      },
      error: (err) => {
        this.splitPageLoading = false;
      },
    });
  }

  runsendToOcr() {
    this.sendToOcrLoading = true;
    this.readEmailService.sendToOcr().subscribe({
      next: (res: any) => {
        this.sendToOcrLoading = false;
        this.getAllJobs();
      },
      error: (err) => {
        this.sendToOcrLoading = false;
      },
    });
  }
  runrecognize() {
    this.recognizeLoading = true;
    this.readEmailService.runRecognizeOcr().subscribe({
      next: (res: any) => {
        this.recognizeLoading = false;
        this.getAllJobs();
      },
      error: (err) => {
        this.recognizeLoading = false;
      },
    });
  }

  openConfirmationModal(val: any) {
    this.deleteId = val.jobName;
    this.deleteModal.show();
  }

  deleteJobs() {
    this.isDelete = true;
    this.jobSerive.deleteJobs(this.deleteId).subscribe({
      next: (res: any) => {
        this.isDelete = false;
        this.getAllJobs();
        this.deleteModal.hide();
      },
      error: (err) => {
        this.isDelete = false;
      },
    });
  }

  openViewLog(element: string) {
    this.dialog
      .open(SpringLogsComponent, {
        // disableClose: true,
        height: '100%',
        width: '60%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: element,
      })
      .afterClosed();
  }

  // openNewDialog() {
  //   this.dialog
  //     .open(UpdateJobsComponent, {
  //       disableClose: true,
  //       height: '100%',
  //       width: '35%',
  //       animation: { to: 'left' },
  //       position: { top: '0px', bottom: '0px', right: '0px' },
  //     })
  //     .afterClosed()
  //     .subscribe((val) => {
  //       this.getAllJobs();
  //     });
  // }
  runTrigger(element: any) {
    // this.dialog
    //   .open(TriggeredJobsComponent, {
    //     // disableClose: true,
    //     height: '100%',
    //     width: '35%',
    //     animation: { to: 'left' },
    //     position: { top: '0px', bottom: '0px', right: '0px' },
    //     data: element,
    //   })
    //   .afterClosed()
    //   .subscribe((val) => {});
  }
  openDialog(item: any) {
    let element = item || '';
    let selectedJobTypes:any=[];
    this.JobDetails.map(item=>{
      if(element.skJob !== item.skJob && item){
        selectedJobTypes.push(item.skJob)
      }    
    })
    // this.dialog
    //   .open(UpdateJobsComponent, {
    //     disableClose: true,
    //     height: '100%',
    //     width: '35%',
    //     animation: { to: 'left' },
    //     position: { top: '0px', bottom: '0px', right: '0px' },
    //     data: {element, selectedJobTypes},
    //   })
    //   .afterClosed()
    //   .subscribe((val) => {
    //     this.getAllJobs();
    //   });
  }

  onPause(element: any) {
    element.isPause = true;
    this.jobSerive.pausejob(element.jobName).subscribe({
      next: (res: any) => {
        element.isPause = false;
        this.getAllJobs();
      },
      error: (err) => {
        element.isPause = false;
      },
    });
  }
  onResume(element: any) {
    element.isResume = true;
    this.jobSerive.resumejob(element.jobName).subscribe({
      next: (res: any) => {
        element.isResume = false;
        this.getAllJobs();
      },
      error: (err) => {
        element.isResume = false;
      },
    });
  }

  // pagination and sorting start

  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.queryParams.order = sort.active;
      this.queryParams.order = this.queryParams.order;
      this.queryParams.page;
      this.queryParams.size;
      this.getAllJobs();
    } else if (sort.direction === 'desc') {
      this.queryParams.order = '-' + sort.active;
      this.queryParams.order = this.queryParams.order;
      this.queryParams.page;
      this.queryParams.size;
      this.getAllJobs();
    }
  }

  onPaginateChange(event: any) {
    this.initialLoader = true;
    this.queryParams.page = event.pageIndex + 1;
    this.queryParams.size = event.pageSize;
    this.page = this.page;
    this.queryParams.size = this.size;
    this.getAllJobs();
  }
  onPageChange(event: PageEvent) {
    this.initialLoader = true;
    this.queryParams.limit = event.pageSize;
    this.page = event.pageIndex;
    this.queryParams.page = event.pageIndex + 1;
    this.getAllJobs();
  }

  // pagination and sorting end

  // search filter and reset start
  reset() {
    this.resettingLoader = true;
    this.queryParams.order = '-id';
    this.queryParams.profileName = '';
    this.queryParams.engine = '';
    this.queryParams.limit = 10;
    this.queryParams.page = 1;
    this.page = 1;
    this.updateQueryParams(
      this.queryParams.limit,
      this.queryParams.page,
      (this.queryParams.order = 'id')
    );
    this.resettingLoader = true;
    this.getAllJobs();
  }

  search() {
    this.isLoading = true;
    this.page = 1;
    this.getAllJobs();
  }

  // search filter and reset end
  private getArgsObj() {
    const obj: any = {
      size: this.queryParams.limit,
      orderBy: this.queryParams.order,
      page: this.queryParams.page,
    };
    return obj;
  }

  private getAllJobs() {
    this.jobSerive.getJobByPage(this.getArgsObj()).subscribe({
      next: (res: any) => {
        this.JobDetails = res['content'];
        this.total = res.totalElements;
        this.initialLoader = false;
        this.resettingLoader = false;
        this.isLoading = false;
        this.updateQueryParams(
          this.queryParams.limit,
          this.queryParams.page,
          this.queryParams.order
        );
      },
      error: (err: any) => {
        this.isLoading = false;
        this.resettingLoader = false;
        this.initialLoader = false;
      },
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
        queryParams: queryParams,
      })
      .toString();
    this.location.replaceState(url);
  }

  private getUrlParams() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['size'] && this.misc.isPositiveInteger(params['size'])) {
        this.queryParams.limit = params['size'];
      }
      if (params['page'] && this.misc.isPositiveInteger(params['page'])) {
        this.queryParams.page = Number(params['page']);
        // this.queryParams.page = Number(params['page']);
      }
      if (params['orderBy']) {
        this.queryParams.order = params['orderBy'];
        // this.order = params['order'];
      }

      this.getAllJobs();
    });
  }
}
