import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocIdRangeService } from 'src/app/services/doc-id-range.service';
import { DocIdRangeComponent } from '../../doc-id-range.component';

@Component({
  selector: 'app-create-docid-range',
  templateUrl: './create-docid-range.component.html',
  styleUrls: ['./create-docid-range.component.scss']
})
export class CreateDocidRangeComponent {
  docIdRangeModel={
    id:"",
    seqEnd: "",
    seqStart:"",
    sequence: "",
  };
  showAppId:boolean = false;
  showAppSecret: boolean = false;

  constructor(
    private docIdRangeService: DocIdRangeService,
    private dialogRef: MatDialogRef<DocIdRangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (this.data) {
      console.log(this.data,'sssssss')
      this.logicalSystemById();
    } else {
      this.docIdRangeModel = {
        id:"",        
        seqEnd: "",
        seqStart:"",
        sequence: ""
      };
    }
  }

  logicalSystemById() {
    this.docIdRangeService.getDocIdRangeById(this.data).subscribe({
      next: (res: any) => {
        console.log(res, 'updated application !!!');
        this.docIdRangeModel = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

 

  saveApplication() {
    if (!this.data) {
      this.docIdRangeService.postDocIdRange(this.docIdRangeModel).subscribe({
        next: (res: any) => {
          this.dialogRef.close('success');
        },
        error: (err: any) => { },
      });
    } else {
      this.docIdRangeService.updateDocIdRange(this.docIdRangeModel,this.data).subscribe({
        next: (res: any) => {
          this.dialogRef.close('success');
        },
        error: (err: any) => { },
      });
    }
  }
}
