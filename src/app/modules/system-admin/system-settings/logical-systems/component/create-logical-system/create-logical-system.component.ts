import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LogicalSystemService } from 'src/app/services/logical-system.service';

@Component({
  selector: 'app-create-logical-system',
  templateUrl: './create-logical-system.component.html',
  styleUrls: ['./create-logical-system.component.scss']
})
export class CreateLogicalSystemComponent {
  logicalSystemModel={
    systemId: "",
    description:"",
    username: "",
    password: "",
    systemType: "",
    docIdLogicType: ""
  };
  showAppId:boolean = false;
  showAppSecret: boolean = false;
  docIdLogicTypeList: any[] = ['PO / NPO Based Logic', 'Region Based Logic', 'Plant and Fiscal Year Based Logic', 'Common Logic']
  constructor(
    private logicalSystemService: LogicalSystemService,
    private dialogRef: MatDialogRef<CreateLogicalSystemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (this.data) {
      console.log(this.data,'sssssss')
      this.logicalSystemById();
    } else {
      this.logicalSystemModel = {
        systemId: "",
        description:"",
        username: "",
        password: "",
        systemType: "",
        docIdLogicType: ""
      };
    }
  }

  logicalSystemById() {
    this.logicalSystemService.getLogicalSystemById(this.data).subscribe({
      next: (res: any) => {
        this.logicalSystemModel = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }



  saveApplication() {
    if (!this.data) {
      this.logicalSystemService.postLogicalSystem(this.logicalSystemModel).subscribe({
        next: (res: any) => {
            this.dialogRef.close({event: 'success'});
        },
        error: (err: any) => { },
      });
    } else {
      this.logicalSystemService.updateLogicalSystem(this.logicalSystemModel,this.data).subscribe({
        next: (res: any) => {
            this.dialogRef.close({event: 'success'});
        },
        error: (err: any) => { },
      });
    }
  }

  ngOnDestroy() { }
}
