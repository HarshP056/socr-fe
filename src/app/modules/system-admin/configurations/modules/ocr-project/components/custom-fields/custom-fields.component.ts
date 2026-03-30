import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { OcrProjectComponent } from '../../ocr-project.component';
import { OcrRulesService } from 'src/app/services/ocr-rules.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MonacoEditorComponent, MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';

@Component({
  selector: 'app-custom-fields',
  templateUrl: './custom-fields.component.html',
  styleUrls: ['./custom-fields.component.scss']
})
export class CustomFieldsDialogComponent implements OnInit {
  @ViewChild(MonacoEditorComponent, { static: false })  monacoComponent: MonacoEditorComponent;

  test: any = {
    value: ""
  };
  customField: any = {
    "fieldName": "",
    "fieldType": "regex",
    "regularexpression": "",
    "possibleValues": "",
    "script": "// Write your javascript code here"
  };

  editorOptions: MonacoEditorConstructionOptions = {
    language: 'javascript', // java, javascript, python, csharp, html, markdown, ruby
    theme: 'vs-dark', // vs, vs-dark, hc-black
    automaticLayout: true,
    fontSize: 12,
  };

  constructor(
    private ocrRulesConfigService: OcrRulesService,
    private dialogRef: MatDialogRef<OcrProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    if(this.data) {
      this.customField.fieldName = this.data.dataField;
      this.customField.fieldType = this.data.fieldType;
      this.customField.regularexpression = this.data.regularexpression;
      this.customField.possibleValues = this.data.possibleValues;
      this.customField.script = this.data.script;
    }
  }

  saveRule() {
    this.dialogRef.close(this.customField);
  }

  runTest() {
    this.ocrRulesConfigService
      .runTest(this.test, this.data.ruleId,)
      .subscribe({
        next: (res: any) => {
          console.log(res)
          this.test = res;
          // this.dialogRef.close('success');
        },
        error: (err: any) => {
        },
      });
  }

  onFieldTypeChange(value: string) {
    this.customField.fieldType = value;
  }

  getType(e: any) {
    //this.rule.value = e.target.value;
  }

}
