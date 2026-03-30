import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageUserService, DocIdRangeService, CommonService, ChannelService, OcrConfigService, LogicalSystemService, OcrMapperConfigService, EmailTemplatesService, MetadataConfigService, OcrProjectService } from 'src/app/services';
import { BasicModalComponent } from 'src/app/shared/modals/basic-modal/basic-modal.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-copy-channel',
  templateUrl: './copy-channel.component.html',
  styleUrls: ['./copy-channel.component.scss']
})
export class CopyChannelComponent implements OnInit {

   @ViewChild('addDataModal', { static: false })
  addDataModal: BasicModalComponent;
  @ViewChild('addDataModal1', { static: false })
  addDataModal1: BasicModalComponent;
  @ViewChild('addData', { static: false })
  addData: TemplateRef<any>;
  @ViewChild('addData1', { static: false })
  addData1: TemplateRef<any>;
  channelId: number;
  editMode: any = 'new';
  selectedTab: number = 1;
  heading: any = 'Basic Email Type';
  fieldsData: any;
  fieldsData1: any;
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
    expiryDate: ''
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
    regex: '',
  };
  attributes1: any = {
    id: 1,
    field: '',
    type: '',
    value: '',
    regex: '',
  };
  showAppId:boolean = false;
  showAppSecret: boolean = false;
  minDate = new Date();

  showThicklineSection: boolean = false;
  showFtpField: boolean = false;
  showRestAPIConfig: boolean = false;
  concatenatedString: string = '';
  blockEmailRow: {
    blockedemail: '';
  }[] = [];
  outputType: any = ['Sone', 'SAP', 'File System'];
  tagNames: any = ['Scanner','Local FS','Network FS','SFTP','Email','REST']
  fieldsDataIndex: any = '';
  docIdLogicTypeList: any[] = ['Common Logic', 'Plant and Fiscal Year Based Logic']
  channelTypes: any = ['Basic','Email Classification']
  timeZone: any = ['America/Los_Angeles','Asia/Calcutta','America/New_York']
  restAPIService: any = ['INDECAB', 'HOTELBILL', 'Other']
  showIndecabSection: boolean = false;
  showHotelBillSection: boolean = false;
  
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
    this.getDocIdRange();
    this.getLogicalSystem();
    this.getOcrProject();

    this.activateRoute.params.subscribe((params: any) => {
      this.channelId = params.id;
      if (this.channelId) {
        this.getChannelByid();
      }
    });
  }

  private getChannelByid() {
    this.channalService.getByIdChannel(this.channelId).subscribe({
      next: (res: any) => {
        this.channelsObject = res;
        this.channelsObject.usernameId = '';

        if(this.channelsObject.docIdFieldConfig === null){
          this.channelsObject.docIdFieldConfig = []
        }
        if(this.channelsObject.docRangeType === null){
          this.channelsObject.docRangeType = "NONE";
        }
        if(this.channelsObject.fieldsConfig === null){
          this.channelsObject.fieldsConfig = []
        }
        if (this.channelsObject.processorType === 'ocr') {
          this.showOcrSection = true;
        } else if (this.channelsObject.processorType === 'thickClient') {
          this.showOcrSection = false;
          this.showThicklineSection = true;
        }

      if (this.channelsObject.type === 'local-file') {
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
  }

  onTabchange(val: number) {
    this.selectedTab = val;
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
    this.isWait = true;
    this.channelsObject.channelNotificationConfig =
      this.channelNotificationConfig;
    this.channelsObject.blockedEmails = [];
    this.channelsObject.channelRestAPIConfig = this.channelRestAPIConfig;
    this.blockEmailRow.forEach((res: any) => {
      this.channelsObject.blockedEmails.push(res.blockedemail);
    });
    if(this.channelsObject?.fieldsConfig?.length){
      this.channelsObject.fieldsConfig?.forEach((element: any) => {
        if (element.regex) {
          element.value = '';
        }
      });
    }
    if(this.channelsObject.docRangeType === 'NONE'){
      this.channelsObject.docRangeType = null
    }
    if (this.showFtpField) {
        this.channelsObject.channelFtpConfig = this.channelFtpConfig;
    }
    this.saveObject();
    return;
  }

  private saveObject() {
    this.isWait = true;
    if(this.channelsObject?.fieldsConfig?.length){
      this.channelsObject.fieldsConfig?.forEach((element: any) => {
        if (element.regex) {
          element.value = element.regex;
        }
        delete element.id;
      });
    }
    this.channalService.postChannel({ ...this.channelsObject }).subscribe({
      next: (res: any) => {
        this.isWait = false;
        this.onBack();
      },
      error: (err: any) => {
        if(this.channelsObject?.fieldsConfig?.length){
           this.channelsObject.fieldsConfig?.forEach((element: any, index: any) => {
            if (element.regex) {
              element.value = element.regex;
            }
            element['id'] = index + 1;
          });
       }
       
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

    this.addDataModal.hide();
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


}
