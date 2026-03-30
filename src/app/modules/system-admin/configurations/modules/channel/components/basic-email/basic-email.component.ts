import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CommonService,
  MessageUserService,
  OcrConfigService,
  OcrProjectService,
} from 'src/app/services';
import { ChannelService } from 'src/app/services/channel.service';
import { OcrMapperConfigService } from 'src/app/services/ocr-mapper-config.service';
import { BasicModalComponent } from 'src/app/shared/modals/basic-modal/basic-modal.component';
import { add } from 'ngx-bootstrap/chronos';
import { DocIdRangeService } from 'src/app/services/doc-id-range.service';
import { LogicalSystemService } from 'src/app/services/logical-system.service';
import { EmailTemplatesService } from 'src/app/services/email-templates.service';
import moment from 'moment';
import { MetadataConfigService } from 'src/app/services/metadata-config.service';

@Component({
  selector: 'app-basic-email',
  templateUrl: './basic-email.component.html',
  styleUrls: ['./basic-email.component.scss'],
})
export class BasicEmailComponent {
  @ViewChild('addDataModal', { static: false })
  addDataModal: BasicModalComponent;
  @ViewChild('addDataModal1', { static: false })
  addDataModal1: BasicModalComponent;
  @ViewChild('addDataModal2', { static: false })
  addDataModal2: BasicModalComponent;
  @ViewChild('addData', { static: false })
  addData: TemplateRef<any>;
  @ViewChild('addData1', { static: false })
  addData1: TemplateRef<any>;
  @ViewChild('addData2', { static: false })
  addData2: TemplateRef<any>;
  channelId: number;
  editMode: any = 'new';
  selectedTab: number = 1;
  heading: any = 'Basic Email Type';
  fieldsData: any;
  fieldsData1: any;
  fieldsDataAddress: any;
  isWait: boolean = false;
  showOcrSection: boolean = false;
  logicalSystems: any = [];
  channelsObject: any = {};
  isLoading: boolean = false;
  channelFtpConfig: any = {
    username: '',
    password: '',
    invoiceInputFolder: '',
    invoiceSupportingDocFolder: '',
    host: '',
    port: '',
    invoiceMetadataFolder: '',
    invoiceOutputFolder: '',
    invoiceSupportingDocOutputFolder: '',
    invoiceMetadataOutputFolder: '',
    dataFolder: ''
  };
  channelRestAPIConfig: any = {
    appId: '',
    appSecret: '',
    encodingMethod: '',
    expiryDate: '',
    username:'',
    password:'',
    url:'',
    cname: '',
    uniqueId: ''
  };
  channelNotificationConfig: any = {
    enabled: false,
    issuccess: false,
    successTemplate: '',
    isfileSizeExceeded: false,
    fileSizeExceededTemplate: '',
    noAttachment: false,
    noAttachmentTemplate: '',
    nonSupportedAttachment: false,
    nonSupportedAttachmentTemplate: '',
    wrongSubject: false,
    wrongSubjectTemplate: '',
  };
  docRange: any = [];
  processTypes: any[] = [];
  modeTypes: any[] = [];
  supportedFiletype: any[] = [];
  ocrFieldMapping: any[] = [];
  NotificationConfigDropwDownList: any[] = [];
  successNotificationConfigList: any[] = [];
  noAttachmentNotificationConfigList: any[] = [];
  filesizeExceededNotificationConfigList: any[] = [];
  nonSupportedFileNotificationConfigList: any[] = [];
  wrongSubjectFormatNotificationConfigList: any[] = [];
  ocrProfile: any[] = [];
  ocrProject: any[] = [];
  metaDataMapping: any[] = [];
  getData: any;
  attributes: any = {
    id: 1,
    field: '',
    type: '',
    value: '',
    // scope: '',
    regex: '',
  };
  attributes1: any = {
    id: 1,
    field: '',
    type: '',
    value: '',
    // scope: '',
    regex: '',
  };
  showAppId:boolean = false;
  showAppSecret: boolean = false;
  minDate = new Date();

