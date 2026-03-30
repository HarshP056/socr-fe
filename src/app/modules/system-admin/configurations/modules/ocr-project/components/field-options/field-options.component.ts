import { Component, Inject, OnInit } from '@angular/core';
import { OcrProjectComponent } from '../../ocr-project.component';
import { OcrRulesService } from 'src/app/services/ocr-rules.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-field-options',
  templateUrl: './field-options.component.html',
  styleUrls: ['./field-options.component.scss']
})
export class FieldOptionsComponent implements OnInit {
  fieldOption:any = {
    label: "",
    value: ""
  };
  fieldOptions: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<OcrProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(){
    if(this.data){
      this.fieldOptions = this.data.optionValue;
    }
  }

  addOptions() {
    if(!this.fieldOptions)
      this.fieldOptions = [];

    this.fieldOptions.push({
      label: this.fieldOption.label,
      value: this.fieldOption.value
    });

    this.fieldOption.label = "";
    this.fieldOption.value = "";
  }

  removeOptions(i: number) {
    this.fieldOptions.splice(i, 1);
  }

  saveOption() {
    this.data.optionValue = this.fieldOptions;
    this.dialogRef.close('success');
  }

}
