import { Component, Inject } from '@angular/core';
import { EmailTemplatesComponent } from '../../email-templates.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmailTemplatesService } from 'src/app/services/email-templates.service';

@Component({
  selector: 'app-email-template-details',
  templateUrl: './email-template-details.component.html',
  styleUrls: ['./email-template-details.component.scss']
})
export class EmailTemplateDetailsComponent {
  emailTemplateModel={
    body: "",
    enabled: false,
    id: "",
    title: "",
    type: "",
  };
  logicalSystems:any=[];
  showAppId:boolean = false;
  showAppSecret: boolean = false;
  emailTemplateTypes:any=[]

  constructor(
    private emailTemplateService: EmailTemplatesService,
    private dialogRef: MatDialogRef<EmailTemplatesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (this.data) {
      console.log(this.data,'sssssss')
      this.getEmailTemplateById();
    } else {
      this.emailTemplateModel = {
        body: "",
        enabled: true,
        id: "",
        title: "",
        type: "",
      };
    }
    this.getAllEmailTemplateTypes();
  }

  getToggle(event:any){
    this.emailTemplateModel.enabled = event.checked
  }

  getEmailTemplateById() {
    this.emailTemplateService.getEmailTemplateById(this.data).subscribe({
      next: (res: any) => {
        this.emailTemplateModel = res.result;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  saveApplication() {
    console.log(this.emailTemplateModel)
    if (!this.data) {
      this.emailTemplateService.createEmailTemplate(this.emailTemplateModel).subscribe({
        next: (res: any) => {
          this.dialogRef.close('success');
          this.ngOnInit();
        },
        error: (err: any) => { },
      });
    } else {
      this.emailTemplateService.updateEmailTemplates(this.data, this.emailTemplateModel).subscribe({
        next: (res: any) => {
          this.dialogRef.close('success');
        },
        error: (err: any) => { },
      });
    }
  }

  getAllEmailTemplateTypes(){
    this.emailTemplateService.getEmailTemplateTypes().subscribe({
      next: (res: any) => {
        this.emailTemplateTypes = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy() { }
}
