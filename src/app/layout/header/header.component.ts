import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { StorageService } from 'src/app/services';
import { AlertLogService } from 'src/app/services/alert-log.service';
import { AlertLogsComponent } from 'src/app/shared/components/alert-logs/alert-logs.component';
import { BasicModalComponent } from 'src/app/shared/modals/basic-modal/basic-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent {
  user: any = {};
  @ViewChild('comment', { static: false })
  comment: BasicModalComponent;
  @ViewChild('password', { static: false })
  password: TemplateRef<any>;
  alertLogCount:any;

  constructor(private storage: StorageService, private alertLogService: AlertLogService,private dialog: NgDialogAnimationService,) {}

  ngOnInit(): void {
    this.getAlertLogCount();
    this.user = this.storage.getUser();

  }

  getAlertLogCount(){
    this.alertLogService.getAlertLogCount().subscribe({
      next: (res: any) => {
        this.alertLogCount = res;
      },
      error: (err: any) => {
      },
    });
  }

  logout() {
    this.storage.logout();
    // document.location.reload();
  }

  changePassword(){
    this.comment.templateRef = this.password;
    this.comment.show();
  }

  openAlertLogs(){
    this.dialog
      .open(AlertLogsComponent, {
        disableClose: true,
        height: '100%',
        width: '35%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' }
      })
      .afterClosed().subscribe(res=>{
        this.ngOnInit();
      })
  }


}
