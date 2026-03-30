import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService, SystemConfigService } from 'src/app/services';
import { LogicalSystemService } from 'src/app/services/logical-system.service';
import { VendorService } from 'src/app/services/vendor.service';
import { VendorManagementComponent } from '../vendor-management.component';

@Component({
  selector: 'app-vendor-dialog',
  templateUrl: './vendor-dialog.component.html',
  styleUrls: ['./vendor-dialog.component.scss']
})

export class VendorDialogComponent implements OnDestroy, OnInit{
  vendor:any= {
    supplierId: '',
    name: '',
    gstNo: '',
    panNo: '',
    primaryEmail: '',
    phoneCntryCode: '',
    phoneExtension: '',
    logicalSystem: '',
    address: {
      address1: '',
      address2: '',
      address3: '',
      city: '',
      country: '',
      state: '',
      name: '',
      location: '',
      zip: '',
    },
  };

  systemConfig: any = {
    enable: false,
    mdiBarcodeRecognitionEnable: false,
    barcodeEnable: false,
    qrCodeEnable: false,
    vectorSearch: false,
    id: 'SYSTEM_CONFIG'
  };

  rolesOptions:any=[]
  showForm: boolean = false;
  systems: any[] = [];
  isTrain:boolean=false;
  constructor(
    private vendorService: VendorService,
    private commonService: CommonService,
    private logicalService: LogicalSystemService,
    private sysConfigService : SystemConfigService,
    private dialogRef: MatDialogRef<VendorManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getLogicalSystem();
    this.getSystemConfig();
    if (this.data) {
      this.getVendor();
    } else {

    }
    this.showForm = true;
  }

  getVendor() {
    this.vendorService.getVendorById(this.data).subscribe({
      next: (res: any) => {
        console.log(this.data);
        this.vendor = res.result;
        if(this.vendor.address == null || this.vendor.address == undefined){
          this.vendor.address = {
              address1: '',
              address2: '',
              address3: '',
              city: '',
              country: '',
              state: '',
              name: '',
              location: '',
              zip: ''
          }
        }
        console.log(this.vendor);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  saveVendor() {
    if (!this.data) {
      delete this.vendor.id;

      this.vendorService.saveVendor(this.vendor).subscribe({
        next: (res: any) => {
          console.log(this.vendor);
          this.dialogRef.close('success');
        },
        error: (err: any) => {},
      });
    } else {
      this.vendorService.updateVendor(this.vendor, this.data).subscribe({
        next: (res: any) => {
          this.dialogRef.close('success');
        },
        error: (err: any) => {},
      });
    }
  }

  formatPhoneNumber(value: string) {
    const numericValue = value.replace(/\D/g, '');

    const formattedValue = numericValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

    this.vendor.phone = formattedValue;
  }

  getLogicalSystem() {
    this.logicalService.getAllLogicalSystems().subscribe({
      next: (res: any) => {
        this.systems = res;
      },
      error: (err: any) => {
      },
    });
  }

  trainVendor(){
    this.isTrain = true;
    this.commonService.trainVendor(this.vendor.supplierId).subscribe({
      next: (res: any) => {
        this.isTrain = false;
        this.dialogRef.close('success');
      },
      error: (err: any) => {
        this.isTrain = false;
      },
    });
  }

  textBasedtrainVendor(){
    this.isTrain = true;
    this.commonService.textBasedTrainVendor(this.vendor.supplierId).subscribe({
      next: (res: any) => {
        this.isTrain = false;
        this.dialogRef.close('success');
      },
      error: (err: any) => {
        this.isTrain = false;
      },
    });
  }

  getSystemConfig(){
    this.sysConfigService.getSystemConfigById(this.systemConfig.id).subscribe({
      next:(res:any)=>{
        if(res){
          this.systemConfig.enable = res.enable ? res.enable : false;
          this.systemConfig.mdiBarcodeRecognitionEnable = res.mdiBarcodeRecognitionEnable ? res.mdiBarcodeRecognitionEnable : false;
          this.systemConfig.barcodeEnable = res.barcodeEnable ? res.barcodeEnable : false;
          this.systemConfig.qrCodeEnable = res.qrCodeEnable ? res.qrCodeEnable : false;
          this.systemConfig.vectorSearch = res.vectorSearch ? res.vectorSearch : false;
        }
      },
      error:(error)=>{

      }
    })
  }

  ngOnDestroy() {}

}
