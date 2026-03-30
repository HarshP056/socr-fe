import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { LogicalSystemService } from 'src/app/services/logical-system.service';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  file: any;
  logicalSystem: any;
  systems: any[] = [];

  constructor(
    private vendorService: VendorService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<UploadFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private logicalService: LogicalSystemService
  ) { }

  ngOnInit(): void {
    this.getLogicalSystem();
  }

  closeDialog(): void {
    this.dialogRef.close();
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

  removeFile() {
    this.file = null;
  }

  onFileSelect(event: any) {
      this.file = event.target.files[0];
  }

  uploadFile() {
    let formData = new FormData();
    formData.append("file", this.file, this.file.name);
    console.log(this.data);
    if(this.data === 'purchaseOrder') {
    this.vendorService.uploadPOFile(formData, this.logicalSystem).subscribe({
      next: (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message,
        });
        this.closeDialog();
      },
      error: (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Some error occurred!!',
        });
        this.closeDialog();
      },
    });
  }else if(this.data === 'vendor') {
    this.vendorService.uploadVendorFile(formData, this.logicalSystem).subscribe({
      next: (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message,
        });
        this.closeDialog();
      },
      error: (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Some error occurred!!',
        });
        this.closeDialog();
      },
    });

  }
  }

}