  showThicklineSection: boolean = false;
  showFtpField: boolean = false;
  showRestAPIConfig: boolean = false;
  // blockEmailRow: any[] = [];
  concatenatedString: string = '';
  blockEmailRow: {
    blockedemail: '';
  }[] = [];
  outputType: any = ['Sone', 'SAP', 'File System'];
  tagNames: any = ['Scanner','Local FS','Network FS','SFTP','Email','REST']
  fieldsDataIndex: any = '';
  channelTypes: any = ['Basic','Email Classification']
  timeZone: any = ['America/Los_Angeles','Asia/Calcutta','America/New_York']
  restAPIService: any = ['INDECAB', 'HOTELBILL', 'Other']
  showIndecabSection: boolean = false;
  showHotelBillSection: boolean = false;
  fieldsDataIndex1: any = '';
  docIdLogicTypeList: any[] = ['Common Logic', 'Plant and Fiscal Year Based Logic']
  showDocRangeType: boolean = false;
  selectedOCRProject: string;
  fileNameDerived: any[] = [];
  selectOpType: string;

  constructor(
    private messageSer: MessageUserService,
    private activateRoute: ActivatedRoute,
    private docIdRangeService: DocIdRangeService,
    private commonService: CommonService,
    private channalService: ChannelService,
    private location: Location,
    private ocrConfigService: OcrConfigService,
    private logicalSystemService: LogicalSystemService,
    private ocrMappingeService: OcrMapperConfigService,
    private route: Router,
    private emailTemplates: EmailTemplatesService,
    private metaDataConfigService : MetadataConfigService,
    private ocrProjectService: OcrProjectService
  ) {
    this.messageSer.appSidebar = false;
  }
  ngOnInit(): void {
    this.getModeType();
    this.getProcessoerType();
    this.getSupportedType();
    this.getOcrProfile();
    this.getMetaProfile();
    // this.getOcrFieldMapping();
    this.getDocIdRange();
    this.getLogicalSystem();
    this.getEmailTempletsType();
    this.getOcrProject();
    if (this.route.url.includes('ftp-file-channel')) {
      this.showFtpField = true;
      this.heading = 'FTP Channel';
      this.channelsObject['fieldsConfig'] = [];
      this.channelsObject.type = 'ftp';
      this.channelsObject.channels = "FTP";
    } else if (this.route.url.includes('rest-based-channel')) {
      this.heading = 'REST API Based Channel';
      this.showRestAPIConfig = true;
      this.showFtpField = false;
      this.channelsObject['fieldsConfig'] = [];
      this.channelsObject.type = 'rest-based';
      this.channelsObject.channels = "REST";
    }
    else if (this.route.url.includes('local-file-channel')) {
      this.heading = 'Local File Channel';
      this.showRestAPIConfig = false;
      this.showFtpField = true;
      this.channelsObject['fieldsConfig'] = [];
      this.channelsObject.type = 'local-file';
      this.channelsObject.channels = "LOCAL";
    }
    else if (this.route.url.includes('network-file-channel')) {
      this.heading = 'Network File Channel';
      this.showRestAPIConfig = false;
      this.showFtpField = true;
      this.channelsObject['fieldsConfig'] = [];
      this.channelsObject.type = 'network-file';
      this.channelsObject.channels = "NETWORK";
    }
    else if (this.route.url.includes('basic-email-channel')) {
      this.heading = 'Basic Email Type';
      this.showRestAPIConfig = false;
      this.showFtpField = false;
      this.channelsObject['fieldsConfig'] = [];
      this.channelsObject.type = 'email';
      this.channelsObject.channels = "EMAIL";
      this.channelsObject.authType = 'basic';
      this.channelsObject.channelImapConfig = {
        host:'',
        mailStoredProtocol:'',
        password:'',
        port:'',
        securedConnection:'',
        smtpHost:'',
        smtpPort:'',
        ssl:'',
        tlsV:'',
        username:''

      }
    }
    this.activateRoute.params.subscribe((params: any) => {
      this.channelId = params.id;
      if (this.channelId) {
        this.editMode = 'edit';
        this.getChannelByid();
      }
    });
  }

