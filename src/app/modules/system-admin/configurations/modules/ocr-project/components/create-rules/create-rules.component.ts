import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { OcrProjectComponent } from '../../ocr-project.component';
import { OcrRulesService } from 'src/app/services/ocr-rules.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MonacoEditorComponent, MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-rules',
  templateUrl: './create-rules.component.html',
  styleUrls: ['./create-rules.component.scss']
})
export class CreateRulesComponent implements OnInit {
  @ViewChild(MonacoEditorComponent, { static: false })  monacoComponent: MonacoEditorComponent;
  typeName: string = 'removeSpecialChar'
  rulesItems: any = [];
  test: any = {
    value: ""
  }
  rule: any = {
    "fieldName": "",
    "limit": "",
    "limitCharacterOrDigit": "Charaters",
    "projectId": "",
    "regexValue": "",
    "type": "removeSpecialChar",
    "value": "",
    "decimalLimit": "",
    "integerLimit": "",
    "items": [
      {
        "where": "",
        "with": "",
        "withText": "",
        "replaceCharacter": "",
        "replaceText": "",
        "match": "",
      }
    ],
    scriptValue: "// Write your javascript code here",
    keyValueEnabled:false
  };

  editorOptions: MonacoEditorConstructionOptions = {
    language: 'javascript', // java, javascript, python, csharp, html, markdown, ruby
    theme: 'vs-dark', // vs, vs-dark, hc-black
    automaticLayout: true,
    fontSize: 12,
  };
  //code: string= '// Write your javascript code here';

  constructor(
    private ocrRulesConfigService: OcrRulesService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<OcrProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    if (this.data.ruleId) {
      this.getRuleById();
    }
  }

  addFields() {
    this.rule.items.push({
      "where": "",
      "with": "",
      "withText": "",
      "replaceCharacter": "",
      "replaceText": "",
      "match": "",
    });
  }

  addFieldReplaceText() {
    this.rule.items.push({
      "where": "",
      "with": "",
      "withText": "",
      "replaceCharacter": "",
      "replaceText": "",
      "match": "",
    });
    //console.log(this.rule.items,'this.rule.items')
  }

  removeItemReplace(i: any) {
    this.rule.items.splice(i, 1)
  }

  removeItem(i: any) {
    this.rule.items.splice(i, 1)
  }

  saveRule() {
    let msg = this.validateForm();
    if(msg == "") {
      if (this.data.ruleId) {
        this.updateRule();
      }
      else {
        this.rule.projectId = this.data.ocrId;
        this.ocrRulesConfigService.createRule(this.rule, this.data.ocrId).subscribe({
          next: (value: any) => {
            this.dialogRef.close('success');
          },
          error: (err: any) => {
          },
        })
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: msg,
      });
    }
  }

  runTest() {
    this.test.value = this.rule.value;
    this.ocrRulesConfigService.runTest(this.test, this.data.ruleId).subscribe({
      next: (res: any) => {
        console.log(res)
        this.test = res;
        // this.dialogRef.close('success');
      },
      error: (err: any) => {
      },
    });
  }

  getType(e: any) {
    this.rule.value = e.target.value;
  }

  getRuleById() {
    this.ocrRulesConfigService.getRuleById(this.data.ruleId).subscribe({
      next: (value: any) => {
        console.log(value, 'value')
        this.rule = value;
      },
      error: (err: any) => {
      },
    })
  }

  updateRule() {
    this.ocrRulesConfigService.updateRule(this.rule, this.data.ruleId, this.data.ocrId).subscribe({
      next: (value: any) => {
        this.dialogRef.close('success');
      },
      error: (err: any) => {
      },
    })
  }

  validateForm() {
    console.log(this.rule)
    let msg = "";
    if(this.rule.type == "Script" && this.rule.scriptValue == "// Write your javascript code here") {
      msg = "Please add script.";
    } else if(this.rule.type == "regex" && !this.rule.regexValue) {
      msg = "Please add regex.";
    } else if(this.rule.type == "LimitTheCharacterOrDigit") {
      if((this.rule.limitCharacterOrDigit == "Amount" && (!this.rule.integerLimit || !this.rule.decimalLimit)) || 
      (this.rule.limitCharacterOrDigit == 'Digits' || this.rule.limitCharacterOrDigit == 'Charaters') && !this.rule.limit) {
        msg = "Please fill missing fields.";
      }      
    } else if(this.rule.type == "replaceText") {
      if(this.rule.items && this.rule.items.length > 0) {
        for (let index = 0; index < this.rule.items.length; index++) {
          const element = this.rule.items[index];
          if(!element.match || !element.replaceText) {
            msg = "Please fill all lines.";
            break;
          }
        }
      }
    } else if(this.rule.type == "removeSpecialChar") {
      if(this.rule.items && this.rule.items.length > 0) {
        for (let index = 0; index < this.rule.items.length; index++) {
          const element = this.rule.items[index];
          if(!element.where || (element.where == 'wholetext' && !element.replaceText) || (element.where != 'wholetext' && !element.replaceCharacter)) {
            msg = "Please fill all lines.";
            break;
          }
        }
      }
    }

    return msg;
  }

}
