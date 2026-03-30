import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, MessageUserService, MiscService, OcrConfigService, OcrProjectService, OCRService, SocrOcrService, StorageService} from 'src/app/services';
import { Location } from '@angular/common';
import { PdfDocumentViewerComponent } from 'src/app/shared/components/pdf-document-viewer/pdf-document-viewer.component';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MdiResponseComponent } from './component/mdiResponse/mdi-response.component';
import { ReadEmailService } from 'src/app/services/read-email.service';
import { NotificationLogsComponent } from 'src/app/shared/components/notification-logs/notification-logs.component';
import * as saveAs from 'file-saver';
import { UploadFileComponent } from './component/upload-file/upload-file.component';
import { MessageService } from 'primeng/api';
import moment from 'moment';
import { ErrorLogComponent } from './component/error-log/error-log.component';
import { faSync } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-socr-q',
  templateUrl: './ocr-q.component.html',
  styleUrls: ['./ocr-q.component.scss'],
})
export class SOcrQComponent implements OnInit {
  faSync = faSync;

  displayedColumns: any[] = [
    'requestId',
    'docId',
    'projectName',
    'fileName',
    'location',
    'logicalSystem',
    'createdBy',
    'createdDate',
    'action',
  ];
  invoices: any[] = [];
  searchForm: any = {
    username: '',
    status: '',
  };
  total: number = 0;
  isLoading: boolean = false;
  ocrQueueLoading: boolean = false;
  junkButton: boolean = false;
  initButton: boolean = false;
  junkLoading: boolean = false;
  initLoading: boolean = false;
  newOCRLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  dataSource!: MatTableDataSource<any>;
  pageEvent: PageEvent;
  channels: any[] = [];
  pageInd: number = 0;
  statusList: any[] = [
    'NEW',
    'INIT',
    'JUNK',
    'OCR',
    'ERP',
    'ERROR',
    'OCR_COMPLETED',
  ];
  order = '-createdDate';
  reloadProcess: boolean = false;
  selectedList: any = []
  limit: number = 10;
  limits = [5, 10, 25, 50];
  page: number = 1;
  maxDate = new Date();
  queryParams: any = {
    limit: this.limit,
    order: this.order,
    page: this.page,
    fromEmail: '',
    toEmail: '',
    docId: '',
    batchId: '',
    createdDate: [],
    fromDate: '',
    toDate: '',
    status: '',
  };
  documentId: any;
  totalLength: any;
  activeTab: string = 'New';
  stageCount: any;
  newCount: any;
  recognizingCount: any;
  processedCount: any;
  exceptionCount: any;
  verificationCount: number;
  selectedRequestId:any;
  searchQueryParams: any = {
    docId: '',
    fileName: '',
    limit: 10,
    order: '-createdDate',
    page: 1,
    projectId: '',
    fromDate: '',
    toDate: '',
    location:''
  };
  project: any[] = [];
  queyList: any = {
    page: 1,
    limit: 50,
    order: "projectNameOrGuid"
  };
  user: any;
  processing: boolean;
  constructor(
    private oCRService: OCRService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private misc: MiscService,
    private dialog: NgDialogAnimationService,
    private commonService: CommonService,
    private readEmailService: ReadEmailService,
    private ocrConfigService: OcrConfigService,
    private messageService: MessageService,
    private socrOcrService: SocrOcrService,
    private ocrProjectService : OcrProjectService,
    private storageService : StorageService
  ) { }

  ngOnInit(): void {
    this.initialLoader = true;
    this.user = this.storageService.getUser();
    this.getUrlParams();
    this.getOcrProjects();
  }

  onShowNotification(data: string) {
    this.dialog
      .open(NotificationLogsComponent, {
        // disableClose: true,
        height: '100%',
        width: '60%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: data,
      })
      .afterClosed();
  }