  getEmailTempletsType() {
    this.emailTemplates.getAllEmailTemplates().subscribe((res: any) => {
      this.NotificationConfigDropwDownList = res;
      this.NotificationConfigDropwDownList.filter((res: any) => {
        if (res.type === 'SUCCESS') {
          this.successNotificationConfigList.push(res);
        } else if (res.type === 'NO_ATTACHMENT') {
          this.noAttachmentNotificationConfigList.push(res);
        } else if (res.type === 'FILE_SIZE_EXCEEDED') {
          this.filesizeExceededNotificationConfigList.push(res);
        } else if (res.type === 'NON_SUPPORTED_FILE') {
          this.nonSupportedFileNotificationConfigList.push(res);
        } else if (res.type === 'WRONG_SUBJECT_FORMAT') {
          this.wrongSubjectFormatNotificationConfigList.push(res);
        }
      });
    });
  }

  addBlockedEmail() {
    this.blockEmailRow.push({
      blockedemail: '',
    });
  }

  onDelete(i: any) {
    this.blockEmailRow.splice(i, 1);
  }

  private getChannelByid() {
    this.channalService.getByIdChannel(this.channelId).subscribe({
      next: (res: any) => {
        this.channelsObject = res;
        console.log(this.channelsObject)
        this.channelsObject.blockedEmails.forEach((email: any) => {
          this.blockEmailRow.push({ blockedemail: email });
        });
        if(this.channelsObject.toAddressConfig === null){
          this.channelsObject.toAddressConfig = [];
        }
        if (this.channelsObject.channelRestAPIConfig) {
          this.channelsObject.channelRestAPIConfig.expiryDate = moment(this.channelsObject.channelRestAPIConfig.expiryDate).toDate();
        } else {
          this.channelsObject.channelRestAPIConfig = {
            appId: '',
            appSecret: '',
            encodingMethod: '',
            expiryDate: '',
            username: '',
            password: '',
            url: '',
            cname: '',
            uniqueId: ''
          };
        }
        // this.channelsObject.channelRestAPIConfig.expiryDate = moment(this.channelsObject.channelRestAPIConfig.expiryDate).toDate();
        if(this.channelsObject.docIdFieldConfig === null){
          this.channelsObject.docIdFieldConfig = []
        }
        if(this.channelsObject.docRangeType === null){
          this.channelsObject.docRangeType = "NONE";
        }
        if (this.channelsObject.channelNotificationConfig === null) {
          this.channelNotificationConfig = {
            enabled: false,
            issuccess: false,
            successTemplate: '',
            isfileSizeExceeded: false,
            fileSizeExceededTemplate: '',
            noAttachment: false,
            noAttachmentTemplate: '',
            nonSupportedAttachment: false,
            nonSupportedAttachmentTemplate: '',
            wrongSubject: false,
            wrongSubjectTemplate: '',
          };
        }
        else if(this.channelsObject.channelImapConfig === null){
          this.channelsObject.channelImapConfig = {
            host:'',
            mailStoredProtocol:'',
            password:'',
            port:'',
            securedConnection:'',
            smtpHost:'',
            smtpPort:'',
            ssl:'',
            tlsV:'',
            username:''

          }
        }
        else {
          this.channelNotificationConfig =
            this.channelsObject.channelNotificationConfig;
        }
        if (this.channelsObject.processorType === 'ocr') {
          this.showOcrSection = true;
        } else if (this.channelsObject.processorType === 'thickClient') {
          this.showOcrSection = false;
          this.showThicklineSection = true;
        }

        if (this.channelsObject.docIdLogicType === 'Common Logic') {
          this.showDocRangeType = true;
        } else {
          this.showDocRangeType = false;
        }

        if (this.channelsObject.type === 'ftp') {
          if (this.channelsObject.channelFtpConfig === null) {
            this.channelFtpConfig = {
              username: '',
              password: '',
              invoiceInputFolder: '',
              invoiceSupportingDocFolder: '',
              host: '',
              port: '',
              invoiceMetadataFolder: '',
              invoiceOutputFolder: '',
              invoiceSupportingDocOutputFolder: '',
              invoiceMetadataOutputFolder: '',
              dataFolder: ''
            };
          } else {
            this.channelFtpConfig = this.channelsObject.channelFtpConfig;
          }
          this.showFtpField = true;
        } else if (this.channelsObject.type === 'rest-based') {
          console.log(this.channelsObject.type)
          if (this.channelsObject.channelRestAPIConfig === null) {
            this.channelRestAPIConfig = {
              appId: '',
              appSecret: '',
              encodingMethod: '',
              expiryDate: '',
              username:'',
              password:'',
              url:'',
              cname: '',
              uniqueId: ''
            };
          } else {
            this.channelRestAPIConfig = this.channelsObject.channelRestAPIConfig;
            if(this.channelsObject.restAPIService == 'INDECAB'){
              this.showIndecabSection = true;
              this.showHotelBillSection = false;
            } else if(this.channelsObject.restAPIService == 'HOTELBILL'){
              this.showHotelBillSection = true;
              this.showIndecabSection = false;
            } else{
              this.showHotelBillSection = false;
              this.showIndecabSection = false;
            }
              
          }
          this.showRestAPIConfig = true;
          console.log(this.showRestAPIConfig)
        }
        else if (this.channelsObject.type === 'local-file') {
          if (this.channelsObject.channelFtpConfig === null) {
            this.channelFtpConfig = {
              username: '',
              password: '',
              invoiceInputFolder: '',
              invoiceSupportingDocFolder: '',
              host: '',
              port: '',
              invoiceMetadataFolder: '',
              invoiceOutputFolder: '',
              invoiceSupportingDocOutputFolder: '',
              invoiceMetadataOutputFolder: '',
              dataFolder: ''
            };
          } else {
            this.channelFtpConfig = this.channelsObject.channelFtpConfig;
          }
          this.showFtpField = true;
        }
        else if (this.channelsObject.type === 'network-file') {
          if (this.channelsObject.channelFtpConfig === null) {
            this.channelFtpConfig = {
              username: '',
              password: '',
              invoiceInputFolder: '',
              invoiceSupportingDocFolder: '',
              host: '',
              port: '',
              invoiceMetadataFolder: '',
              invoiceOutputFolder: '',
              invoiceSupportingDocOutputFolder: '',
              invoiceMetadataOutputFolder: '',
              dataFolder: ''
            };
          } else {
            this.channelFtpConfig = this.channelsObject.channelFtpConfig;
          }
          this.showFtpField = true;
        }
        this.selectedOCRProject = this.channelsObject.ocrProject;
        this.selectOpType = this.channelsObject.outputType;
        console.log(this.selectOpType)
        this.selectedOutputType(this.selectOpType);
      },

      error: (error) => {},
    });
  }

