import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MessageUserService } from 'src/app/services/message-user.service';
import { OauthProfileService } from 'src/app/services/oauth-profile.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MessageService } from 'primeng/api';
import { OathDialogComponent } from './component/oath-dialog.component';
@Component({
  selector: 'app-oath-profile',
  templateUrl: './oath-profile.component.html',
  styleUrls: ['./oath-profile.component.scss'],
})
export class OathProfileComponent implements OnDestroy, OnInit {
  @ViewChild(MatMenuTrigger) ddTrigger: MatMenuTrigger;

  oauthProfiles: any = [];
  displayedColumns: string[] = [
    'logo',
    'name',
    'type',
    'clientId',
    'redirectURI',
    'createdDate',
    'action',
  ];
  oauthId: string = '';
  initialLoader:boolean = false;
  isWait: boolean = false;

  constructor(
    private messageSer: MessageUserService,
    private oauthProfileApi: OauthProfileService,
    private dialog: NgDialogAnimationService,
    private messageService: MessageService
  ) {
    this.messageSer.appSidebar = false;
  }

  ngOnInit() {
    this.initialLoader=true;
    this.getAllOauthProfiles();
  }

  getAllOauthProfiles() {
    this.oauthProfileApi.getOathProfiles().subscribe({
      next: (res: any) => {
        this.initialLoader = false;
        this.oauthProfiles = res.result;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  deleteOauthProfile(id: number) {
    this.oauthProfileApi.deleteOathProfile(id.toString()).subscribe({
      next: (res: any) => {
        this.getAllOauthProfiles();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message,
        });
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

  openDialog(id: string) {
    this.dialog
      .open(OathDialogComponent, {
        disableClose: true,
        height: '100%',
        width: '35%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: id,
      })
      .afterClosed()
      .subscribe((val) => {
        this.getAllOauthProfiles();
      });
  }

  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }
}
