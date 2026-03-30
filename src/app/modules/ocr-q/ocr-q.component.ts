import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, MessageUserService, MiscService, ReadEmailService, OCRService, ChannelService, StorageService, MetadataConfigService, SystemConfigService } from 'src/app/services';
import { Location } from '@angular/common';
import moment from 'moment';
import { PdfDocumentViewerComponent } from 'src/app/shared/components/pdf-document-viewer/pdf-document-viewer.component';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { OcrXmlComponent } from './component/ocr-xml/ocr-xml.component';
import { NotificationLogsComponent } from 'src/app/shared/components/notification-logs/notification-logs.component';
import { S1ResponseComponent } from './component/s1-response/s1-response.component';
import { faChevronDown, faChevronRight, faInbox, faUserTie, faBan, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ocr-q',
  templateUrl: './ocr-q.component.html',
  styleUrls: ['./ocr-q.component.scss'],
})
export class OcrQComponent implements OnInit {
  displayedColumns: any[] = [
    'check',
    'logicalSystem',
    'receivedDate',
    'abbyBatchid',
    'status',
    'rejectionReason',
    'action',
  ];
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;
  faInbox = faInbox;
  faUserTie = faUserTie;
  faBan = faBan;
  faCircleExclamation = faCircleExclamation;

  invoices: any[] = [];
  searchForm: any = {
    username: '',
    status: '',
  };
  total: number = 0;
  isLoading: boolean = false;
  ocrQueueLoading: boolean = false;
  junkButton:boolean = false;
  initButton: boolean = false;
  junkLoading:boolean = false;
  initLoading:boolean = false;
  newOCRLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  dataSource!: MatTableDataSource<any>;
  pageEvent: PageEvent;
  channels: any[] = [];
  statusList: any[] = [
    'NEW',
    'INIT',
    'JUNK',
    'OCR',
    'ERP',
    'ERROR',
    'OCR_COMPLETED',
  ];
  order = '-id';
  reloadProcess: boolean = false;
  selectedList:any=[]
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
    channel: '',
    receivedDate: [],
    fromDate: '',
    toDate: '',
    status: '',
    fileName: '',
    channelEmail:''
  };
  documentId: string;
  activeChannel: string;
  initCount: number = 0;
  processedCount: number = 0;
  junkCount: number = 0;
  ocrCount: number = 0;
  newCount: number = 0;
  ocrCompletedCount: number = 0;
  activeLeftMenu: string = "NEW";
  showAllEmail: boolean = true;
  subChannels: any;
  user: any;
  countParams: any = {
    channel: "",
    channelId: "",
    status: "",
    isScanned: false,
    tagName:""
  };
  filteredChannels: any[] =[];
  metaDataConfigObject:any = {}
  dynamicColumn: any[] = [];
  selectedIndex: number = -1;
  systemConfig: any = {
    enable: false
  };
  constructor(
    private oCRService: OCRService,
    private messageSer: MessageUserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private misc: MiscService,
    private ocrService: OCRService,
    private dialog: NgDialogAnimationService,
    private commonService: CommonService,
    private readEmailService: ReadEmailService,
    private channelService: ChannelService,
    private storageService: StorageService,
    private metadataConfigService: MetadataConfigService,
    private systemConfigService: SystemConfigService
  ) {}

  ngOnInit(): void {
    this.user = this.storageService.getUser();
    this.initialLoader = true;
    this.getUrlParams();
    this.getActiveChannels();
    this.getSystemConfig();
  }

  private getMetaDataConfigByName(metaDataMapping: any) {
    this.metadataConfigService.getMetaDataByName(metaDataMapping).subscribe({
      next: (res: any) => {
        this.metaDataConfigObject = res;
        console.log(this.metaDataConfigObject)
        this.dynamicColumn = [];
        this.displayedColumns = []
        if(this.metaDataConfigObject?.items?.length){
          let data = this.metaDataConfigObject?.items.filter((elem:any) => elem.enable);
          if(data.length){
            this.dynamicColumn = data.map((elem:any) => elem.dataField);
          }
          this.displayedColumns = [
            'check',
            ...this.dynamicColumn,
            'logicalSystem',
            'receivedDate',
            'abbyBatchid',
            'status',
            'rejectionReason',
            'action',
          ];
        }
        else{
          this.dynamicColumn = [
            'fromEmail',
            'channelEmail',
            'requestId',
            'subject',
          ]
          this.displayedColumns = [
            'check',
            ...this.dynamicColumn,
            'logicalSystem',
            'receivedDate',
            'abbyBatchid',
            'status',
            'rejectionReason',
            'action',
          ];
        }
        console.log(this.displayedColumns)
      },
      error: (error) => {},
    });
  }

  getActiveChannels() {
    this.channelService.getCannelByPage({limit:1000, order: '-usernameId', page:1}).subscribe((res: any) => {
      if (this.user.role === 'CompanyUser' && this.user.channel.length) {
        this.user.channel.forEach((item:any)=>{
          res.content.forEach((elem:any)=>{
            if(elem.usernameId ===item){
              this.channels.push(elem)
            }
          })
        })
      }
      else{
        this.channels = res.content;
      }
      this.filteredChannels = this.getUniqueChannels(this.channels);
      let ch;
      if(this.queryParams.channel) {
        ch = this.filteredChannels.find((c:any) => c.channels == this.queryParams.channel);
        if(this.queryParams.channel == 'EMAIL') {
          this.setActiveChannel("EMAIL",'', 'Email', this.queryParams.status);
        } else if(this.queryParams.channel == 'REST') {
          this.setActiveChannel("REST", ch.metaDataMapping, 'REST', this.queryParams.status);
        } else if(this.queryParams.channel == 'NETWORK') {
          this.setActiveChannel("NETWORK", ch.metaDataMapping,'Network FS', this.queryParams.status);
        } else if(this.queryParams.channel == 'LOCAL') {
          this.setActiveChannel("LOCAL", ch.metaDataMapping,'Local FS', this.queryParams.status);
        } else if(this.queryParams.channel == 'FTP') {
          this.setActiveChannel("FTP", ch.metaDataMapping,'SFTP', this.queryParams.status);
        } else {
          ch = this.filteredChannels.find((c:any) => c.tagName == 'Scanner');
          this.setActiveChannel('SCANNER', ch.metaDataMapping, 'Scanner', this.queryParams.status);
        }
      } else if(this.queryParams.isScanned == "true") {
        ch = this.filteredChannels.find((c:any) => c.tagName == 'Scanner');
        this.setActiveChannel('SCANNER', ch.metaDataMapping, 'Scanner', this.queryParams.status);
      } else {
        if(this.filteredChannels.find((c:any) => c.enabled && c.tagName == 'Email')) {
          this.setActiveChannel("EMAIL",'', 'Email', this.queryParams.status);
        } else if(this.filteredChannels.find((c:any) => c.enabled && c.tagName == 'REST')) {
          ch = this.filteredChannels.find((c:any) => c.enabled && c.tagName == 'REST');
          this.setActiveChannel("REST", ch.metaDataMapping, 'REST', this.queryParams.status);
        } else if(this.filteredChannels.find((c:any) => c.enabled && c.tagName == 'Network FS')) {
          ch = this.filteredChannels.find((c:any) => c.enabled && c.tagName == 'Network FS');
          this.setActiveChannel("NETWORK", ch.metaDataMapping,'Network FS', this.queryParams.status);
        } else if(this.filteredChannels.find((c:any) => c.enabled && c.tagName == 'Local FS')) {
          ch = this.filteredChannels.find((c:any) => c.enabled && c.tagName == 'Local FS');
          this.setActiveChannel("LOCAL", ch.metaDataMapping,'Local FS', this.queryParams.status);
        } else if(this.filteredChannels.find((c:any) => c.enabled && c.tagName == 'SFTP')) {
          ch = this.filteredChannels.find((c:any) => c.enabled && c.tagName == 'SFTP');
          this.setActiveChannel("FTP", ch.metaDataMapping,'SFTP', this.queryParams.status);
        } else if(this.filteredChannels.find((c:any) => c.enabled && c.tagName == 'Scanner')) {
          ch = this.filteredChannels.find((c:any) => c.enabled && c.tagName == 'Scanner');
          this.setActiveChannel("Scanner", ch.metaDataMapping,'Scanner', this.queryParams.status);
        }
      }
    });
  }

  setActiveChannel(channel: string, metaDataConfig: any, tagName: string, status: string) {
    this.countParams = {};
    this.queryParams.tagName = tagName;
    this.queryParams.status = status ? status : 'OCR';

    if(channel == 'Scanner'){
      this.countParams.channel = 'SCANNER';
      this.activeChannel = 'Scanner';
      this.queryParams.isScanned = true;
      this.queryParams.channel = null;
      this.getSubChannels("");
    }
    else{
      this.countParams.channel = channel;
      this.activeChannel = channel;
      this.queryParams.isScanned = false;
      this.queryParams.channel = this.activeChannel;
    }

    if(channel != 'EMAIL' && metaDataConfig){
      this.getMetaDataConfigByName(metaDataConfig);
    }
    else {
      this.dynamicColumn = [
        'fromEmail',
        'channelEmail',
        'requestId',
        'subject',
      ]
      this.displayedColumns = [
        'check',
        ...this.dynamicColumn,
        'logicalSystem',
        'receivedDate',
        'abbyBatchid',
        'status',
        'rejectionReason',
        'action',
      ];
    }

    if(channel == 'EMAIL') {
      this.getSubChannels("Email");
    } else if(channel == 'REST') {
      this.getSubChannels("REST");
    } else if(channel == 'NETWORK') {
      this.getSubChannels("Network FS");
    } else if(channel == 'LOCAL') {
      this.getSubChannels("Local FS");
    } else if(channel == 'FTP') {
      this.getSubChannels("SFTP");
    }

    this.setActiveLeftMenu(this.queryParams.status);
  }

  setActiveLeftMenu(leftMenu: string) {
    this.activeLeftMenu = leftMenu;
    if(this.activeLeftMenu != "NEW" && this.activeLeftMenu != "PROCESSED" && this.activeLeftMenu != "JUNK" && this.activeLeftMenu != "INIT" && this.activeLeftMenu != "OCR" && this.activeLeftMenu != "OCR_COMPLETED") {
      this.queryParams.toEmail = leftMenu;
      this.countParams.channelId = leftMenu;
      this.setActiveOtherChannelSubMenu("NEW", this.selectedIndex, leftMenu);
    } else {
      this.queryParams.toEmail = "";
      this.queryParams.status = leftMenu;
      this.reset();
      this.getInvoiceStageCount(-1, "");
      if(this.user.role !== 'CompanyUser'){
        this.showHideSubMenu(null, -1);
      }
    }
  }

  showHideAllSubMenu() {
    this.showAllEmail = !this.showAllEmail;
  }

  showHideSubMenu(subMenu: any, index: number) {
    this.selectedIndex = index;

    for (let index = 0; index < this.subChannels.length; index++) {
      const element = this.subChannels[index];
      if(this.selectedIndex != index) {
        element.isShow = false;
      }
    }

    if(subMenu) {
      subMenu.isShow = !subMenu.isShow

      if(!subMenu.isShow) this.selectedIndex = -1;
    }
  }

  getSubChannels(channel: string) {
    this.subChannels = [];
    this.subChannels = this.channels.filter((c: any) => {
      // if(channel === 'local-file' && this.queryParams.isScanned === false){
      //   if(c.type === channel && c.metadata === false){
      //     return c;
      //   }
      // }
      // else if(channel === 'network-file' && this.queryParams.isScanned === false){
      //   if(c.type === channel && c.metadata === false){
      //     return c;
      //   }
      // }
      // else
      if(this.queryParams.isScanned === true){
        if(c.tagName === 'Scanner' && c.metadata === true){
          return c;
        }
      }
      else{
        if(c.tagName === channel){
          return c;
        }
      }
    });
    if (this.user.role === 'CompanyUser' && this.user.channel) {
      this.setActiveLeftMenu(this.subChannels[0].usernameId);
      this.showHideSubMenu(this.subChannels[0],0)
      this.setActiveOtherChannelSubMenu('OCR',0,this.subChannels[0].usernameId)
    }
    //console.log(this.subChannels);
  }

  setActiveOtherChannelSubMenu(stage: string, index: number, menu: string) {
    if(index > -1) {
      this.queryParams.status = stage;
      this.subChannels.forEach((element:any) => {
        element.activeMenu = stage;
        element.ocrCount = 0;
        element.processedCount = 0;
        element.junkCount = 0;
        element.ocrCompletedCount = 0;
        element.newCount = 0;
        element.initCount = 0;
      });
      this.getInvoiceStageCount(index, menu);
      this.reset();
    }
  }

  getInvoiceStageCount(index: number, menu: string) {

    if (this.queryParams.isScanned === true) {
      this.countParams['isScanned'] = this.queryParams.isScanned;
    }
    else {
      this.countParams['isScanned'] = false;
    }
    this.countParams['tagName'] = this.queryParams.tagName;
    this.ocrService.getInvoiceCount(this.countParams).subscribe((response: any) => {
      let count = response;
      if(index > -1) {
        let i = count.level2.findIndex((l:any) => l.title == menu);
        this.subChannels[index].ocrCount = count.level2[i].ocrCount;
        this.subChannels[index].processedCount = count.level2[i].processedCount;
        this.subChannels[index].junkCount = count.level2[i].junkCount;
        this.subChannels[index].ocrCompletedCount = count.level2[i].ocrCompletedCount;
        this.subChannels[index].newCount = count.level2[i].newCount;
        this.subChannels[index].initCount = count.level2[i].initCount;


      } else {
        this.ocrCount = count.ocrCount;
        this.processedCount = count.processedCount;
        this.junkCount = count.junkCount;
        this.ocrCompletedCount = count.ocrCompletedCount;
        this.newCount = count.newCount;
        this.initCount = count.initCount;
      }
    });
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
    this.ocrService.runERPSync(obj, element.id).subscribe({
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
      error: (error) => {},
    });
  }

  // pagination and sorting start
  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.order = sort.active;
      this.queryParams.order = this.order;
      this.page;
      this.limit;
      this.getInvoices();
    } else if (sort.direction === 'desc') {
      this.order = '-' + sort.active;
      this.queryParams.order = this.order;
      this.page;
      this.limit;
      this.getInvoices();
    }
  }

  onPaginateChange(event: any) {
    this.initialLoader = true;
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.queryParams.page = this.page;
    this.queryParams.limit = this.limit;
    this.getInvoices();
  }
  // pagination and sorting end

  // search filter and reset start
  reset() {
    this.resettingLoader = true;
    this.order = '-id';
    this.limit = 10;
    this.page = 1;
    this.updateQueryParams(
      this.limit,
      this.page,
      (this.order = '-id'),
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    );
    this.searchForm = {};
    this.queryParams.fromEmail = '';
    this.queryParams.docId = '';
    this.queryParams.receivedDate = [];
    this.queryParams.fileName = '';
    this.queryParams.channelEmail = '';
    this.resettingLoader = true;
    this.getInvoices();
  }

  search() {
    this.isLoading = true;
    this.page = 1;
    this.getInvoices();
  }

  private getArgsObj() {
    const obj: any = {
      limit: this.limit,
      order: this.order,
      page: this.page,
    };
    if (this.user.role === 'CompanyUser' && this.user.channel) {
      this.queryParams.toEmail = this.user.channel;
    }
    if (this.queryParams.fromEmail) {
      obj['fromEmail'] = this.queryParams.fromEmail;
    }
    if (this.queryParams.status) {
      obj['status'] = this.queryParams.status;
    }
    if (this.queryParams.toEmail) {
      obj['toEmail'] = this.queryParams.toEmail;
    }
    if (this.queryParams.docId) {
      obj['docId'] = this.queryParams.docId;
    }
    if (this.queryParams.channel) {
      obj['channel'] = this.queryParams.channel;
    }
    if (this.queryParams.tagName) {
      obj['tagName'] = this.queryParams.tagName;
    }
    if (this.queryParams.isScanned === true) {
      obj['isScanned'] = this.queryParams.isScanned;
    }
    else {
      obj['isScanned'] = false;
    }
    if (this.queryParams?.receivedDate?.length > 0){
      obj['fromDate'] = moment(this.queryParams.fromDate).format('YYYY-MM-DD');
      obj['toDate'] = moment(this.queryParams.toDate).format('YYYY-MM-DD')
    }
    if (this.queryParams.fileName) {
      obj['fileName'] = this.queryParams.fileName;
    }
    if (this.queryParams.channelEmail) {
      obj['channelEmail'] = this.queryParams.channelEmail;
    }
    return obj;
  }

  getInvoices() {
    this.oCRService.getAllInvoices(this.getArgsObj()).subscribe({
      next: (res: any) => {
        this.invoices = res['content'];
        this.invoices.forEach((element) => {
          element.multiSelect = false;
        });
        this.total = res.totalElements;
        this.initialLoader = false;
        this.resettingLoader = false;
        this.isLoading = false;
        if (this.resettingLoader) {
          this.limit = 10;
          this.page = 1;
          this.order = '-id';
          this.queryParams.limit = 10;
          this.queryParams.page = 1;
        }
        this.updateQueryParams(
          this.queryParams.limit,
          this.queryParams.page,
          this.queryParams.order,
          this.queryParams.fromEmail,
          this.queryParams.toEmail,
          this.queryParams.docId,
          this.queryParams.fromDate,
          this.queryParams.toDate,
          this.queryParams.receivedDate,
          this.queryParams.status,
          this.queryParams.channel,
          this.queryParams.isScanned,
          this.queryParams.fileName,
          this.queryParams.channelEmail
        );
      },
      error: (err: any) => {},
    });
  }

  private updateQueryParams(
    _limit: number,
    _page: number,
    _order: string,
    _fromEmail: string,
    _toEmail: string,
    _docId:string,
    _fromDate: string,
    _toDate: string,
    _receivedDate: string,
    _status: string,
    _channel: string,
    _isScanned: string,
    _fileName: string,
    _channelEmail: string
  ) {
    const queryParams: any = {
      limit: _limit,
      page: _page,
      order: _order,
      fromEmail: _fromEmail,
      toEmail: _toEmail,
      docId: _docId,
      fromDate: _fromDate,
      toDate: _toDate,
      receivedDate: _receivedDate,
      status: _status,
      channel: _channel,
      isScanned: _isScanned,
      fileName: _fileName,
      channelEmail: _channelEmail
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
        this.updateSize(params['limit']);
      }
      if (params['page'] && this.misc.isPositiveInteger(params['page'])) {
        this.queryParams.page = Number(params['page']);
        this.page = Number(params['page']);
      }
      if (params['order']) {
        this.queryParams.order = params['order'];
        this.order = params['order'];
      }
      if (params['fromEmail']) {
        this.queryParams.fromEmail = params['fromEmail'];
      }
      if (params['toEmail']) {
        this.queryParams.toEmail = params['toEmail'];
      }
      if (params['status']) {
        this.queryParams.status = params['status'];
      }
      if (params['docId']) {
        this.queryParams.docId = params['docId'];
      }
      if (params['channel']) {
        this.queryParams.channel = params['channel'];
      }
      if (params['fileName']) {
        this.queryParams.fileName = params['fileName'];
      }
      if (params['channelEmail']) {
        this.queryParams.channelEmail = params['channelEmail'];
      }
      if (params['receivedDate']) {
        params['receivedDate'][0]=new Date(params['receivedDate'][0])
        params['receivedDate'][1]=new Date(params['receivedDate'][1])
        this.queryParams.receivedDate = params['receivedDate'];
      }
      if (params['fromDate']) {
        this.queryParams.fromDate = params['fromDate'];
      }
      if (params['toDate']) {
        this.queryParams.toDate = params['toDate'];
      }
      if (params['isScanned'] && params['isScanned'] == "true") {
        this.queryParams.isScanned = true;
        this.queryParams.channel = "Scanner";
      } else {
        this.queryParams.isScanned = false;
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
      data: element,
    });
    // this.offCanvas.open(this.pdfView, { position: 'end' });
  }

  openDialog(id: string) {
    this.dialog
      .open(OcrXmlComponent, {
        disableClose: true,
        height: '100%',
        width: '35%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: id,
      })
      .afterClosed();
  }

  OCRQueue() {
    this.ocrQueueLoading = true;
    this.oCRService.getOCRQueue().subscribe({
      next: (res: any) => {
        this.ocrQueueLoading = false;
      },
      error: (err: any) => {
        this.ocrQueueLoading = false;
      },
    });
  }

  newQueue() {
    this.newOCRLoading = true;
    this.oCRService.getNewQueue().subscribe({
      next: (res: any) => {
        this.newOCRLoading = false;
      },
      error: (err: any) => {
        this.newOCRLoading = false;
      },
    });
  }

  checkToShow(status: any) {
    if (status !== 'OCR') {
      return false;
    }
    if (status !== 'JUNK') {
      return false;
    }
    return true;
  }

  onDateRangeSelected() {
    if (this.queryParams.receivedDate?.length) {
      this.queryParams.fromDate = moment(this.queryParams.receivedDate[0])
        .startOf('day')
        .toISOString();
      this.queryParams.toDate = moment(this.queryParams.receivedDate[1])
        .endOf('day')
        .toISOString();
    }
    console.log(this.queryParams)
  }

  removeDate() {
    this.queryParams.receivedDate = [];
    this.queryParams.fromDate = '';
    this.queryParams.toDate = '';
  }

  moveSelected(event:any, item:any) {
    if(!event.target.checked && this.selectedList){
      let removeIndex = this.selectedList.findIndex((data:any)=> data.id === item.id)
      this.selectedList.splice(removeIndex, 1)
    }
    this.selectedList=[];
    this.invoices.map((element, index) => {
      if (element.multiSelect) {
        this.selectedList.push(element);
      }
    });
    let status = this.selectedList && this.selectedList.length > 0 ? this.selectedList[0].status : '';
    if(status === 'OCR'){
     this.initButton = true;
     this.junkButton = true;
    }
    if(status === 'INIT'){
      this.junkButton = true
    }
    let checkStatus = this.selectedList.every((item:any)=>item.status === status)
    if(!checkStatus || this.selectedList.length === 0){
      this.initButton = false;
      this.junkButton = false;
    }
  }

  moveTo(newStatus:any){
    let status = this.selectedList[0].status
    let checkStatus = this.selectedList.every((item:any)=>item.status === status)
    if(!checkStatus){
      return;
    }
    let idsList:any = [];
    this.selectedList.map((item:any)=>{
      idsList.push(item.id)
    })
    this.commonService.moveMultipleStatus(idsList, {status: newStatus}).subscribe({
      next: (res: any) => {
        this.selectedList =[];
        this.initButton = false;
        this.junkButton = false;
        this.getInvoices();
      },
      error: (error) => {},
    });
  }

  openS1Dialog(id: string, xmlInvoice: boolean, xml: string) {
    this.dialog
    .open(S1ResponseComponent, {
      disableClose: true,
      height: '100%',
      width: '35%',
      animation: { to: 'left' },
      position: { top: '0px', bottom: '0px', right: '0px' },
      data: { 
        id: id, 
        xmlInvoice: xmlInvoice ,
        xml : xml
      }
    })
    .afterClosed();
  }

  getUniqueChannels(channels: any[]): any[] {
    let filteredChannels = channels.filter((ch:any) => ch.enabled);
    const seenTypes = new Set<string>();
    return filteredChannels.filter(channel => {
      if (seenTypes.has(channel.tagName)) {
        return false;
      } else {
        seenTypes.add(channel.tagName);
        return true;
      }
    });
  }

  showTable(item:any){
    const data = this.metaDataConfigObject.items.filter((elem:any) => elem.dataField === item);
    return data[0].tableField;
  }

  getSystemConfig(){
    this.systemConfigService.getSystemConfigById('SYSTEM_CONFIG').subscribe({
      next:(res:any)=>{
        if(res){
          this.systemConfig = res;
        }
      },
      error: (error: any) => {},
    })
  }

}
