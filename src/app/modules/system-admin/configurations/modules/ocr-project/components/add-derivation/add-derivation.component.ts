import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgDialogAnimationService } from 'ng-dialog-animation';

@Component({
  selector: 'app-add-derivation',
  templateUrl: './add-derivation.component.html',
  styleUrls: ['./add-derivation.component.scss']
})
export class AddDerivationComponent {
  
  derivation: any = {
    type : "",
    dataField : "",
    key : "",
    fixedValue : "",
    checkRule : false,
    condition : false,
  };

  constructor(
    private dialog: NgDialogAnimationService,
    private dialogRef: MatDialogRef<AddDerivationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  
  ngOnInit(){
     if (this.data) {
      this.derivation = {...this.data}
    }
  }

  type: any[] = [
    {name: "Vendor Id Derivation", id: "vendorIdDerivation"},
    {name: "Fixed", id: "fixed"},
    {name: "PO Line", id: "poLine"},
    {name: "Key Value", id: "KeyValue"},
  ];

  addDerivation() {
    this.dialogRef.close(this.derivation);
  }

}
