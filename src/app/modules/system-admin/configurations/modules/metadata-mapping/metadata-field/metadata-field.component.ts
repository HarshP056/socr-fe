import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageUserService, OcrMapperConfigService } from 'src/app/services';
import { Location } from '@angular/common';
import { MetadataConfigService } from 'src/app/services/metadata-config.service';

@Component({
  selector: 'app-metadata-field',
  templateUrl: './metadata-field.component.html',
  styleUrls: ['./metadata-field.component.scss']
})
export class MetadataFieldComponent implements OnInit {

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
    id: 1,
    type: "",
    xmlField: "",
    enable: false,
    tableField: ""
  }
  isLoading:boolean = false;

  constructor(
    private messageSer: MessageUserService,
    private location: Location,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private metadataConfigService: MetadataConfigService
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
    this.isLoading = false;
  }

  addFields(){
    let Obj = {
      ...this.fieldData,
      id: this.editMode ==='new' ? this.ocrFieldsObject.items.length + 1 : this.fieldData.id,
      isNew: true,
    }
    this.ocrFieldsObject.items.push({...Obj})
    this.ocrFieldsObject.items =[...this.ocrFieldsObject.items]
  }

  get f(){
    return this.saveOcrFieldData.controls;
  }

  private getOCRData() {
    this.metadataConfigService.getMetaDataById(this.ocrId).subscribe({
      next: (res: any) => {
        this.ocrFieldsObject = res;
        console.log("ocrFieldsObject",this.ocrFieldsObject)
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
    this.metadataConfigService
      .updateMetaDataMappingData({ ...this.ocrFieldsObject }, this.ocrId)
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
    this.metadataConfigService
      .postMetaDataMappingData({ ...this.ocrFieldsObject })
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
