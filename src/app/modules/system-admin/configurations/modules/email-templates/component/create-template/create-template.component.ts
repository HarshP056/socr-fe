import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageUserService } from 'src/app/services';
import { EmailTemplatesService } from 'src/app/services/email-templates.service';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss'],
})
export class CreateTemplateComponent {
  emailTemplateModel :any= {
    body: '',
    enabled: false,
    id: '',
    title: '',
    type: '',
    emails:[],
    licensePages: ''
  };
  id: any;
  logicalSystems: any = [];
  showAppId: boolean = false;
  showAppSecret: boolean = false;
  isWait: boolean = false;
  emailTemplateTypes: any = [];
  templetView: any;
  userEmail:any ='';
  emails: any=[];
  constructor(
    private emailTemplateService: EmailTemplatesService,
    private activateRoute: ActivatedRoute,
    private messageSer: MessageUserService,
    private location: Location
  ) {
    this.messageSer.appSidebar = false;
  }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: any) => {
      this.id = params.id;
    });
    if (this.id) {
      this.getEmailTemplateById();
    } else {
      this.emailTemplateModel = {
        body: '',
        enabled: true,
        id: '',
        title: '',
        type: '',
        emails:[],
        licensePages: ''
      };
    }
    this.getAllEmailTemplateTypes();
  }
  onChange(event: any) {
    const body = event.target.value;
    this.templetView = body.replace(/\\n/g, '');
  }

  onBack() {
    this.location.back();
  }

  getToggle(event: any) {
    this.emailTemplateModel.enabled = event.checked;
  }

  getEmailTemplateById() {
    this.emailTemplateService.getEmailTemplateById(this.id).subscribe({
      next: (res: any) => {
        this.emailTemplateModel = res.result;
        const body = this.emailTemplateModel.body;
        this.templetView = body.replace(/\\n/g, '');
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  saveApplication() {
    this.isWait = true;
    if (!this.id) {
      this.emailTemplateService
        .createEmailTemplate(this.emailTemplateModel)
        .subscribe({
          next: (res: any) => {
            this.isWait = false;
            this.onBack();
          },
          error: (err: any) => {
            this.isWait = false;
          },
        });
    } else {
      this.emailTemplateService
        .updateEmailTemplates(this.id, this.emailTemplateModel)
        .subscribe({
          next: (res: any) => {
            this.isWait = false;
            this.onBack();
          },
          error: (err: any) => {
            this.isWait = false;
          },
        });
    }
  }

  getAllEmailTemplateTypes() {
    this.emailTemplateService.getEmailTemplateTypes().subscribe({
      next: (res: any) => {
        this.emailTemplateTypes = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }

  onKeyDown(event:KeyboardEvent | any): void {
    event.preventDefault();

    if (this.userEmail) {
      this.emailTemplateModel.emails.push(this.userEmail);
      console.log(this.userEmail)
      this.userEmail = "";
    }
  }

 onRemoveUser(index: any) {
  this.emailTemplateModel.emails.splice(index, 1);
}
}
