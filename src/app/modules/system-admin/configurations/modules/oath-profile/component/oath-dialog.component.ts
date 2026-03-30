import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { OauthProfileService } from 'src/app/services/oauth-profile.service';
import { OathProfileComponent } from '../oath-profile.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/services';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { HelpDocsComponent } from './help-docs/help-docs.component';

@Component({
  selector: 'oath-dialog',
  templateUrl: './oath-dialog.component.html',
  styleUrls: ['./oath-dialog.component.scss'],
})
export class OathDialogComponent implements OnDestroy, OnInit {
  oauthProfile: {
    id?: '';
    clientId: '';
    clientSecret: '';
    name?: '';
    redirectURI: '';
    scope: '';
    tenantId: '';
    type: '';
    oauthType: "";
    createdDate?: Date;
  };
  show:boolean = false;
  authTypes: any[] = [];
  types: any[] = ['google', 'ms-graph', 'ms-imap'];
  isWait: boolean = false;
  editMode: any = 'new';
  constructor(
    private oauthProfileApi: OauthProfileService,
    private commonService: CommonService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<OathProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getAuthTypes();
    if (this.data) {
      this.getOauthProfile();
    } else {
      this.editMode = 'new';
      this.oauthProfile = {
        clientId: '',
        clientSecret: '',
        name: '',
        redirectURI: '',
        scope: '',
        tenantId: '',
        oauthType: "",
        type: '',
      };
    }
  }

  getOauthProfile() {
    this.oauthProfileApi.getOathProfileById(this.data).subscribe({
      next: (res: any) => {
        console.log(res, 'ffffffffff');
        this.oauthProfile = res.result;
        this.editMode = 'edit';
        //console.log(this.oauthProfiles, 'oauth list...')
      },
      error: (err: any) => {
        console.log(err);
        // this.loader = false;
        // this._toastr.error('Something went wrong!', 'Error');
      },
    });
  }

  showDocs(){
    let selected = this.oauthProfile?.oauthType.toString();
    return selected === 'oauth'
  }

  getAuthTypes() {
    this.commonService.getAuthTypes().subscribe({
      next: (res: any) => {
        this.authTypes = res;
      },
      error: (error) => {},
    });
  }
  onClose() {
    this.dialogRef.close();
  }

  submit() {
    this.isWait = true;
    if (!this.data) {
      delete this.oauthProfile.id;
      delete this.oauthProfile.createdDate;
      this.oauthProfileApi.saveOathProfile(this.oauthProfile).subscribe({
        next: (res: any) => {
          this.isWait = false;
          this.dialogRef.close('success');
        },
        error: (err: any) => {
          this.isWait = false;
        },
      });
    } else {
      this.oauthProfileApi
        .updateOathProfile(this.oauthProfile, this.oauthProfile.id)
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

  openHelpDocs() {
    this.dialog
      .open(HelpDocsComponent,{
        height: '100%',
        width: '35%',
        // animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
      })
  }

  ngOnDestroy() {}
}
