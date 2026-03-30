import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageUserService } from 'src/app/services';
import { AdminEmailService } from 'src/app/services/admin-email.service';

@Component({
  selector: 'app-admin-email-config',
  templateUrl: './admin-email-config.component.html',
  styleUrls: ['./admin-email-config.component.scss']
})
export class AdminEmailConfigComponent implements OnInit {

  adminEmail: any = {
    id:'',
    username: '',
    password: ''
  };
 isWait: boolean = false;
 isDelete: boolean = false
 id = 'ADMIN_EMAIL';
 editMode: boolean = false;
 showPassword:boolean = false;
 showKey: boolean = false;
 constructor(
   private messageSer: MessageUserService,
   private adminEamilService: AdminEmailService,
   private router : Router
 ) {
   this.messageSer.appSidebar = false;
 }
 ngOnInit(): void {
   this.getLicense(this.id);
 }
 private getLicense(id:any) {
   this.adminEamilService.getAdminEmailConfig(id).subscribe({
     next: (res: any) => {
       if(res['result']){
         this.adminEmail = res['result'];
         this.editMode = true;
       } else{
         this.adminEmail={
          id:'',
          username: '',
          password: ''
         }
         this.editMode = false;
       }
     },
     error: (error) => {
       this.adminEmail={
        id:'',
        username: '',
        password: ''
       }
     },
   });
 }
 submit() {
  if(this.editMode){
    this.updateLicense();
    return;
  }
  else{
    this.createLicense();
  }
 }
 private updateLicense() {
   this.isWait = true;
   this.adminEamilService
     .putAdminEmailConfig({ ...this.adminEmail },this.id)
     .subscribe({
       next: (res: any) => {
         this.getLicense(this.id);
         this.router.navigateByUrl('/system-admin/system-settings')
         this.isWait = false;
       },
       error: (err: any) => {
         this.isWait = false;
       },
     });
 };
  createLicense() {
   this.isWait = true;
   this.adminEamilService
     .createAdminEmailConfig({...this.adminEmail})
     .subscribe({
       next: (res: any) => {
        this.router.navigateByUrl('/system-admin/system-settings')
        this.isWait = false;
       },
       error: (err: any) => {
         this.isWait = false;
       },
     });
 }
 ngOnDestroy() {
   this.messageSer.appSidebar = true;
 }
 deleteLicense(){
   this.isDelete = true;
   this.adminEamilService
     .deleteAdminEmailConfig(this.id)
     .subscribe({
       next: (res: any) => {
        this.adminEmail = {}
        this.router.navigateByUrl('/system-admin/system-settings')
        this.isDelete = false;
       },
       error: (err: any) => {
         this.isDelete = false;
       },
     });
 }


}
