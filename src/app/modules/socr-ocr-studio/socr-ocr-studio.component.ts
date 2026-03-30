import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonService, MessageUserService, MiscService, OcrConfigService, OcrProjectService, SocrOcrService, StorageService } from 'src/app/services';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import * as saveAs from 'file-saver';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { fabric } from 'fabric';
import { MdiResponseComponent } from '../socr-ocr-q/component/mdiResponse/mdi-response.component';
import { LogsComponent } from '../socr-ocr-q/component/logs/logs.component';
import { BasicModalComponent } from 'src/app/shared/modals/basic-modal/basic-modal.component';

@Component({
  selector: 'app-socr-ocr-studio',
  templateUrl: './socr-ocr-studio.component.html',
  styleUrls: ['./socr-ocr-studio.component.scss'],
  standalone: false
})
export class SocrOcrStudioComponent implements OnInit {
  @ViewChild('canContainer1', { static: false }) canContainer1: ElementRef<HTMLCanvasElement>;
  @ViewChild('canContainer2', { static: false }) canContainer2: ElementRef<HTMLCanvasElement>;

  @ViewChild('addVendorModal', { static: false })
  addVendorModal: BasicModalComponent;
  @ViewChild('addVendorView', { static: false })
  addVendorView: TemplateRef<any>;

  env = environment;

  initialLoader: boolean = false;
  project: any [] = [];
  queyList = {
    page: 1,
    limit: 50,
    order: "-projectNameOrGuid"
  }
  file: any;
  isLoading: boolean = false;
  projectId: string = "";
  uploadFileData: any;
  canvasList1: any[] = [];
  canvasList2: any[] = [];
  canvas1: any;
  canvas2: any;
  documentData: any;
  imgUrl: string = '';
  imageData: string | ArrayBuffer | null = null;
  selectedTab: string = 'pre-built-invoice';
  isAnalyzing: boolean = false;
  isAnalyzing1: boolean = false;
  fixedfields: any;
  dynamicfields: any;
  fieldsArr: any[] = [];
  showLineItems: boolean = false;
  lineArr: any[] = [];
  vendorId: any;
  pageInd: number = 0;
  totalLength: number = 0;
  page: number = 1;
  orgPageEvent: any;
  totalPages: number = 1;
  currentPage: number = 1;
  businessRules: any[] = [];
  lineHeaders: string[] = [];
  mdiTables: any[] = [];
  mdiResponse: any;
  contentTotalLength: number = 0;
  ocrData: any;
  user: any;
  docType: any;
  lineHeaderValue: any[]=[];
  isVendorRecipentName: boolean = false;
  isVendorName: boolean = false;
  selectedIndex: number;
  channelData: any;
  purchaseOrderNumber: string;
  isFileUploaded: boolean = false;
  isAnalyzed: boolean = false;
  sampleDocumentId = "6e8b7ca4-a854-48c9-9847-8346b9362457";
  samePageSize: number = 3;
  confidenceScore: number = 0;
  socrHeaderFields: any[] = [];
  socrLineFields: any[] = [];

  constructor(
    private sOCRService: SocrOcrService,
    private messageService: MessageService,
    private http: HttpClient,
    private dialog: NgDialogAnimationService,
    private ocrProjectService : OcrProjectService,
    private storageService : StorageService
  ) { }

