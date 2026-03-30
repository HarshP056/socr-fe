import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SsoClientConfigComponent } from '../sso-client-config.component';
import { SSOService } from 'src/app/services/sso.service';

@Component({
  selector: 'app-save-sso-client-config',
  templateUrl: './save-sso-client-config.component.html',
  styleUrls: ['./save-sso-client-config.component.scss']
})
export class SaveSsoClientConfigComponent {

  SSOClientConfig:any = {
    id: '',
    clientId: '',
    clientSecret: '',
    name: '',
    redirectURI: '',
    scope: '',
    tenantId: '',
    type: '',
    createdDate: Date,
  };
  show:boolean = false;
  authTypes: any[] = [];
  types: any[] = ['google', 'ms-graph', 'ms-imap'];
  isWait: boolean = false;
  editMode: any = 'new';
  constructor(
    private ssoClientConfigService: SSOService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<SsoClientConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    // this.getAuthTypes();
    if (this.data) {
      this.getSSOClientConfigById();
    } else {
      this.editMode = 'new';
      this.SSOClientConfig = {
        clientId: '',
        clientSecret: '',
        name: '',
        redirectURI: '',
        scope: '',
        tenantId: '',
        type: '',
      };
    }
  }

  getSSOClientConfigById() {
    this.ssoClientConfigService.getSSOClientConfigById(this.data).subscribe({
      next: (res: any) => {
        this.SSOClientConfig = res;
        this.editMode = 'edit';
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  submit() {
    this.isWait = true;
    if (!this.data) {
      delete this.SSOClientConfig.id;
      delete this.SSOClientConfig.createdDate;
      this.ssoClientConfigService.saveSSOClientConfig(this.SSOClientConfig).subscribe({
        next: (res: any) => {
          this.isWait = false;
          this.dialogRef.close('success');
        },
        error: (err: any) => {
          this.isWait = false;
        },
      });
    } else {
      this.ssoClientConfigService
        .updateSSOClientConfig(this.SSOClientConfig, this.SSOClientConfig.id)
        .subscribe({
          next: (res: any) => {
            console.log(this.isWait);
            this.isWait = false;
            this.dialogRef.close('success');
          },
          error: (err: any) => {
            this.isWait = false;
          },
        });
    }
  }

  ngOnDestroy() {}
}
