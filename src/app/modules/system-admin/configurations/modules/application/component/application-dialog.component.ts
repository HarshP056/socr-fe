import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/services';
import { OauthProfileService } from 'src/app/services/oauth-profile.service';
import { OathProfileComponent } from '../../oath-profile/oath-profile.component';
import { ApplicationService } from 'src/app/services/application.service';
import { LogicalSystemService } from 'src/app/services/logical-system.service';
import moment from 'moment';

@Component({
  selector: 'app-application-dialog',
  templateUrl: './application-dialog.component.html',
  styleUrls: ['./application-dialog.component.scss']
})
export class ApplicationDialogComponent {
  applicationModel:any={
    appName: "",
    appId:"",
    appSecret: "",
    encodingMethod: "",
    expiryDate:"",
    ipWhiteList: "",
    ipWhiteListEnabled: "",
    logicalSystem: "",
    scope: ""
  };
  logicalSystems:any=[];
  showAppId:boolean = false;
  showAppSecret: boolean = false;
  minDate = new Date();

  constructor(
    private _applicationService: ApplicationService,
    private commonService: CommonService,
    private logicalSystemService: LogicalSystemService,
    private dialogRef: MatDialogRef<OathProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (this.data) {
      console.log(this.data,'sssssss')
      this.applicationGetById();
    } else {
      this.applicationModel = {
        appName: "",
        appId: "",
        appSecret: "",
        encodingMethod: "",
        expiryDate:"",
        ipWhiteList: "",
        ipWhiteListEnabled: "",
        logicalSystem: "",
        scope: ""
      };
    }
    this.getLogicalSystem();
  }

  getLogicalSystem() {
    this.logicalSystemService.getAllLogicalSystems().subscribe({
      next: (res: any) => {
        this.logicalSystems = res;
      },
      error: (err: any) => {
      },
    });
  }

  applicationGetById() {
    this._applicationService.applicationGetById(this.data).subscribe({
      next: (res: any) => {
        this.applicationModel = res.result;
        this.applicationModel.expiryDate = moment(this.applicationModel.expiryDate).toDate();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

 

  saveApplication() {
    if (!this.data) {
      this._applicationService.saveApplication(this.applicationModel).subscribe({
        next: (res: any) => {
          this.dialogRef.close('success');
          this.ngOnInit();
        },
        error: (err: any) => { },
      });
    } else {
      this._applicationService.updateApplication(this.data, this.applicationModel).subscribe({
        next: (res: any) => {
          this.dialogRef.close('success');
        },
        error: (err: any) => { },
      });
    }
  }

  ngOnDestroy() { }

  onDateRangeSelected() {}
}