  ngOnInit(): void {
    this.getOcrProjects();
    this.user = this.storageService.getUser();
    this.isFileUploaded = true;
    this.isLoading = true;
    this.selectedTab = 'pre-built-invoice';
    this.businessRules = [];
    this.mdiResponse = null;
    this.fieldsArr = [];
    this.lineArr = [];
    this.mdiTables = [];
    this.totalLength = 0;
    this.page = 1;
    this.pageInd = 0;
    this.totalPages = 1;
    this.currentPage = 1;
    this.fixedfields = null;
    this.dynamicfields = null;
    this.totalPages = 3;
    this.currentPage = 1;
    this.uploadFileData = {};
    this.uploadFileData.taxId = "6e8b7ca4-a854-48c9-9847-8346b9362457";
    this.uploadFileData.projectId = "10012";
    this.uploadFileData.requestId = "500185";
    this.getChannelByid();
    this.getImage(1);
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  getOcrProjects() {
    this.initialLoader = true;
    this.ocrProjectService.getOcrProjectsPage(this.queyList).subscribe({
      next: (res: any) => {
        if (this.user.role === 'CompanyUser' && this.user.ocrProject.length) {
          this.user.ocrProject.forEach((item:any)=>{
            res.content.forEach((elem:any)=>{
              if(elem.projectNameOrGuid ===item){
                this.project.push(elem);
                if(this.project.length){
                  this.projectId = this.project[0].id;
                }
              }
            })
          })
        }
        else{
          this.project = res['content'];
          this.projectId = this.project[0].id;

        }
        this.getSOCRStudioFields(this.project[0]);

        this.initialLoader = false;
      },
      error: (err: any) => {
        this.initialLoader = false;
      },
    });
  }

  getProjectData(projectId: string) {
    let data = this.project.filter((p:any) => p.id == projectId);
    this.getSOCRStudioFields(data);
  }
  getSOCRStudioFields(data: any) {
    this.socrHeaderFields = [];
    this.socrLineFields = [];
    let headerMappings = data.headerMappings.filter((h:any) => h.enable && h.socrStudioField);
    let lineMappings = data.lineMappings.filter((l:any) => l.enable && l.socrStudioField);
    let customMappings = data.customMappings.filter((c:any) => c.enable && c.socrStudioField);
    this.socrLineFields = lineMappings;
    this.socrHeaderFields = headerMappings;
    for (let index = 0; index < customMappings.length; index++) {
      this.socrHeaderFields.push(customMappings[index]);
    }

    console.log(this.socrLineFields);
    console.log(this.socrHeaderFields);
  }

  onFileSelect(event: any) {
    // this.mdiTables = [];
    // this.businessRules = [];
    // this.mdiResponse = null;
    // this.mdiResponse.tables= [];
    this.ocrData = null;
    // console.log(this.projectId);
    if (this.projectId) {
      this.file = event.target.files[0];
      console.log(this.file);

      let form = new FormData();
      form.append('file', this.file, this.file.name)
      this.uploadFile(form);

      // TODO: Reset
      this.selectedTab = 'pre-built-invoice';
      this.businessRules = [];
      this.mdiResponse = null;
      this.fieldsArr = [];
      this.lineArr = [];
      this.mdiTables = [];
      this.totalLength = 0;
      this.page = 1;
      this.pageInd = 0;
      this.totalPages = 1;
      this.currentPage = 1;
      this.fixedfields = null;
      this.dynamicfields = null;
    } else {
      this.file = null;
      event.target.files = null;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select a project',
      });
      return;
    }
  }

  uploadFile(formData: any) {
    this.isLoading = true;
    this.sOCRService.uploadFile(formData, this.projectId).subscribe({
      next: (value: any) => {
        if(value.status === 'success') {
          this.uploadFileData = value.result.socrRequestData;
          this.totalPages = this.uploadFileData.totalPageNo;
          this.currentPage = 1;
          this.getChannelByid();
          this.getImage(1);
        } else {
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        this.isLoading = false;
      },
    })
    this.isFileUploaded = true
  }

  getImage(pageNumber: number) {
    // console.log("getImage" )
    return this.http.get(`${this.env.apiUrl}formRecognizer/showImage/${this.uploadFileData.taxId}/${pageNumber}`, { responseType: 'blob' }).subscribe((response: Blob) => {
      this.readBlobAsDataURL(response);
    });
  }

  readBlobAsDataURL(blob: Blob) {
    this.canvasList1 = [];
    this.canvasList2 = [];

    this.canvasList1?.push({
      id: 'canvas0'
    });

    this.canvasList2?.push({
      id: 'canvas-p-0'
    });

    setTimeout(() => {
      let canvas: any = new fabric.Canvas('canvas0', {
        allowTouchScrolling: true,
      });

      let canvasP: any = new fabric.Canvas('canvas-p-0', {
        allowTouchScrolling: true,
      });

      if (!this.canvas1) {
        this.canvas1 = canvas;
      }

      if (!this.canvas2) {
        this.canvas2 = canvasP;
      }

      canvas.set('id', 'canvas-0');
      canvasP.set('id', 'canvas-p-0');
      this.canvasList1[0].canvasElem = canvas;
      this.canvasList2[0].canvasElem = canvasP;

      let img;
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        this.imageData = reader.result as string;
        img = fabric.Image.fromURL(this.imageData, (oImg) => {
          this.canvas1?.setHeight(oImg.height);
          this.canvas1?.setWidth(oImg.width);
          this.canvas1?.setBackgroundImage(oImg);

          this.canvasList1[0].canvasElemOrgHeight = oImg?.height;
          this.canvasList1[0].canvasElemOrgWidth = oImg?.width;
          this.canvas1?.requestRenderAll();

          //this.canvas2?.setHeight("150px");
          this.canvas2?.setWidth("150px");
          this.canvas2?.setBackgroundImage(oImg);

          //this.canvasList2[0].canvasElemOrgHeight = "150px";
          this.canvasList2[0].canvasElemOrgWidth = "150px";
          this.canvas2?.requestRenderAll();

        });
      };
      this.isLoading = false;
    }, 100);
  }

  analyzeDocument() {
    this.isAnalyzing = true;
    this.sOCRService.sendDocToMDI(this.projectId, this.uploadFileData.taxId).subscribe({
      next: (value: any) => {
        if(value.status === 'success') {
          this.businessRules = [];
          Object.keys(value.result).forEach((key: any) => {
            this.businessRules.push({rule: key != 'Stamp and Physical Signature' ? key : `${key} (On First Page)`, status: value.result[key] ? value.result[key].status : 'FAILED'})
          });
          this.getOCRDetails();
           // this.isAnalyzing = false;
          // this.isAnalyzed = true;
        } else {
          this.isAnalyzing = false;
        }

      },
      error: (err: any) => {
        this.isAnalyzing = false;
      },
    })
  }

  analyzeDocument1() {
    this.isAnalyzing1 = true;
    this.sOCRService.sendDocToMDI(this.projectId, this.uploadFileData.taxId).subscribe({
      next: (value: any) => {
        if(value.status === 'success') {
          this.businessRules = [];
          Object.keys(value.result).forEach((key: any) => {
            this.businessRules.push({rule: key != 'Stamp and Physical Signature' ? key : `${key} (On First Page)`, status: value.result[key] ? value.result[key].status : 'FAILED'})
          });
          this.getOCRDetails();
        } else {
          this.isAnalyzing1 = false;
        }

      },
      error: (err: any) => {
        this.isAnalyzing1 = false;
      },
    })
  }

  getOCRDetails() {
    this.sOCRService.getMDIResponse(this.uploadFileData.requestId).subscribe({
      next: (res: any) => {
        // TODO: Add Content Tab
        this.isAnalyzing = false;
        this.isAnalyzed = true;
        // this.isAnalyzing1= false;
        this.mdiResponse = res.result;
        if(this.mdiResponse && this.mdiResponse.tables) {
          this.confidenceScore = (this.mdiResponse.documents[0].confidence)*100;
          this.getTableContent(this.mdiResponse.tables);
        }

        this.dynamicfields = this.mdiResponse.keyValuePairs;

        this.getSOCRResponse();
        //console.log(this.fieldsArr);
        //console.log(this.lineArr);
      },
      error: (err: any) => {
        this.isAnalyzing = false;
        this.isAnalyzing1 = false;
      }
    })
  }

  setActiveTab(tab: string) {
    this.selectedTab = tab;
  }

  showLineItemData() {
    this.showLineItems = !this.showLineItems;
  }

  onPaginateChange(event: any) {
    //console.log(event);
    if(!this.orgPageEvent) {
      this.orgPageEvent = event;
      this.page = this.page + 1;
      this.pageInd++;
    } else {
      if(this.orgPageEvent.pageIndex <= event.pageIndex) {
        this.page = this.page + 1;
        this.pageInd++;
      } else {
        this.page = this.page - 1;
        this.pageInd--;
      }
      this.orgPageEvent = event;
    }
  }

  openLogs(data: any) {
    this.dialog
      .open(LogsComponent, {
        disableClose: true,
        height: '100%',
        width: '80%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: data,
      })
      .afterClosed();
  }

  downloadXML() {
    //console.log(this.invoiceData.taxId);
    this.sOCRService.downloadXML("").subscribe({
      next: (res: Blob) => {
        const blob = new Blob([res], { type: 'text/xml' });
        saveAs(blob, 'file.xml');
      },
      error: (error) => {
      },
    });
  }

  openXmlDialog() {
    this.dialog
      .open(MdiResponseComponent, {
        disableClose: true,
        height: '100%',
        width: '35%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: "",
      })
      .afterClosed();
  }

  previousPage() {
    this.currentPage--;
    this.pageInd = 0;
    this.contentTotalLength = 0;
    this.page = 1;
    this.getImage(this.currentPage);
    // this.getSampleImage(this.currentPage)
    console.log(this.currentPage)
    if(this.mdiResponse) {
      this.getTableContent(this.mdiResponse.tables);
    }
  }

  nextPage() {
    this.currentPage++;
    this.pageInd = 0;
    this.contentTotalLength = 0;
    this.page = 1;
    this.getImage(this.currentPage);
    // this.getSampleImage(this.currentPage)

    if(this.mdiResponse) {
      this.getTableContent(this.mdiResponse.tables);
    }
  }

  getTableContent(tables: any) {
    this.mdiTables = [];
    let mdiResTables: any[] = [];
    mdiResTables = tables.filter((table: any) => table.cells[0].boundingRegions[0].pageNumber === this.currentPage);
    this.contentTotalLength = mdiResTables.length;

    for (let table of mdiResTables) {
      let rowCount: number = table.rowCount;
      let tblData: any[] = [];
      let rowData: any[] = [];
      let i: number = 0;

      for (let index = 0; index < table.columnCount; index++) {
        rowData.push('');
      }

      do {
        for (let j = 0; j < table.cells.length; j++) {
          if(table.cells[j].rowIndex === i) {
            rowData[table.cells[j].columnIndex] = table.cells[j].content;
          } else {
            tblData.push(rowData);
            rowData = [];
            rowData[table.cells[j].columnIndex] = table.cells[j].content;
            i++;
          }
        }
        tblData.push(rowData);
        i++;
      } while(i < rowCount)

      this.mdiTables.push(tblData);
    }

    //console.log(this.mdiTables);
  }

  getSOCRResponse() {
    this.sOCRService.getSOCRResponse(this.uploadFileData.requestId).subscribe({
      next: (res: any) => {
        //console.log(res);
        this.ocrData = res.result;

        if(this.ocrData) {
          //this.getLineItemsDetails();
          this.displaySOCRResponse();
        }
      },
      error: (err: any) => {
      }
    })
  }

  displaySOCRResponse() {
    this.fixedfields = this.ocrData.headerFields;
    this.docType = this.mdiResponse.documents[0].docType;
    this.docType = this.docType.charAt(0).toUpperCase() + this.docType.slice(1).toLowerCase();
    //console.log(this.docType)
    let fieldsTempArr: any[] = this.fixedfields.map((item: any) => item.name);
    //console.log(fieldsTempArr);
    this.fieldsArr = [];
    this.lineArr = [];
    let i = 0;
    let k = 0;
    this.totalLength = 0;

    for (let prop of fieldsTempArr) {
      if(this.socrHeaderFields.findIndex((h:any) => h.dataField == prop) > -1) {
        let index = this.fixedfields.findIndex((item: any) => item.name === prop);
        this.fixedfields[index]['groupType'] = null;

        if (this.fixedfields[index]["type"] == "List" || this.fixedfields[index]["type"] == "Checkbox") {
          let channelFieldData = this.channelData.headerMappings.find((hm: any) => hm.dataField == this.fixedfields[index]["name"]);
          if (channelFieldData) {
            this.fixedfields[index]["options"] = channelFieldData.optionValue ? channelFieldData.optionValue : [];
          }
        }

        if (prop === 'PurchaseOrder') {
          this.purchaseOrderNumber = this.fixedfields[index].value;
          if (this.fieldsArr.length > 2) {
            this.fieldsArr.splice(1, 0, this.fixedfields[index]);
          } else {
            this.fieldsArr.push(this.fixedfields[index]);
          }
          i = this.fieldsArr.length;
        } else if (prop.includes('Invoice') || prop == "SubTotal" || prop == "TotalTax" || prop == "CGST" || prop == "SGST" || prop == "IGST"
         || prop == "Freight" || prop == "TotalDiscount" || prop == "Currency") {
          let isPropExist = this.fieldsArr.find((item: any) => item.groupType === "Invoice");
          if (!isPropExist) {
            if (this.fieldsArr.length > 1) {
              this.fieldsArr.splice(1, 0, { "groupType": "Invoice" });
            } else {
              this.fieldsArr.push({ "groupType": "Invoice" });
            }
            let indexx = this.fieldsArr.findIndex((item: any) => item.groupType === "Invoice");
            this.fieldsArr[indexx]['data'] = [];
            this.fieldsArr[indexx]['data'].push(this.fixedfields[index]);
          } else {
            let indexx = this.fieldsArr.findIndex((item: any) => item.groupType === "Invoice");
            if(indexx != 1 && this.fieldsArr.length > 1) {
              let obj = this.fieldsArr[indexx];
              this.fieldsArr.splice(indexx, 1);
              this.fieldsArr.splice(1, 0, obj);
              this.fieldsArr[1]['data'].push(this.fixedfields[index]);
            } else {
              this.fieldsArr[indexx]['data'].push(this.fixedfields[index]);
            }
          }
          i = this.fieldsArr.length;
        } else if (prop.includes('Vendor')) {
          let isPropExist = this.fieldsArr.find((item: any) => item.groupType === "Vendor");
          if (!isPropExist) {
            if (this.fieldsArr.length > 0) {
              this.fieldsArr.splice(0, 0, { "groupType": "Vendor" });
            } else {
              this.fieldsArr.push({ "groupType": "Vendor" });
            }
            let indexx = this.fieldsArr.findIndex((item: any) => item.groupType === "Vendor");
            this.fieldsArr[indexx]['data'] = [];
            this.fieldsArr[indexx]['data'].push(this.fixedfields[index]);
          } else {
            let indexx = this.fieldsArr.findIndex((item: any) => item.groupType === "Vendor");
            if(indexx != 0 && this.fieldsArr.length > 0) {
              let obj = this.fieldsArr[indexx];
              this.fieldsArr.splice(indexx, 1);
              this.fieldsArr.splice(0, 0, obj);
              this.fieldsArr[0]['data'].push(this.fixedfields[index]);
            } else {
              this.fieldsArr[indexx]['data'].push(this.fixedfields[index]);
            }
          }
          i = this.fieldsArr.length;
        } else {
          this.fieldsArr.push(this.fixedfields[index]);
          i++;
        }
      }
    }

      let vendor = this.fieldsArr[0];
      let vendorIdIndex = vendor.data.findIndex((d:any) => d.name == "VendorId");
      if(vendorIdIndex > 0) {
        let obj = vendor.data.find((d:any) => d.name == "VendorId");
        vendor.data.splice(vendorIdIndex, 1);
        vendor.data.splice(0, 0, obj);
      }

      let VendorAddressRecipientIndex = vendor.data.findIndex((d:any) => d.name == "VendorAddressRecipient");
      if(VendorAddressRecipientIndex > 1) {
        let obj = vendor.data.find((d:any) => d.name == "VendorAddressRecipient");
        if(obj && obj != "" && obj.value) {
          vendor.data.splice(VendorAddressRecipientIndex, 1);
          vendor.data.splice(1, 0, obj);
        } else {
          let VendorNameIndex = vendor.data.findIndex((d:any) => d.name == "VendorName");
          if(VendorNameIndex > 1) {
            let obj = vendor.data.find((d:any) => d.name == "VendorName");
            vendor.data.splice(VendorNameIndex, 1);
            vendor.data.splice(1, 0, obj);
          }
        }
      }

      let obj = vendor.data.find((d:any) => d.name == "VendorAddressRecipient");
      if(obj && obj != "" && obj.value) {
        this.isVendorRecipentName = true;
      }

      if(!this.isVendorRecipentName) {
        let obj = vendor.data.find((d:any) => d.name == "VendorName");
        if(obj && obj != "" && obj.value) {
          this.isVendorName = true;
        }
      }

      if(this.ocrData.customFields) {
        for (let index = 0; index < this.ocrData.customFields.length; index++) {
          const element = this.ocrData.customFields[index];
          if(this.socrHeaderFields.findIndex((h:any) => h.dataField == element.name) > -1) {
            if(element.name == "Round Off") {
              let indexx = this.fieldsArr.findIndex((item: any) => item.groupType === "Invoice");
              this.fieldsArr[indexx].data.push(element);
            } else {
              this.fieldsArr.push(element);
            }
          }
        }
      }

    console.log(this.fieldsArr);
  }

  private getChannelByid() {
    this.ocrProjectService.getByIdOcrProfile(this.uploadFileData.projectId).subscribe({
      next: (res: any) => {
        this.channelData = res;
        this.channelData.lineMappings = this.channelData.lineMappings.sort((a:any, b:any) => a.index - b.index);
        this.getLineItemsDetails(this.channelData.lineMappings);
      },
      error: (error) => {},
    });
  }

  getLineItemsDetails(lineItems: any) {
    this.lineHeaders = [];
    if(lineItems && lineItems.length > 0){
      for (let item of lineItems) {
        if(item.enable) {
          this.lineHeaders.push(item.dataField);
        }
      }
    }
  }

  toggleLineItem(index: number) {
    if(this.selectedIndex != index)
      this.selectedIndex = index;
    else
      this.selectedIndex = -1;
  }

  addOrderNumber() {
    let index = this.fieldsArr.findIndex((f:any) => f.name == "PurchaseOrder");
    if(index > -1) {
      if(!this.fieldsArr[index].valueList)
        this.fieldsArr[index].valueList = [];

      this.fieldsArr[index].valueList.push('');
    }
  }

  addGRN() {
    let index = this.fieldsArr.findIndex((f:any) => f.name == "Barcode");
    if(index > -1) {
      if(!this.fieldsArr[index].valueList)
        this.fieldsArr[index].valueList = [];

      this.fieldsArr[index].valueList.push('');
    }
  }

  deleteOrderNumber(index: number) {
    let indexx = this.fieldsArr.findIndex((f:any) => f.name == "PurchaseOrder");
    this.fieldsArr[indexx].valueList.splice(index, 1);
  }

  deleteGRN(index: number) {
    let indexx = this.fieldsArr.findIndex((f:any) => f.name == "Barcode");
    this.fieldsArr[indexx].valueList.splice(index, 1);
  }

  onDateRangeSelected() {
    //throw new Error('Method not implemented.');
  }

  openVendorPopUp() {
    this.addVendorModal.templateRef = this.addVendorView;
    this.addVendorModal.show();
  }

  onSelectVendor(val:any){
    //console.log(val);
    this.addVendorModal.hide();
    //console.log(this.fieldsArr)
    if(this.fieldsArr?.length){
      this.fieldsArr.filter((elem:any) => {
        if(elem.groupType === 'Vendor'){
          //console.log(elem)
          if(elem.data?.length){
            elem.data.map((item:any) => {
              if(item.name === 'VendorId'){
                item.value = val.supplierId;
              }
              if(item.name === 'VendorAddress'){
                let address = val?.address?.address1 + " " + val?.address?.address2 + " " + val?.address?.country + "- " + val?.address?.zip;
                item.value = address;
              }
              if(item.name === 'VendorAddressRecipient'  || item.name === 'VendorName'){
                item.value = val.name;
              }
              if(item.name === 'VendorGST'){
                item.value = val.gstNo;
              }
              return item;
            })
          }
        }
      });
    }
  }

  deleteRow(index: any) {
    this.ocrData.lineFields.splice(index, 1);
    //console.log(this.ocrData.lineFields);
  }

  addRow() {
    //console.log(this.ocrData.lineFields)
    let obj = {
      fields: [...this.ocrData.lineFields[0].fields.map((item: any) => {
        return {
          name: item.name,
          value: ''
        }
      })]
    };
    this.ocrData.lineFields.push(obj);
  }

  getProgressBarClass(value: number): string {
    if (value >= .95) {
      return 'green-progress-bar';
    } else if (value >= .65 && value < .95) {
      return 'blue-progress-bar';
    } else {
      return 'red-progress-bar';
    }
  }

}
