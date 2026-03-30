import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MessageUserService, OcrConfigService, VendorService } from 'src/app/services';
import { LogicalSystemService } from 'src/app/services/logical-system.service';
import { OcrMapperConfigService } from 'src/app/services/ocr-mapper-config.service';
import { AddDerivationComponent } from '../add-derivation/add-derivation.component';
import { Location } from '@angular/common';
import { OcrRulesService } from 'src/app/services/ocr-rules.service';
import { CreateRulesComponent } from '../create-rules/create-rules.component';
import { OcrProjectService } from 'src/app/services/ocr-project.service';
import { FieldOptionsComponent } from '../field-options/field-options.component';
import { CustomFieldsDialogComponent } from '../custom-fields/custom-fields.component';
import { DeleteConfirmationModalComponent } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.component';
import { noop, Observable, Observer, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators'
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-copy-ocr-project',
  templateUrl: './copy-ocr-project.component.html',
  styleUrls: ['./copy-ocr-project.component.scss']
})
export class CopyOcrProjectComponent implements OnInit {

  @ViewChild('saveOcrFieldData') saveOcrFieldData:NgForm;
  @ViewChild('saveOCRLineItem') saveOCRLineItem:NgForm;
  @ViewChild('deleteModal', { static: false })
  deleteModal: DeleteConfirmationModalComponent;
  
  isWait: boolean = false;
  projectId: string;
  editMode: any = 'new';
  ocrProfileObject: any = {
    projectId: '',
    pageSize: '',
    projectNameOrGuid: '',
    url: '',
    auth: '',
    auto: true,
    digitalSignature: false,
    stamp: false,
    logicalSystem: '',
    mandatoryFieldsCheck:false,
    firstPageVendorEnabled: false,
    mdiModelType:'',
    mdiModelVersion:'',
    indexingType:'',
    headerMappings: [
      {
        category: '',
        dataField: '',
        dateFormat: '',
        erp: '',
        name: '',
        type: '',
        xmlField: '',
        rules: [],
        enable: false,
        index: 0,
        mandatoryField: false,
        optionValue: [],
        socrStudioField: false,
        disableFields: false,
        ocrField: false,
      },
    ],
    dataDerivation:[
      {
        type: '',
        dataField: '',
        key: '',
        fixedValue: '',
        checkRule: false,
        condition: false,
        optionValue: [],
        disableFields: false,
      }
    ],
    items: [
      {
        category: '',
        dataField: '',
        dateFormat: '',
        erp: '',
        name: '',
        type: '',
        xmlField: '',
        rules: [],
        enable: false,
        index: 0,
        mandatoryField: false,
        optionValue: [],
        socrStudioField: false,
        disableFields: false,
        ocrField: false,
      }
    ],
    customMappings: [],
    poLineConfig:{
      amount: false,
      description: false,
      quantity: false,
      unit: false,
      unitPrice: false,
    },
    mappedCountryCurrency:[
      {
        name:'',
        value:''
      }
    ],
    openAiLineItemDetermineConfig:{
      modelName: '',
      responseFormat: '',
      openAiKey: '',
      temperature: 0,
      instructionList: [],
      contentDetails: [],
      responseFormatDetails: [],
    }
  };
  activeTab:string='overViewTab';
  systems: any[] = [];
  fieldData = {
    dataField: "",
    dateFormat: "",
    ddProcess: "",
    type: "",
    xmlField: "",
    erp: "",
    category: "",
    index: 0,
    optionValue: []
  };
  checkName: boolean = false;
  allRules: any[] = [];
  rulesParams: any = {
    order : 'name',
    limit: 100,
    page: 1
  };
  rulesList:any[] = [];
  types: any[]= ['String', 'Number', 'Date', 'List', 'Checkbox'];
  separator: any[]= [
    {name: 'None', value: null},
    {name: 'Comma(,)', value: ','},
    {name: 'Dot(.)', value: '.'}
  ];
  dateFormats: any[] = [
    {name: 'dd-MM-yyyy', value:'dd-MM-yyyy'},
    {name: 'MM-dd-yyyy', value:'MM-dd-yyyy'},
    {name: 'yyyy-MM-dd', value:'yyyy-MM-dd'},
  ];
  dateSeparators: any[] = [
    {name: 'None', value: null},
    {name:'/',value:'/'},
    {name:'-',value:'-'}
  ];
  lineItemDeterminiationConfig: any = {
    amount: false,
    description: false,
    quantity: false,
    unit: false,
    unitPrice: false
  };

