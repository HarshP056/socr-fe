import { Component, OnInit } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { MessageUserService, SmartStoreService, LogicalSystemService } from 'src/app/services';
import { LicenseService } from 'src/app/services/license.service';

@Component({
  selector: 'app-license-config',
  templateUrl: './license-config.component.html',
  styleUrls: ['./license-config.component.scss']
})
export class LicenseConfigComponent implements OnInit {

  license: any = {
    id:'',
    licenseKey:'',
    totalPages:'',
    pagesConsumed:'',
    remainingPages:'',
    username: '',
    password: ''
  };

 isWait: boolean = false;
 isDelete: boolean = false
 id = 'LICENSE';
 editMode: boolean = false;
 showPassword:boolean = false;
 showKey: boolean = false;
 constructor(
   private messageSer: MessageUserService,
   private licenseService: LicenseService,
   private router : Router
 ) {
   this.messageSer.appSidebar = false;
 }
 ngOnInit(): void {
   console.log(this.license)
   this.getLicense(this.id);
 }

 private getLicense(id:any) {
   this.licenseService.getLicenseConfig(id).subscribe({
     next: (res: any) => {
       if(res['result']){
         this.license = res['result'];
         this.editMode = true;
       } else{
         this.license={
          id:'',
          licenseKey:'',
          totalPages:'',
          pagesConsumed:'',
          remainingPages:'',
          username: '',
          password: ''
         }
         this.editMode = false;
       }
     },
     error: (error) => {
       this.license={
        id:'',
        licenseKey:'',
        totalPages:'',
        pagesConsumed:'',
        remainingPages:'',
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
   this.licenseService
     .putLicenseConfig({ ...this.license },this.id)
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
   this.licenseService
     .createLicenseConfig({...this.license})
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
   this.licenseService
     .deleteLicenseConfig(this.id)
     .subscribe({
       next: (res: any) => {
        this.license = {}
        this.router.navigateByUrl('/system-admin/system-settings')
        this.isDelete = false;
       },
       error: (err: any) => {
         this.isDelete = false;
       },
     });
 }

}