  runQueue(element: any) {
    //console.log('runQueue')
    element.isInItWaiting = true;
    this.readEmailService.iniTinvoicE(element.requestId).subscribe({
      next: (res: any) => {
        element.isWaiting = false;
        this.getInvoices();
      },
      error: (err) => {
        element.isWaiting = false;
      },
    });
  }

  runERPSYNC(element: any) {
    const obj: any = {
      sync: element.erpSync,
    };
    element.isSyncWaiting = true;
    this.oCRService.runERPSync(obj, element.id).subscribe({
      next: (res: any) => {
        element.isWaiting = false;
        this.getInvoices();
      },
      error: (err) => {
        element.isWaiting = false;
      },
    });
  }

  onMove(docId: any, status: any) {
    const obj: any = {
      status: status,
    };
    this.commonService.moveStatus(docId, obj).subscribe({
      next: (res: any) => {
        this.getInvoices();
      },
      error: (error) => { },
    });
  }
  // pagination and sorting start

  sortChange(sort: Sort) {
    console.log('sortChange')
    if (sort.direction === 'asc') {
      this.order = sort.active;
      this.searchQueryParams.order = this.order;
      this.searchQueryParams.page;
      this.searchQueryParams.limit;
      this.getInvoices();
    } else if (sort.direction === 'desc') {
      this.order = '-' + sort.active;
      this.searchQueryParams.order = this.order;
      this.searchQueryParams.page;
      this.searchQueryParams.limit;
      this.getInvoices();
    }
  }

  onPaginateChange(event: any) {
    //console.log('onPaginateChange')
    this.initialLoader = true;
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.searchQueryParams.page = this.page;
    this.searchQueryParams.limit = this.limit;
    this.getInvoices();
  }

  @ViewChild('paginator') paginator: MatPaginator;

  reset() {
    this.resettingLoader = true;
    console.log('Reset')
    this.searchQueryParams.page = 1;
    this.searchQueryParams.order = '-createdDate';
    this.searchQueryParams.stage = this.activeTab;
    this.searchQueryParams.docId = '';
    this.searchQueryParams.fileName = '';
    this.searchQueryParams.fromDate = '';
    this.searchQueryParams.toDate = '';
    this.searchQueryParams.createdDate = [];
    this.searchQueryParams.location = '';
    this.queryParams.createdDate = [];
    this.getInvoices();
    this.updateQueryParams();
  }

  search() {
    console.log('Search')
    this.isLoading = true;
    this.searchQueryParams.page = 1;
    this.getInvoices();
  }

  getStageCount() {
    const countQueryParams: any = {};
    if (this.searchQueryParams.projectId) countQueryParams.projectId = this.searchQueryParams.projectId;
    this.socrOcrService.getStageCount(countQueryParams).subscribe((response: any) => {
      this.stageCount = response;
    });
  }

  setStage(stage: string) {
    this.activeTab = stage;
    if (!stage) {
      this.searchQueryParams.stage = "New";

      if(this.user.role !== 'VerificationUser'){
        this.searchQueryParams.stage = 'New';
      }
      else{
        this.searchQueryParams.stage = 'Verification';
      }

    } else {
      this.searchQueryParams.stage = stage;
    }
    this.searchQueryParams.fromDate = '';
    this.searchQueryParams.toDate = '';
    this.searchQueryParams.createdDate = [];
    this.queryParams.createdDate = [];
    this.getInvoices();
  }

  getInvoices() {
    this.getStageCount();
    if(this.searchQueryParams.projectId==null){
      this.searchQueryParams.projectId = '';
    }
    if(this.searchQueryParams.fromDate && this.searchQueryParams.toDate){
      this.searchQueryParams.fromDate = moment(this.searchQueryParams.fromDate).format('YYYY-MM-DD');
      this.searchQueryParams.toDate = moment(this.searchQueryParams.toDate).format('YYYY-MM-DD')
    }
    this.socrOcrService.getAllInvoices(this.searchQueryParams).subscribe((response: any) => {
      this.invoices = response.content;
      this.totalLength = response.totalElements;
      this.initialLoader = false;
      this.resettingLoader = false;
      this.isLoading = false;
      this.updateQueryParams();
    })
  }