  currencies: any[]=  [
    {name: 'None', value:null},
    {name: 'USD', value:'USD'},
    {name: 'INR', value:'INR'},
    {name: 'EUR', value:'EUR'},
    {name: 'SGD', value:'SGD'},
    {name: 'JPY', value:'JPY'}];

    modelTypes: any[]=  [
      {name: 'Prebuilt Invoice', value:'prebuilt-invoice'},
      {name: 'Prebuilt Read', value:'prebuilt-read'}
    ];

    modelVersions: any[]=  [
        {name: '2024-07-31-preview', value:'2024-07-31-Preview'},
        {name: '2023-07-31(GA)', value:'2023-07-31(GA)'}
    ];

    poList:any = [];
    grnList:any = [];

    instructionList: any[] = [];
    contentDetails: any[] = []
    responseFormatDetails: any[] = [];
    showAPIKey: boolean = false;
    indexingType:any=["Vector","Text","Cosine Similarity"];

    llmRules: any[] = [];
    llmRulesParams: any = {
      sortBy : 'ruleName',
      size: 10,
      page: 1
    };
    llmRuleObj: any = {};
    selectedVendor: string = '';
    suggestions$?: Observable<any[]>;
    errorMessage: any;
    typeaheadLoading?: boolean;
    userPrompts: any[] = [];
    showLLMRuleList: boolean = true;
    editLLMRuleMode: string = 'new';
    isDelete: boolean = false;
    deleteObj: any;
    
  constructor(
    private messageSer: MessageUserService,
    private location: Location,
    private activateRoute: ActivatedRoute,
    private ocrProjectService: OcrProjectService,
    private ocrMapperConfig: OcrMapperConfigService,
    private logicalService: LogicalSystemService,
    private dialog: NgDialogAnimationService,
    private ocrRulesConfigService: OcrRulesService,
    private vendorService: VendorService) {
    this.messageSer.appSidebar = false;
  }

