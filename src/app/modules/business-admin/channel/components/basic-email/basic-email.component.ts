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

@Component({
  selector: 'app-basic-email',
  templateUrl: './basic-email.component.html',
  styleUrls: ['./basic-email.component.scss'],
})
export class BasicEmailComponent {
  @ViewChild('addDataModal', { static: false })
  addDataModal: BasicModalComponent;
  @ViewChild('addData', { static: false })
  addData: TemplateRef<any>;
  channelId: number;
  editMode: any = 'new';
  selectedTab: number = 1;
  heading: any = 'Basic Email Type';
  fieldsData: any;
  isWait: boolean = false;
  showOcrSection: boolean = false;
  logicalSystems: any = [];
  channelsObject: any = {};
  isLoading: boolean = false;
  channelFtpConfig: any = {
    username: '',
    password: '',
    inputFolder: '',
    outputFolder: '',
    host: '',
    port: '',
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
  ocrProfile: any[] = [];
  getData: any;
  attributes: any = {
    id: 1,
    field: '',
    type: '',
    value: '',
    // scope: '',
    regex: '',
  };
  // metadataFilePath;
  // ocrinFilePath;
  // originalFilePath;
  showThicklineSection: boolean = false;
  showFtpField: boolean = false;
  // blockEmailRow: any[] = [];
  concatenatedString: string = '';
  blockEmailRow: {
    blockedemail: '';
  }[] = [];
  constructor(
    private messageSer: MessageUserService,
    private activateRoute: ActivatedRoute,
    private docIdRangeService: DocIdRangeService,
    private commonService: CommonService,
    private channalService: ChannelService,
    private location: Location,
    private ocrProjectService: OcrProjectService,
    private logicalSystemService: LogicalSystemService,
    private ocrMappingeService: OcrMapperConfigService,
    private route: Router,
    private emailTemplates: EmailTemplatesService
  ) {
    this.messageSer.appSidebar = false;
  }
  ngOnInit(): void {
    this.getModeType();
    this.getProcessoerType();
    this.getSupportedType();
    this.getOcrProfile();
    // this.getOcrFieldMapping();
    this.getDocIdRange();
    this.getLogicalSystem();
    this.getEmailTempletsType();
    if (this.route.url.includes('ftp-channel')) {
      this.showFtpField = true;
      this.heading = 'FTP Channel';
      this.channelsObject['fieldsConfig'] = [];
    } else if (this.route.url.includes('thick-client-channel')) {
      this.heading = 'Thick Client Channel';
      this.showFtpField = false;
      this.channelsObject['fieldsConfig'] = [];
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
        this.channelsObject.blockedEmails.forEach((email: any) => {
          this.blockEmailRow.push({ blockedemail: email });
        });
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
          };
        } else {
          this.channelNotificationConfig =
            this.channelsObject.channelNotificationConfig;
        }
        if (this.channelsObject.processorType === 'ocr') {
          this.showOcrSection = true;
        } else if (this.channelsObject.processorType === 'thickClient') {
          this.showOcrSection = false;
          this.showThicklineSection = true;
        } else if (this.channelsObject.type === 'ftp') {
          if (this.channelsObject.channelFtpConfig === null) {
            this.channelFtpConfig = {
              username: '',
              password: '',
              inputFolder: '',
              outputFolder: '',
              host: '',
              port: '',
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
    } else if (val.value === 'thickClient') {
      this.showOcrSection = false;
      this.showThicklineSection = true;
      this.channelsObject.ocrProfileId = '';
      this.channelsObject.ocrFieldMapping = '';
      this.channelsObject.docRangeType = '';
    } else {
      this.showOcrSection = false;
      this.showThicklineSection = false;
      this.channelsObject.ocrProfileId = '';
      this.channelsObject.ocrFieldMapping = '';
      this.channelsObject.originalFilePath = '';
      this.channelsObject.ocrinFilePath = '';
      this.channelsObject.metadataFilePath = '';
      this.channelsObject.docRangeType = '';
    }
    this.channelsObject.fieldsConfig = [];
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
        this.ocrProfile = res;
      },
      error: (error) => {},
    });
  }
  private getModeType() {
    this.commonService.getModeTypes().subscribe({
      next: (res: any) => {
        this.modeTypes = res;
      },
      error: (error) => {},
    });
  }
  private getProcessoerType() {
    this.commonService.getprocesserType().subscribe({
      next: (res: any) => {
        this.processTypes = res;
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
    this.blockEmailRow.forEach((res: any) => {
      this.channelsObject.blockedEmails.push(res.blockedemail);
    });
    this.channelsObject.fieldsConfig.forEach((element: any) => {
      if (element.regex) {
        element.value = '';
      }
    });
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
      id:
        this.editMode === 'new'
          ? this.channelsObject.fieldsConfig.length + 1
          : this.attributes.id,
    };
    this.channelsObject.fieldsConfig.push({ ...Obj });
    this.channelsObject.fieldsConfig = [...this.channelsObject.fieldsConfig];
  }

  openConfirmationModal(val: any) {
    this.fieldsData = val;
    this.addDataModal.templateRef = this.addData;
    this.addDataModal.show();
  }

  onSuccess(val: any) {
    this.attributes = Object.assign({}, val);
    this.attributes.value =
      this.attributes.value === ''
        ? this.attributes.regex
        : this.attributes.value;
    this.attributes['id'] = 0;
    this.addAttributes();
    this.addDataModal.hide();
    // this.editMode = false;
    // this.getAlldataObject();
    // this.createWorkFlowModal.hide();
  }

  removeItem(item: any) {
    this.channelsObject.fieldsConfig.splice(
      this.channelsObject.fieldsConfig.indexOf(item),
      1
    );
  }

  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }
}