  onBack() {
    this.location.back();
  }

  selectedType(val: any) {
    if (val.value === 'ocr') {
      this.showOcrSection = true;
      this.showThicklineSection = false;
      this.channelsObject.originalFilePath = '';
      this.channelsObject.ocrinFilePath = '';
      this.channelsObject.metadataFilePath = '';
      this.channelsObject.docRangeType = '';
      this.channelsObject.pageSplitCount = ''
    } else if (val.value === 'thickClient') {
      this.showOcrSection = false;
      this.showThicklineSection = true;
      this.channelsObject.ocrProfileId = '';
      this.channelsObject.ocrFieldMapping = '';
      this.channelsObject.docRangeType = '';
      this.channelsObject.pageSplitCount = ''
    } else {
      this.showOcrSection = false;
      this.showThicklineSection = false;
      this.channelsObject.ocrProfileId = '';
      this.channelsObject.ocrFieldMapping = '';
      this.channelsObject.originalFilePath = '';
      this.channelsObject.ocrinFilePath = '';
      this.channelsObject.metadataFilePath = '';
      this.channelsObject.docRangeType = '';
      this.channelsObject.pageSplitCount = ''
    }
    this.channelsObject.fieldsConfig = [];
    this.channelsObject.toAddressConfig = [];
  }

  onTabchange(val: number) {
    this.selectedTab = val;
  }

