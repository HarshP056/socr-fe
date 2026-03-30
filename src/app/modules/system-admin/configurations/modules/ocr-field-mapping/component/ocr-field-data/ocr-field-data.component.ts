import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageUserService } from 'src/app/services';
import { Location } from '@angular/common';
import { OcrMapperConfigService } from 'src/app/services/ocr-mapper-config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ocr-field-data',
  templateUrl: './ocr-field-data.component.html',
  styleUrls: ['./ocr-field-data.component.scss'],
})
export class OcrFieldDataComponent {
  @ViewChild('saveOcrFieldData') saveOcrFieldData:NgForm;
  @ViewChild('saveOCRLineItem') saveOCRLineItem:NgForm;
  isWait: boolean = false;
  editMode: any = 'new';
  ocrId:any;
  types: any = ['String', 'Number', 'Date']
  dateFormats: any = ['yy-mm-dd', 'mm-yy-dd']
  ocrFieldsObject:any={};
  checkName:boolean=false;
  fieldData = {
    dataField: "",
    dateFormat: "",
    ddProcess: "",
    id: 1,
    type: "",
    xmlField: "",
    erp: "",
    category: ""
  }
  isLoading:boolean = false;

  constructor(
    private messageSer: MessageUserService,
    private location: Location,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private ocrMapperConfig: OcrMapperConfigService
  ) {
    this.messageSer.appSidebar = false;
  }

  ngOnInit(){
    this.ocrFieldsObject['items']=[];
    this.activateRoute.params.subscribe((params: any) => {
      this.ocrId = params.id;
      if (this.ocrId) {
        this.editMode = 'edit';
        this.getOCRData();
      }
    });
  }

  deriveData(event:any){
    let file = event.target.files[0];
    if(file){
      this.isLoading=true
    }
    let form = new FormData();
    form.append('file', file, file.name)
    this.getResponseFromXML(form)
    this.isLoading = false;
  }

  getResponseFromXML(formData:any){
    this.ocrMapperConfig.getSampleFromXML(formData).subscribe({
      next: (res: any) => {
        this.ocrFieldsObject.items = res;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
      },
    });
  }

  addFields(category: string){
    let Obj = {
      ...this.fieldData,
      id: this.editMode ==='new' ? this.ocrFieldsObject.items.length + 1 : this.fieldData.id,
      isNew: true,
      category
    }
    this.ocrFieldsObject.items.push({...Obj})
    this.ocrFieldsObject.items =[...this.ocrFieldsObject.items]
  }

  get f(){
    return this.saveOcrFieldData.controls;
  }

  private getOCRData() {
    this.ocrMapperConfig.getOCRDataById(this.ocrId).subscribe({
      next: (res: any) => {
        this.ocrFieldsObject = res;
      },
      error: (error) => {},
    });
  }

  submit() {
    this.isWait = true;
    if(!this.ocrFieldsObject.name){
      this.checkName = true;
      this.isWait = false;
      return;
    } else{
      if (this.editMode === 'edit') {
        this.updateObject();
      } else {
        this.postObject();
      }
      return;
    }
  }

  private updateObject() {
    this.ocrFieldsObject.items.forEach((element:any) => {
      if(element.isNew === true){
        delete element.id;
      }
      delete element.isNew;
    });
    this.ocrMapperConfig
      .updateOcrFieldMappingData({ ...this.ocrFieldsObject }, this.ocrId)
      .subscribe({
        next: (res: any) => {
          this.onBack();
          this.isWait = false;
          
        },
        error: (err: any) => {
          this.isWait = false;
        },
      });
  }

  private postObject() {
    this.ocrFieldsObject.items.forEach((element:any) => {
      delete element.id;
      delete element.isNew;
    });
    this.ocrMapperConfig
      .postOcrFieldMappingData({ ...this.ocrFieldsObject })
      .subscribe({
        next: (res: any) => {
          this.onBack();
          this.isWait = false;
        },
        error: (err: any) => {
          this.ocrFieldsObject.items.forEach((element:any, index:any) => {
            element['id']=index+1;
            element.isNew = true;
          });
          this.isWait = false;
        },
      });
  }

  removeItem(item:any){
    this.ocrFieldsObject.items.splice(this.ocrFieldsObject.items.indexOf(item),1)
    this.ocrFieldsObject.items = [...this.ocrFieldsObject.items]
  }

  onBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }
}