  private updateQueryParams() {
    const searchQueryParams: any = {
      limit: this.searchQueryParams.limit,
      page: this.searchQueryParams.page,
      order: this.searchQueryParams.order,
      docId: this.searchQueryParams.docId,
      stage: this.searchQueryParams.stage,
      projectId: this.searchQueryParams.projectId,
      requestId: this.selectedRequestId,
      fromDate: this.searchQueryParams.fromDate,
      toDate: this.searchQueryParams.toDate,
      location: this.searchQueryParams.location
    };
    const url = this.router
      .createUrlTree([], {
        relativeTo: this.activatedRoute,
        queryParams: searchQueryParams,
      })
      .toString();
    this.location.replaceState(url);
  }

  private getUrlParams() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['limit'] && this.misc.isPositiveInteger(params['limit'])) {
        this.searchQueryParams.limit = params['limit'];
        this.updateSize(params['limit']);
      }
      if (params['page'] && this.misc.isPositiveInteger(params['page'])) {
        this.searchQueryParams.page = Number(params['page']);
        this.page = Number(params['page']);
      }
      if (params['order']) {
        this.searchQueryParams.order = params['order'];
        this.order = params['order'];
      }
      if (params['stage']) {
        this.searchQueryParams.stage = params['stage'];
        this.activeTab = params['stage'];
      }
      if (params['docId']) {
        this.searchQueryParams.docId = params['docId'];
      }
      if (params['projectId']) {
        this.searchQueryParams.projectId = params['projectId'];
      }
      if (params['requestId']) {
        this.selectedRequestId=params['requestId'];
      }
      if (params['fromDate']) {
        this.searchQueryParams.fromDate = params['fromDate'];
      }
      if (params['toDate']) {
        this.searchQueryParams.toDate = params['toDate'];
      }
      //console.log(this.searchQueryParams);
      // if (!this.searchQueryParams.stage) {
      //   this.setStage('New');

      if (!this.searchQueryParams.stage) { 
        if(this.user.role !== 'VerificationUser'){
          this.setStage('New');
        }
        else{
          this.setStage('Verification');
        }
      } else {
        this.getInvoices();
      }
    });
  }

  private updateSize(limit: number) {
    this.limit = limit;
    // update limits array if limit recived from URL parameters is not present
    if (!this.limits.includes(Number(limit))) {
      this.limits.push(Number(limit));
      this.limits.sort((a, b) => {
        return a - b;
      });
    }
  }

  viewDoc(element: any) {
    this.dialog.open(PdfDocumentViewerComponent, {
      height: '100%',
      width: '48%',
      animation: { to: 'left' },
      position: { top: '0px', bottom: '0px', right: '0px' },
      data: element.attachment,
    });
    // this.offCanvas.open(this.pdfView, { position: 'end' });
  }

  openDialog(id: string) {
    this.dialog
      .open(MdiResponseComponent, {
        disableClose: true,
        height: '100%',
        width: '35%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: id,
      })
      .afterClosed();
  }

  downloadDoc(element: any) {
    this.commonService.downloadFile(element.attachment.systemId,  element.attachment.documentId).subscribe({
      next: (res: any) => {
        let blob = new Blob([res], { type: 'application/pdf' });
        let url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error: (error) => { },
    });
  }

  getDoc(element: any) {
    const docId: any = element.attachment.documentid;
    this.commonService.downloadFile(element.attachment.systemId, docId).subscribe({
      next: (res: any) => {
        const url = res.status
        window.open(url, "_blank");
      },
      error: (error) => { },
    });
  }

  downloadXML(element: any) {
    this.socrOcrService.downloadXML(element).subscribe({
      next: (res: Blob) => {
        const blob = new Blob([res], { type: 'text/xml' });
        saveAs(blob, 'file.xml');
      },
      error: (error) => {
      },
    });
  }

  proceedToNextStage(row: any) {
    if(row.state == 1) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'This item is already in processing!!'
      });
      this.getInvoices();
      return;
    }

    row.processing = true;
    this.socrOcrService.proceedToNextStage(row.requestId).subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: "Item successfully moved to next stage.",
          });

          if(res.status==='success'  && res.result!=undefined)
          {
            this.setStage(res.result.stage);
          }
          this.getInvoices();
          row.processing = false;
        },
        error: (err: any) => {
          row.processing = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Some error occurred!!',
          });
        },
      });
  }

  upload(projectId: any) {
    this.dialog
      .open(UploadFileComponent, {
        disableClose: true,
        height: '100%',
        width: '35%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: projectId,
      })
      .afterClosed().subscribe(res=>{
        this.selectedRequestId = res;
        this.setStage('New');
      });
  }

  getOcrProjects() {
    this.ocrProjectService.getOcrProjectsPage(this.queyList).subscribe({
      next: (res: any) => {
        // this.project = res['content'];
        this.initialLoader = false;
        // if (this.user.role === 'CompanyUser' && this.user.ocrProject) {
        //   const matchedProject = this.project.find((elem: any) => elem.projectNameOrGuid === this.user.ocrProject);
        //   if (matchedProject) {
        //     this.project = [matchedProject];
        //     this.searchQueryParams.projectId = matchedProject.id;

        //   }
        // }
        if ((this.user.role === 'CompanyUser' || this.user?.role === 'VerificationUser') && this.user.ocrProject.length) {
          this.user.ocrProject.forEach((item:any)=>{
            res.content.forEach((elem:any)=>{
              if(elem.projectNameOrGuid ===item){
                this.project.push(elem)
                // if(this.project.length){
                //   this.searchQueryParams.projectId = this.project[0].id;
                // }
              }
            })
          })
        }
        else{
          this.project = res['content'];
          // this.searchQueryParams.projectId = this.project[0].id;
        }
        this.getInvoices();
      },
      error: (err: any) => {
        this.initialLoader = false;
      },
    });
  }

  onProjectChange() {
    this.getInvoices();
  }

  onDateRangeSelected() {
    if (this.queryParams.createdDate?.length) {
      this.queryParams.fromDate = moment(this.queryParams.createdDate[0])
        .startOf('day')
        .toISOString();
      this.queryParams.toDate = moment(this.queryParams.createdDate[1])
        .endOf('day')
        .toISOString();
      this.searchQueryParams.fromDate = moment(this.queryParams.createdDate[0])
        .startOf('day')
        .toISOString();
      this.searchQueryParams.toDate = moment(this.queryParams.createdDate[1])
        .endOf('day')
        .toISOString();
    }
    //console.log(this.queryParams)
    //console.log(this.searchQueryParams)
  }

  removeDate() {
    this.queryParams.createdDate = [];
    this.queryParams.fromDate = '';
    this.queryParams.toDate = '';
  }

  openErrorLog(data:any){
    this.dialog
      .open(ErrorLogComponent, {
        disableClose: true,
        height: '100%',
        width: '80%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: data,
      })
      .afterClosed();
  }

  proceedToPreviousStage(row: any){
    row.state=1;
    this.socrOcrService.proceedToPreviousStage(row.requestId).subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: "Item successfully moved to previous stage.",
          });

          if(res.status==='success'  && res.result!=undefined)
          {
            this.setStage(res.result.stage);
          }
          this.getInvoices();
        },
        error: (err: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Some error occurred!!',
          });
        },
      });
  }

  reprocessInvoice(data: any) {
    data.isWaiting = true;
    this.socrOcrService.reProcessInvoice(data.requestId).subscribe({
      next: (value: any) => {
        if(value && value.result) {
          data.isWaiting = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: "Invoice re-processed successfully."
          });
        } else {
          data.isWaiting = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: "Failed to re-process invoice."
          });
        }
      }, error: (err: any) => {
        //console.log(err);
        data.isWaiting = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "Some error occurred."
        });
      },
    })
  }

}