  private getOcrFieldMapping() {
    this.ocrMappingeService.getOcrFieldMappingName().subscribe({
      next: (res: any) => {
        this.ocrFieldMapping = res;
      },
      error: (error) => {},
    });
  }
  private getOcrProfile() {
    this.ocrProjectService.getOcrProfileName().subscribe({
      next: (res: any) => {
        this.ocrProject = res;
      },
      error: (error) => {},
    });
  }

  private getMetaProfile() {
    this.metaDataConfigService.getMetaDataMappingName().subscribe({
      next: (res: any) => {
        this.metaDataMapping = res;
      },
      error: (error) => {},
    });
  }

  private getOcrProject() {
    this.ocrProjectService.getOcrProfile().subscribe({
      next: (res: any) => {
        this.ocrProject = res;
      },
      error: (error) => {},
    });
  }


  private getModeType() {
    this.commonService.getModeTypes().subscribe({
      next: (res: any) => {
        if(res.length){
          res.forEach((elem: any) => {
            let obj:any = {
              name:'',
              value:'',
            }
            if (elem === 'auto') {
              obj = {
                name:'Auto',
                value:'auto',
              }
            } else if (elem === 'manual') {
              obj = {
                name:'Manual',
                value:'manual',
              }
            }
            this.modeTypes.push(obj)
          });
        }
      },
      error: (error) => {},
    });
  }
  private getProcessoerType() {
    this.commonService.getprocesserType().subscribe({
      next: (res: any) => {
        if(res.length){
          res.forEach((elem: any) => {
            let obj:any = {
              name:'',
              value:'',
            }
            if (elem === 'erp') {
              obj = {
                name:'ERP',
                value:'erp',
              }
            } else if (elem === 'manual') {
              obj = {
                name:'Manual',
                value:'manual',
              }
            } else if (elem === 'ocr') {
              obj = {
                name:'OCR',
                value:'ocr',
              }
            } else if (elem === 'thickClient') {
              obj = {
                name:'Thick-Client',
                value:'thickClient',
              }
            }
            this.processTypes.push(obj)
          });
        }
      },
      error: (error) => {},
    });
  }
  private getSupportedType() {
    this.commonService.getfiletypes().subscribe({
      next: (res: any) => {
        this.supportedFiletype = res;
      },
      error: (error) => {},
    });
  }

  getDocIdRange() {
    this.docIdRangeService.getAllDocIdRange().subscribe({
      next: (res: any) => {
        this.docRange = res;
        if(this.docRange?.length){
          this.docRange.unshift({id:'NONE'})
        }
      },
      error: (err: any) => {},
    });
  }

  getLogicalSystem() {
    this.logicalSystemService.getAllLogicalSystems().subscribe({
      next: (res: any) => {
        this.logicalSystems = res;
      },
      error: (err: any) => {},
    });
  }

  submit() {
    this.channelsObject.channelNotificationConfig =
      this.channelNotificationConfig;
    this.channelsObject.blockedEmails = [];
    this.channelsObject.channelRestAPIConfig = this.channelRestAPIConfig;
    this.blockEmailRow.forEach((res: any) => {
      this.channelsObject.blockedEmails.push(res.blockedemail);
    });
    this.channelsObject.fieldsConfig.forEach((element: any) => {
      if (element.regex) {
        element.value = '';
      }
    });
    if(this.channelsObject.docRangeType === 'NONE'){
      this.channelsObject.docRangeType = null
    }
    if (this.editMode === 'edit') {
      if (this.showFtpField) {
        this.channelsObject.channelFtpConfig = this.channelFtpConfig;
        this.updateObject();
      } else {
        this.updateObject();
      }
    } else if (this.editMode === 'new') {
      if (this.showFtpField) {
        this.channelsObject.channelFtpConfig = this.channelFtpConfig;
      }
      this.saveObject();
    }
    return;
  }