  ngOnInit(): void {
    // this.getOCRRules();
    this.getLogicalSystem();
    this.activateRoute.params.subscribe((params: any) => {
      this.projectId = params.id;
      if (this.projectId) {
        this.editMode = 'edit';
        this.getChannelByid();
        this.getLLMRulesPage();
      }
      else{
        this.ocrProfileObject.lineMappings = [];
      }
    });
  }

suggestions = new Observable((observer: Observer<string | undefined>) => {
    observer.next(this.selectedVendor);
  }).pipe(
    switchMap((query: string) => {
      if (query) {
        // using github public api to get users by name
        return this.vendorService.getVendorsForTypeAhead({ page: 1, order: 'name', limit: 10, supplierId: '', name: query, logicalSystem: '' }).pipe(
          map((res: any) => {
            console.log(res);
            if (res && res.content && res.content.length > 0) {
              for (let index = 0; index < res.content.length; index++) {
                const element = res.content[index];
                element.formattedName = element.supplierId + ' - ' + element.name;
              }
            }
            return res && res.content && res.content.length > 0 ? res.content : of([]);
          }),
          tap(() => noop, err => {
            // in case of http error
            this.errorMessage = err && err.message || 'Something goes wrong';
          })
        );
      }

      return of([]);
    })
  );

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }
  
  typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('Selected value: ', e.value);
    if(e && e.value) {
      this.llmRuleObj.vendorId = e.value.split(" - ")[0];
      this.llmRuleObj.vendorName = e.value.split(" - ")[1];
    }
    console.log(this.llmRuleObj.vendorId);
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

  private getChannelByid() {
    this.ocrProjectService.getByIdOcrProfile(this.projectId).subscribe({
      next: (res: any) => {
        this.ocrProfileObject = res;
        this.getOCRRules();
        this.ocrProfileObject.projectNameOrGuid = '';
        this.ocrProfileObject.lineMappings = this.ocrProfileObject.lineMappings.sort((a:any, b:any) => a.index - b.index);
        if( this.ocrProfileObject.poLineConfig == null){
          this.ocrProfileObject.poLineConfig = {
            amount: false,
            description: false,
            quantity: false,
            unit: false,
            unitPrice: false
          }
        }
        if(this.ocrProfileObject.poStartsWith){
          this.ocrProfileObject.poStartsWith.forEach((elem:any)=>{
            if(elem){
              this.poList.push({poName:elem})
            }
          })
        }
        if(this.ocrProfileObject.grnStartsWith){
          this.ocrProfileObject.grnStartsWith.forEach((elem:any)=>{
            if(elem){
              this.grnList.push({grnName:elem})
            }
          })
        }
        if(this.ocrProfileObject.mappedCountryCurrency == null){
          this.ocrProfileObject.mappedCountryCurrency = [];
        }
        if(this.ocrProfileObject.openAiLineItemDetermineConfig != null){
          if(this.ocrProfileObject.openAiLineItemDetermineConfig.instructionList == null){
            this.ocrProfileObject.openAiLineItemDetermineConfig.instructionList = [];
            this.instructionList = [];
          }
          else{
            if(this.ocrProfileObject?.openAiLineItemDetermineConfig?.instructionList?.length){
              this.instructionList = [];
              this.ocrProfileObject?.openAiLineItemDetermineConfig?.instructionList.forEach((elem:any) => {
                const obj : any = {
                  name:elem
                }
                this.instructionList.push(obj)
              })
            }
          }
          if(this.ocrProfileObject.openAiLineItemDetermineConfig.contentDetails == null){
            this.ocrProfileObject.openAiLineItemDetermineConfig.contentDetails = [];
            this.contentDetails = [];
          }
          else{
            if(this.ocrProfileObject?.openAiLineItemDetermineConfig?.contentDetails?.length){
              this.contentDetails = [];
              this.ocrProfileObject?.openAiLineItemDetermineConfig?.contentDetails.forEach((elem:any) => {
                const obj : any = {
                  name:elem
                }
                this.contentDetails.push(obj)
              })
            }
          }
          if(this.ocrProfileObject.openAiLineItemDetermineConfig.responseFormatDetails == null){
            this.ocrProfileObject.openAiLineItemDetermineConfig.responseFormatDetails = [];
            this.responseFormatDetails = [];
          }
          else{
            if(this.ocrProfileObject?.openAiLineItemDetermineConfig?.responseFormatDetails?.length){
              this.responseFormatDetails = [];
              this.ocrProfileObject?.openAiLineItemDetermineConfig?.responseFormatDetails.forEach((elem:any) => {
                const obj : any = {
                  name:elem
                }
                this.responseFormatDetails.push(obj)
              })
            }
          }
        }
        else{
          this.ocrProfileObject.openAiLineItemDetermineConfig = {
            modelName: '',
            responseFormat: '',
            openAiKey: '',
            temperature: 0,
            instructionList: [],
            contentDetails: [],
            responseFormatDetails: [],
          }
        }
        console.log(this.ocrProfileObject)
      },
      error: (error) => {},
    });
  }

  onBack() {
    this.location.back();
  }

  submit() {
    this.isWait = true;
    let count = 0;

    this.ocrProfileObject.headerMappings.forEach((header: any) => {
      header.category = 'H';
    });

    this.ocrProfileObject.lineMappings.forEach((line: any) => {
      line.index = count++;
      line.category = 'L';
    });
    const mergedArray = [...this.ocrProfileObject.headerMappings, ...this.ocrProfileObject.lineMappings, ...this.ocrProfileObject.customMappings];
    this.ocrProfileObject.items = mergedArray;

    if(this.poList){
      this.ocrProfileObject.poStartsWith = this.poList.map((elem:any)=> {
        return elem.poName;
      } )
    }
    if(this.grnList){
      this.ocrProfileObject.grnStartsWith = this.grnList.map((elem:any)=> {
        return elem.grnName;
      } )
    }
    if(this.instructionList?.length){
      this.ocrProfileObject.openAiLineItemDetermineConfig.instructionList = this.instructionList.map((elem:any) => elem.name)
    }
    else{
      this.ocrProfileObject.openAiLineItemDetermineConfig.instructionList =[]
    }
    if(this.contentDetails?.length){
      this.ocrProfileObject.openAiLineItemDetermineConfig.contentDetails = this.contentDetails.map((elem:any) => elem.name)
    }
    else{
      this.ocrProfileObject.openAiLineItemDetermineConfig.contentDetails = []
    }
    if(this.responseFormatDetails?.length){
      this.ocrProfileObject.openAiLineItemDetermineConfig.responseFormatDetails = this.responseFormatDetails.map((elem:any) => elem.name)
    }
    else{
      this.ocrProfileObject.openAiLineItemDetermineConfig.responseFormatDetails = []
    }
    this.postObject();

    return;
  }

  private updateObject() {
    const updatedOcrProfileObject = { ...this.ocrProfileObject };
    //console.log(updatedOcrProfileObject);
    this.ocrProjectService.putOcrProfile(updatedOcrProfileObject, this.projectId).subscribe({
        next: (res: any) => {
          this.isWait = false;
          this.onBack();
        },
        error: (err: any) => {
          this.isWait = false;
        },
      });
  }

  private postObject() {
    const updatedOcrProfileObject = { ...this.ocrProfileObject };
    this.ocrProjectService.postOcrProfile(updatedOcrProfileObject).subscribe({
        next: (res: any) => {
          this.isWait = false;
          this.onBack();
        },
        error: (err: any) => {
          this.isWait = false;
        },
      });
  }

  setActiveTab(tab:string){
   this.activeTab=tab
  }

  changeEngine(e:any){
    this.ocrProfileObject.engineType = e.target.value;
  }

  addFields(category: string){
    //console.log(category)
    if(!this.ocrProfileObject.items) {
      this.ocrProfileObject.items = [];
    }

    let Obj = {
      ...this.fieldData,
      index: category == 'L' ? this.ocrProfileObject.lineMappings.length + 1 : 0,
      isNew: true,
      category: category
    };

    if(category == 'L') {
      this.ocrProfileObject.lineMappings.push({...Obj});
      this.ocrProfileObject.lineMappings = [...this.ocrProfileObject.lineMappings];
    }
    else{
      this.ocrProfileObject.headerMappings.push({...Obj});
      this.ocrProfileObject.headerMappings = [...this.ocrProfileObject.headerMappings];
    }
  }

  editCustomFields(data:any) {
    this.dialog.open(CustomFieldsDialogComponent, {
      disableClose: true,
      height: '100%',
      width: '50%',
      animation: { to: 'left' },
      position: { top: '0px', bottom: '0px', right: '0px' },
      data: data
    })
    .afterClosed().subscribe((val) => {
      if(val) {
        data.dataField = val.fieldName;
        data.fieldType = val.fieldType;
        data.possibleValues = val.possibleValues;
        data.script = val.script;

        //console.log(this.ocrProfileObject.customMappings);
      }

    });
  }

  addCustomFields() {
    this.dialog.open(CustomFieldsDialogComponent, {
      disableClose: true,
      height: '100%',
      width: '50%',
      animation: { to: 'left' },
      position: { top: '0px', bottom: '0px', right: '0px' },
      data: null
    })
    .afterClosed().subscribe((val) => {
      if(val) {
        if(!this.ocrProfileObject.items) {
          this.ocrProfileObject.items = [];
        }

        if(!this.ocrProfileObject.customMappings) {
          this.ocrProfileObject.customMappings = [];
        }

        let obj:any = {
          ...this.fieldData,
          index: this.ocrProfileObject.customMappings.length + 1,
          isNew: true,
          category: "C"
        };

        obj.dataField = val.fieldName;
        obj.fieldType = val.fieldType;
        obj.possibleValues = val.possibleValues;
        obj.script = val.script;

        this.ocrProfileObject.customMappings.push({...obj});
        this.ocrProfileObject.customMappings = [...this.ocrProfileObject.customMappings];
        //console.log(this.ocrProfileObject.customMappings);
      }
    });
  }

  get f(){
    return this.saveOcrFieldData.controls;
  }

  private getRulesArgsObj() {
    const obj: any = {
      limit: this.rulesParams.limit,
      order: this.rulesParams.order,
      page: this.rulesParams.page,
      projectId: this.ocrProfileObject.projectId
    };
    return obj;
  }

  private getOCRRules() {
    this.ocrRulesConfigService.getRulePages(this.getRulesArgsObj()).subscribe({
      next: (res: any) => {
        this.rulesList = res.content;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  removeLineItem(index:number){
    this.ocrProfileObject.lineMappings.splice(index, 1);
    //this.ocrProfileObject.items = [...this.ocrProfileObject.items]
  }

  removeHeaderItem(index:number){
    this.ocrProfileObject.headerMappings.splice(index, 1);
    //this.ocrProfileObject.items = [...this.ocrProfileObject.items]
  }

  removeCustomFields(index:number) {
    this.ocrProfileObject.customMappings.splice(index, 1);
  }

  removeRule(data:any) {
    this.ocrRulesConfigService.deleteRule(data.id).subscribe({
      next: (value) => {
        this.getOCRRules();
      },
      error: (err) => {
      },
    })
  }

  openDialog(id: string) {
    this.dialog
      .open(CreateRulesComponent, {
        disableClose: true,
        height: '100%',
        width: '50%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: {
          ocrId: this.ocrProfileObject.projectId,
          ruleId: id,
        }
      })
      .afterClosed()
      .subscribe((val) => {
        this.getOCRRules();
      });
  }

  deleteRow(index: any){
    this.ocrProfileObject.dataDerivation.splice(index, 1);
  }

  dataDerivationLineItemIdx: any = null;

  openDerivationDialog(id: any, index:any, type:any){
    console.log(id)
    if(type == 'edit'){
      this.dataDerivationLineItemIdx = "";
      this.dataDerivationLineItemIdx = index;
    }
    else{
       this.dataDerivationLineItemIdx = null;
    }
    this.dialog
      .open(AddDerivationComponent, {
        disableClose: true,
        height: '100%',
        width: '40%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
       data: id
      })
      .afterClosed().subscribe((data) => {
        if (data === null || data === undefined || !data) {
          return;
        } else {
          console.log(this.dataDerivationLineItemIdx)
          if(this.dataDerivationLineItemIdx == null || this.dataDerivationLineItemIdx == undefined){
            this.ocrProfileObject.dataDerivation.push(data);
          }
          else{
            this.ocrProfileObject.dataDerivation[this.dataDerivationLineItemIdx] = data
          }
        }
      });
  }

  drop(event: CdkDragDrop<any[]>) {
    //console.log(event);
    if (event.previousIndex !== event.currentIndex) {
      const clonedItems = JSON.parse(JSON.stringify(this.ocrProfileObject.lineMappings));
      moveItemInArray(clonedItems, event.previousIndex, event.currentIndex);
      this.ocrProfileObject.lineMappings = clonedItems;
    }
  }

  openOptionDialog(data: any) {
    this.dialog.open(FieldOptionsComponent, {
      disableClose: true,
      height: '75%',
      width: '50%',
      //animation: { to: 'left' },
      //position: { top: '0px', bottom: '0px', right: '0px' },
      data: data
    })
    .afterClosed()
    .subscribe((val) => {
      this.getOCRRules();
    });
  }

  ngOnDestroy() {
    this.messageSer.appSidebar = true;
  }

  onAddPO(){
    this.poList.push({
      poName: ''
    })
  }

  onDeletePO(i: any) {
    this.poList.splice(i, 1);
  }

  onAddGRN(){
    this.grnList.push({
      grnName: ''
    })
  }

  onDeleteGRN(i: any) {
    this.grnList.splice(i, 1);
  }

  onAddCountry(){
    this.ocrProfileObject.mappedCountryCurrency.push({
      name: '',
      value:''
    })
  }
  onDeleteCountry(i: any) {
    this.ocrProfileObject.mappedCountryCurrency.splice(i, 1);
  }

  removeInstruction(index: number) {
    this.instructionList.splice(index, 1);
  }
  addInstruction() {
    if(!this.instructionList) {
      this.instructionList = [];
    }
    this.instructionList.push({name: ""});
  }
  removeContentDetails(index: number) {
    this.contentDetails.splice(index, 1);
  }
  addContentDetails() {
    if(!this.contentDetails) {
      this.contentDetails = [];
    }
    this.contentDetails.push({name: ""});
  }
  removeResponseFormat(index: number) {
    console.log(index)
    this.responseFormatDetails.splice(index, 1);
    console.log(this.responseFormatDetails)
  }
  addResponseFormat() {
    if(!this.responseFormatDetails) {
      this.responseFormatDetails = [];
    }
    this.responseFormatDetails.push({name: ""});
  }

    removeUserPrompt(index: number) {
    this.userPrompts.splice(index, 1);
  }
  addUserPrompt() {
    if(!this.userPrompts) {
      this.userPrompts = [];
    }
    this.userPrompts.push({name: ""});
  }

  backToLLMRules() {
    this.showLLMRuleList = true;
    this.llmRuleObj = {};
    this.editLLMRuleMode = 'new';
  }

  showLLMRuleDetails(data: any) {
    this.showLLMRuleList = false;
    this.llmRuleObj = data ? data : {};
    this.editLLMRuleMode = data ? 'edit' : 'new';
  }

  saveLLMRule() {
    let data:any = {
      ruleName: this.llmRuleObj.ruleName,
      projectId: this.ocrProfileObject.projectId,
      vendorId: this.llmRuleObj.vendorId,
      vendorName: this.llmRuleObj.vendorName,
      userPrompts: []
    };

    for (let index = 0; index < this.userPrompts.length; index++) {
      const element = this.userPrompts[index];
      data.userPrompts.push(element.name);
    }

    console.log(data);

    this.ocrProjectService.saveLLMRule(data).subscribe({
      next: (res: any) => {
        this.showLLMRuleList = true;
        this.llmRuleObj = {};
        this.editLLMRuleMode = 'new';
        this.getLLMRulesPage();
      },
      error: (err) => {
        console.log(err)
      },
    });
  }

  getLLMRulesPage() {
    this.ocrProjectService.getLLMRulesPage(this.llmRulesParams).subscribe({
      next: (res: any) => {
        this.llmRules = res.content;
      },
      error: (err) => {
        console.log(err)
      },
    });
  }

  getFormattedVendorName(vendorId: string) {
    if(vendorId) {
      this.vendorService.getVendorById(vendorId).subscribe({
        next: (res: any) => {
          return res.supplierId + ' - ' + res.name;
        },
        error: (err) => {
          console.log(err)
        },
      });
    }
  }


  getVendorById(vendorId: string) {
    this.vendorService.getVendorByVendorId(vendorId).subscribe({
      next: (res: any) => {
        this.selectedVendor = res.result.supplierId + ' - ' + res.result.name;
      },
      error: (err) => {
        console.log(err)
      },
    });
  }

  editLLMRule(data: any) {
    this.showLLMRuleList = false;
    this.llmRuleObj = data;
    this.editLLMRuleMode = 'edit';
    this.getVendorById(data.vendorId);
     this.userPrompts = [];
    if(data.userPrompt && data.userPrompt.length) {
        data.userPrompt.forEach((elem: any) => {
        this.userPrompts.push({name: elem})
      })
    }
  }

  openConfirmationModal(val: any) {
    this.deleteObj = val;
    console.log(this.deleteObj);
    this.deleteModal.show();
  }

  deleteLLMRule() {
    this.isDelete = true;
    let data = {
      projectId: this.deleteObj.projectId,
      vendorId: this.deleteObj.vendorId
    }
    this.ocrProjectService.deleteLLMRule(data).subscribe({
      next: (res: any) => {
        this.isDelete = false;
        this.getLLMRulesPage();
        this.deleteModal.hide();
      },
      error: (err: any) => {
        this.isDelete = false;
      },
    });
  }

}
