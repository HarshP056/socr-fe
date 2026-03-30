import { Component, Inject, OnInit } from '@angular/core';
import { GstService } from 'src/app/services/gst.service';
import { GstComponent } from '../gst.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService, LogicalSystemService } from 'src/app/services';

@Component({
  selector: 'app-gst-dialog',
  templateUrl: './gst-dialog.component.html',
  styleUrls: ['./gst-dialog.component.scss']
})
export class GstDialogComponent implements OnInit {

  gst:any= {
    gstNo: '',
    logicalSystem: ''
  };

  rolesOptions:any=[]
  showForm: boolean = false;
  systems: any[] = [];

  constructor(
    private gstService: GstService,
    private logicalService: LogicalSystemService,
    private dialogRef: MatDialogRef<GstComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getLogicalSystem();
    if (this.data) {
      this.getGST();
    } else {

    }
    this.showForm = true;
  }

  getGST() {
    this.gstService.getGST(this.data).subscribe({
      next: (res: any) => {
        console.log(this.data);
        this.gst = res.result;
        console.log(this.gst);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  saveGST() {
    if (!this.data) {
      delete this.gst.id;
      this.gstService.createGST(this.gst).subscribe({
        next: (res: any) => {
          //console.log(this.gst);
          this.dialogRef.close('success');
        },
        error: (err: any) => {},
      });
    } else {
      this.gstService.putGST(this.gst, this.data).subscribe({
        next: (res: any) => {
          this.dialogRef.close('success');
        },
        error: (err: any) => {},
      });
    }
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

  ngOnDestroy() {}

}