  private saveObject() {
    this.isWait = true;
    this.channelsObject.fieldsConfig.forEach((element: any) => {
      if (element.regex) {
        element.value = element.regex;
      }
      delete element.id;
    });
    this.channalService.postChannel({ ...this.channelsObject }).subscribe({
      next: (res: any) => {
        this.isWait = false;
        this.onBack();
      },
      error: (err: any) => {
        this.channelsObject.fieldsConfig.forEach((element: any, index: any) => {
          if (element.regex) {
            element.value = element.regex;
          }
          element['id'] = index + 1;
        });
        this.isWait = false;
      },
    });
  }

  private updateObject() {
    this.isWait = true;
    this.channalService
      .putChannel({ ...this.channelsObject }, this.channelId)
      .subscribe({
        next: (res: any) => {
          this.isWait = false;
          this.onBack();
        },
        error: (err: any) => {
          this.channelsObject.fieldsConfig.forEach((element: any) => {
            if (element.regex) {
              element.value = element.regex;
            }
          });
          this.isWait = false;
        },
      });
  }

  spaceNotAllowed(event: any) {
    if (event.target.selectionStart === 0 && event.code === 'Space') {
      event.prevenDefault();
    }
  }

  addAttributes() {
    let Obj = {
      ...this.attributes,
    };
    this.channelsObject.fieldsConfig.push({ ...Obj });
    this.channelsObject.fieldsConfig = [...this.channelsObject.fieldsConfig];
  }

  addAttributesDocId() {
    let Obj = {
      ...this.attributes1,
    };
    this.channelsObject.docIdFieldConfig.push({ ...Obj });
    this.channelsObject.docIdFieldConfig = [...this.channelsObject.docIdFieldConfig];
  }
  openConfirmationModal(val: any,index:any) {
    if(!val){
      this.fieldsData = {
        id: this.channelsObject.fieldsConfig.length+1,
        field: '',
        value: '',
        type: '',
        regex: '',
      }
      this.fieldsDataIndex = null;
    }else if(val){
      this.fieldsDataIndex = index;
      this.fieldsData = val
    }
    this.addDataModal.templateRef = this.addData;
    this.addDataModal.show();
  }

  openConfirmationModalDocId(val: any) {
    console.log(this.channelsObject)
    if(!val){
      this.fieldsData1 = {
        id: this.channelsObject.docIdFieldConfig.length+1,
        field: '',
        value: '',
        type: '',
        regex: '',
      }
    }else if(val){
      this.fieldsData1 = val
    }
    console.log(val)
    this.addDataModal1.templateRef = this.addData1;
    this.addDataModal1.show();
  }

  onSuccess(val: any) {
    console.log(val)
    if(this.fieldsDataIndex == null){
      this.attributes = Object.assign({}, val);
      this.addAttributes();
    }
    else{
      this.channelsObject.fieldsConfig[this.fieldsDataIndex] = val;
      this.fieldsDataIndex = null;
    }
    // let getIndex=this.channelsObject.fieldsConfig.findIndex((item:any)=>item.id === this.attributes.id)
    // if(getIndex > -1){
    //   Object.assign(this.channelsObject.fieldsConfig[getIndex], this.attributes)
    // }else{
    //   this.addAttributes();
    // }

    this.addDataModal.hide();
    // this.editMode = false;
    // this.getAlldataObject();
    // this.createWorkFlowModal.hide();
    console.log(this.channelsObject.fieldsConfig)
  }


  onSuccessDocId(val: any) {
    this.attributes1 = Object.assign({}, val);
    console.log(val)
    let getIndex=this.channelsObject.docIdFieldConfig.findIndex((item:any)=>item.id === this.attributes1.id)
    if(getIndex > -1){
      Object.assign(this.channelsObject.docIdFieldConfig[getIndex], this.attributes1)
    }else{
      this.addAttributesDocId();
    }

    this.addDataModal1.hide();
    // this.editMode = false;
    // this.getAlldataObject();
    // this.createWorkFlowModal.hide();
    console.log(this.channelsObject.docIdFieldConfig)
  }

  removeItem(item: any) {
    this.channelsObject.fieldsConfig.splice(
      this.channelsObject.fieldsConfig.indexOf(item),
      1
    );
  }

  removeItem1(item: any) {
    this.channelsObject.docIdFieldConfig.splice(
      this.channelsObject.docIdFieldConfig.indexOf(item),
      1
    );
  }

  checkValidity(item:any){
    let pattern = new RegExp('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
    return pattern.test(item)
  }
  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }

  onDateRangeSelected() {}

  onChangeCheckbox1(event: any) {
    this.channelsObject.firstAttachment = false;

    if (this.channelsObject.singleAttachment == true) {
      this.channelsObject.firstAttachment = false;
    }

  }

  onChangeCheckbox2(event: any) {
    this.channelsObject.singleAttachment = false;

    if(this.channelsObject.firstAttachment == true){
      this.channelsObject.singleAttachment = false;
    }


  }

  onChangeMetaCheckbox1(event: any) {
    this.channelsObject.noMetadata = false;

    if (this.channelsObject.metadata == true) {
      this.channelsObject.noMetadata = false;
    }

  }

  onChangeMetaCheckbox2(event: any) {
    this.channelsObject.metadata = false;

    if(this.channelsObject.noMetadata == true){
      this.channelsObject.metadata = false;
    }
  }

  selectedApiService(val:any){
     if (val.value === 'INDECAB') {
      this.showIndecabSection = true;
      this.showHotelBillSection = false;
    } else if (val.value === 'HOTELBILL') {
      this.showHotelBillSection = true;
      this.showIndecabSection = false;
    } else{
      this.showHotelBillSection = false;
      this.showIndecabSection = false;
    }
  }

  addEmail(){
    this.channelsObject.toAddressConfig.push({
       toEmail: '',
      fieldConfig: []
    })
  }

  toAddressEmailConfigIndex: any = ''
  openConfirmationToAddressModal(val: any,index:any, email: any, emailIdx:any) {
    if(!val){
      this.fieldsDataAddress = {
        id: email.fieldConfig?.length+1,
        field: '',
        value: '',
        type: '',
        regex: '',
      }
      this.fieldsDataIndex1 = null;
      this.toAddressEmailConfigIndex = emailIdx;
    }else if(val){
      this.fieldsDataIndex1 = index;
      this.toAddressEmailConfigIndex = emailIdx;
      this.fieldsDataAddress = val
    }
    this.addDataModal2.templateRef = this.addData2;
    this.addDataModal2.show();
  }

  removeToAddressItem(item: any) {
    this.channelsObject.toAddressConfig.splice(item,1);
  }

  removeAddressConfig(val:any, emailObj:any){
    emailObj.fieldConfig.splice(val,1);
  }

  onSuccessToAdress(val: any) {
    console.log(val)
    if(this.fieldsDataIndex1 == null){
      this.attributes = Object.assign({}, val);
      this.addToAddressAttributes();
    }
    else{
      this.channelsObject.toAddressConfig[this.toAddressEmailConfigIndex].fieldConfig[this.fieldsDataIndex1]= val;
      this.fieldsDataIndex1 = null;
      this.toAddressEmailConfigIndex = null;
    }
    this.addDataModal2.hide();
    console.log(this.channelsObject.fieldsConfig)
  }

  addToAddressAttributes() {
    let Obj = {
      ...this.attributes,
    };
    this.channelsObject.toAddressConfig[this.toAddressEmailConfigIndex].fieldConfig.push({ ...Obj });
    this.channelsObject.toAddressConfig = [...this.channelsObject.toAddressConfig];
  }

 onLogicTypeChange(event: any) {
    const selected = event.value;
    console.log(this.showDocRangeType)
    if (selected === 'Common Logic') {
      this.showDocRangeType = true;
    }
    else{
      this.showDocRangeType = false;
    }
  }
  
  selectedProject(val:any){
    console.log(val)
    this.selectedOCRProject = val.value;
  }

  selectedOutputType(val: any) {
    console.log(val)
    if (val === 'File System') {
      console.log(this.selectedOCRProject);
      this.ocrProjectService.getByIdOcrProfile(this.selectedOCRProject).subscribe({
        next: (res: any) => {
          this.fileNameDerived = res.headerMappings;
          console.log(this.fileNameDerived);
        },
        error: (error:any) => {

        }
      });
    } 
  }

}
