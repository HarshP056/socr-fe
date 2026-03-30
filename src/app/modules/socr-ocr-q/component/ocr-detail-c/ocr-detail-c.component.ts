import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonService, OcrProjectService, VendorService } from 'src/app/services';
import * as saveAs from 'file-saver';
import { Location } from "@angular/common";
import { LogsComponent } from '../logs/logs.component';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MdiResponseComponent } from '../mdiResponse/mdi-response.component';
import { SocrOcrService } from 'src/app/services';
import { MessageService } from 'primeng/api';
import { BasicModalComponent } from 'src/app/shared/modals/basic-modal/basic-modal.component';
import { faSync } from '@fortawesome/free-solid-svg-icons';

interface Stage {
  name: string;
  id: string;
  tick: boolean;
  color: string;
  icon: string;
}
@Component({
  selector: 'app-ocr-details-c',
  templateUrl: './ocr-detail-c.component.html',
  styleUrls: ['./ocr-detail-c.component.scss']
})
export class OcrDetailsCComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('documentCanvas', { static: false }) documentCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasContainer', { static: false }) canvasContainer: ElementRef<HTMLElement>;

  @ViewChild('addVendorModal', { static: false })
  addVendorModal: BasicModalComponent;
  @ViewChild('addVendorView', { static: false })
  addVendorView: TemplateRef<any>;

  @ViewChild('addPOModal', { static: false })
  addPOModal: BasicModalComponent;
  @ViewChild('addPOView', { static: false })
  addPOView: TemplateRef<any>;

  faSync = faSync;

  _apiUrl: string = environment.apiUrl;
  private ctx: any;
  scale: number = 1.0;
  requestId: string;
  ocrId: string;
  ocrStage: string;
  fixedfields: any;
  dynamicfields: any[] = [];
  urlSafe: string;
  fieldsArr: any[];
  selectedTab: string = '';
  showLineItems: boolean = true;
  canvas: any;
  tempObservables: any;
  canvOrgHeight: any;
  canvOrgWidth: any;
  tempDocObervables: any;
  documentData: any;
  imgUrl: string = '';
  imageData: string | ArrayBuffer | null = null;
  vendorId: string;
  pageInd: number = 0;
  totalLength: number = 0;
  page: number = 1;
  orgPageEvent: any;
  pageCount: number = 1;
  canvasPageInd: number = 0;
  orgCanvasPageEvent: any;
  canvasPage: number = 1;
  displayImg: boolean = false;
  lineItems: any[] = [];
  lineHeaders: string[] = [];
  ocrData: any = {
    headerFields:[]
  };
  invoiceData: any;
  processing: boolean = false;
  isWait: boolean = false;
  isWaiting: boolean = false;
  isWait2: boolean = false;
  canvasParentWidth: any;
  imgResponse: Blob;
  totalPages: number = 1;
  currentPage: number = 1;
  mdiResponse: any;
  businessRules: any[] = [];
  mdiTables: any;
  lineArr: any[] = [];
  contentTotalLength: number = 0;
  stages: Stage[] = [
    { name: 'New', id: 'New', tick: false, color: '#123222', icon: './assets/Step Symbol.svg' },
    { name: 'Page Separation', id: 'PageSeperation', tick: false, color: '#123222', icon: './assets/Step Symbol.svg' },
    { name: 'Data Recognition', id: 'DataReconization', tick: false, color: '#123222', icon: './assets/Step Symbol.svg' },
    { name: 'Rule Engine', id: 'RuleEngine', tick: false, color: '#123222', icon: './assets/Step Symbol.svg' },
    { name: 'Data', id: 'DataDerive', tick: false, color: '#123222', icon: './assets/Step Symbol.svg' },
    { name: 'Verification', id: 'Verification', tick: false, color: '#123222', icon: './assets/Step Symbol.svg' },
    { name: 'Processed', id: 'Processed', tick: false, color: '#123222', icon: './assets/Step Symbol.svg' }
  ];
  lineItemHeaders: any[] = [];
  docType: any;
  selectedIndex: number = -1;
  channelData: any;
  purchaseOrderNumber: string = "";
  isVendorName: boolean = false;
  isVendorRecipentName: boolean = false;
  focusedElement: string = "";
  imgg: HTMLImageElement;
  boundingBox: any = null;
  storedBoundingBoxes: any;
  isWait3: boolean = false;
  listPage: number = 1;

  constructor(
    private activateRoute: ActivatedRoute,
    private http: HttpClient,
    private commonService: CommonService,
    private location: Location,
    private dialog: NgDialogAnimationService,
    private router: Router,
    private sOCRService: SocrOcrService,
    private messageService: MessageService,
    private ocrProjectService: OcrProjectService,
    private vendorService: VendorService
  ) { }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe((params: any) => {
      this.listPage = params['listPage'] ? Number(params['listPage']) : 1;
    });
    this.activateRoute.params.subscribe((params: any) => {
      this.ocrId = params.docId;
      this.requestId = params.docId;
      this.ocrStage = params.stage;
      if (this.ocrId) {
        this.getInvoice();
      }
    });
  }

  ngAfterViewInit(): void {
    this.canvas = this.documentCanvas.nativeElement;
    this.ctx =  this.canvas.getContext('2d');
    // Initialize your canvas here (draw initial content if needed)
  }

  onBack() {
    //this.location.back();
    // this.router.navigateByUrl(`/socr-ocr-q?stage=${this.invoiceData.stage}`)
    this.router.navigate(['/socr-ocr-q'], {
    queryParams: {
      stage: this.invoiceData.stage,
      page: this.listPage,
      requestId: this.requestId 
    }
  });
  }

  setActiveTab(tab: string) {
    this.selectedTab = tab;
  }

  updateStages() {
    let stage = this.invoiceData?.stage;
    let foundSelected = false;
    for (let i = this.stages.length - 1; i >= 0; i--) {
      if (this.stages[i].id === stage) {
        this.stages[i].tick = true;
        foundSelected = true;
      }
      else {
        this.stages[i].tick = foundSelected;
      }
      this.stages[i].icon = foundSelected ? './assets/Step Symbol.svg' : './assets/images/circle.png';
    }
  }

  getInvoice() {
    this.sOCRService.getInvoiceByRequestId(this.ocrId).subscribe({
      next: (res: any) => {
        //console.log(res);
        this.invoiceData = res.result;
        this.getChannelByid();
        this.getMDIResponse();
        this.totalPages = this.invoiceData.totalPageNo;
        this.currentPage = 1;
        this.updateStages();
        if (this.invoiceData.stage == 'New' || this.invoiceData.stage == 'PageSeperation') {
          this.selectedTab = 'Logs';
          this.commonService.downloadFile(this.invoiceData.attachment.systemId, this.invoiceData.attachment.documentid).subscribe({
            next: (res: any) => {
              this.imgUrl = res.status;
            },
            error: (err: any) => {
            }
          });
        }
      },
      error: (err: any) => {
      }
    })
  }

  getDoc(element: any) {
    const docId: any = element.attachment.documentid;
    this.commonService.downloadFile(element.attachment.systemId, docId).subscribe({
      next: (res: any) => {
        const url = res.status
        window.open(url, "_blank");
      },
      error: (error) => { },
    });
  }

  proceedToNextStage() {
    //console.log('proceedToNextStage');
    this.processing = true;
    this.sOCRService.proceedToNextStage(this.requestId).subscribe({
        next: (res: any) => {
          this.processing = false;
          if (res.status === 'success' && res.result) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: "Item successfully moved to next stage.",
            });
            this.processing = false;
            this.handleNextStage(res.result);
          }
          else {
            return;
          }
        },
        error: (err: any) => {
          this.processing = false;
          // Handle error appropriately
        }
      });
  }

  handleNextStage(result: any) {
    //console.log('handleNextStage', result);
    this.invoiceData = result;
    if (this.invoiceData.stage !== 'New' && this.invoiceData.stage !== 'PageSeperation') {
      this.selectedTab = 'Fields';
      this.getSOCRResponse();
      this.getImage(1, this.ctx);
    } else {
      this.selectedTab = 'Attachment';
      this.commonService.downloadFile(this.invoiceData.attachment.systemId, this.invoiceData.attachment.documentId)
        .subscribe({
          next: (res: any) => {
            this.imgUrl = res.status;
          },
          error: (err: any) => {
            // Handle error appropriately
          }
        });
    }
  }

  getSOCRResponse() {
    this.sOCRService.getSOCRResponse(this.ocrId).subscribe({
      next: (res: any) => {
        //console.log(res);
        this.ocrData = res.result;

        this.businessRules = [];
        if(res && res.result && res.result.signaturesAndStamps) {
          Object.keys(res.result.signaturesAndStamps).forEach((key: any) => {
            this.businessRules.push({rule: key != 'Stamp and Physical Signature' ? key : `${key} (On First Page)`, status: res.result.signaturesAndStamps[key] ? res.result.signaturesAndStamps[key].status : 'FAILED'})
          });
        }

        if(this.ocrData) {
          //this.getLineItemsDetails();
          this.displaySOCRResponse();
        }
      },
      error: (err: any) => {
      }
    })
  }

  private getChannelByid() {
    this.ocrProjectService.getByIdOcrProfile(this.invoiceData.projectId).subscribe({
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

  displaySOCRResponse() {
    this.fixedfields = this.ocrData.headerFields;
    this.updateSocrResponseHeaderFields();
    if(this.mdiResponse.documents){
      this.docType = this.mdiResponse.documents[0].docType;
      this.docType = this.docType.charAt(0).toUpperCase() + this.docType.slice(1).toLowerCase();
    }
    //console.log(this.docType)
    let fieldsTempArr: any[] = this.fixedfields.map((item: any) => item.name);
    //console.log(fieldsTempArr);
    this.fieldsArr = [];
    this.lineArr = [];
    let i = 0;
    let k = 0;
    this.totalLength = 0;

    for (let prop of fieldsTempArr) {
      let index = this.fixedfields.findIndex((item: any) => item.name === prop);
      this.fixedfields[index]['groupType'] = null;
      // if(this.fixedfields[index]["type"] == "Date") {
      //   this.fixedfields[index]["value"] = this.fixedfields[index]["value"] ? new Date(this.fixedfields[index]["value"]) : null;
      // }
       if(this.fixedfields[index]["type"] == "List" || this.fixedfields[index]["type"] == "Checkbox") {
        let channelFieldData = this.channelData.headerMappings.find((hm: any) => hm.dataField == this.fixedfields[index]["name"]);
        if(channelFieldData) {
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

    let vendor = this.fieldsArr[0];
    if(vendor.data) {
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
    }

    for (let index = 0; index < this.ocrData.customFields.length; index++) {
      const element = this.ocrData.customFields[index];
      if(element.name == "Round Off") {
        let indexx = this.fieldsArr.findIndex((item: any) => item.groupType === "Invoice");
        this.fieldsArr[indexx].data.push(element);
      } else {
        this.fieldsArr.push(element);
      }
    }

    this.fieldsArr.map((elem:any)=> {
      if(elem.valueList?.length){
        elem.valueList = elem.valueList.map((item:any)=>({amount:item}))
      }
      return elem;
    })

    if(this.fieldsArr?.length){
      console.log("eter",this.channelData)
      if(this.channelData?.headerMappings?.length){
        this.fieldsArr.forEach((fieldGroup:any)=>{
          let headerMappingsObj = this.channelData?.headerMappings.find((headerMapping:any)=>headerMapping.dataField == fieldGroup.name);
          if(fieldGroup.groupType && fieldGroup.data?.length){
            fieldGroup.data.forEach((fieldItem:any)=>{
              let itemObj = this.channelData?.headerMappings.find((headerMapping:any)=>headerMapping.dataField == fieldItem.name);
               if(itemObj){
                fieldItem.mandatoryField = itemObj.mandatoryField;
                fieldItem.value = (typeof fieldItem.value === 'string' && fieldItem.value.trim() === '') ? '' : fieldItem.value;
               }
            });
          }
          else{
            if(headerMappingsObj){
              fieldGroup.mandatoryField = headerMappingsObj.mandatoryField;
                fieldGroup.value = (typeof fieldGroup.value === 'string' && fieldGroup.value.trim() === '') ? '' : fieldGroup.value;
            }
          }
        });
      }
    }    console.log("35366",this.fieldsArr);

    if(this.fieldsArr.length){
      this.fieldsArr.forEach((fieldGroup:any)=>{
         if (fieldGroup?.name === "Barcode") {
            if(fieldGroup?.valueList?.length){
                const valueList = fieldGroup.valueList.map((elem:any)=>elem.amount);

                let index = this.fieldsArr.findIndex((f:any) => f.name == "Barcodes");
                if(valueList?.length){
                  this.fieldsArr[index].value = valueList.join(",")
                }   
            }
            
        }
      })
    }
    console.log("35366",this.fieldsArr);
    // console.log(this.fieldsArr);

  }

  updateSocrResponseHeaderFields(){
    const headerMappings = this.channelData?.headerMappings;
    console.log(headerMappings)
    if (!headerMappings) {
      return;
    }
    this.fixedfields.forEach((field: any) => {
      const match = headerMappings.find((mapping: any) => mapping.dataField === field.name);
      if (match) {
        if(match.ocrField !== undefined && match.ocrField != null){
          field.ocrFieldCheck = match.ocrField;
        }
        if(match.disableFields !== undefined && match.disableFields != null){
          field.disableCheck = match.disableFields;
        }
      }
    }
  );
}

  onPaginateChange(event: any) {
    //console.log(event);
    if (!this.orgPageEvent) {
      this.orgPageEvent = event;
      this.page = this.page + 1;
      this.pageInd++;
    } else {
      if (this.orgPageEvent.pageIndex <= event.pageIndex) {
        this.page = this.page + 1;
        this.pageInd++;
      } else {
        this.page = this.page - 1;
        this.pageInd--;
      }
      this.orgPageEvent = event;
    }
  }

  onCanvasPaginateChange(event: any) {
    //console.log(event);
    if (!this.orgCanvasPageEvent) {
      this.orgCanvasPageEvent = event;
      this.canvasPage = this.canvasPage + 1;
      this.canvasPageInd++;
    } else {
      if (this.orgCanvasPageEvent.pageIndex < event.pageIndex) {
        this.canvasPage = this.canvasPage + 1;
        this.canvasPageInd++;
      } else {
        this.canvasPage = this.canvasPage - 1;
        this.canvasPageInd--;
      }
      this.orgCanvasPageEvent = event;

      //this.getLineItemsDetails();
    }
  }

  getImage(pageNumber: number, ctx: CanvasRenderingContext2D) {
    return this.http.get(`${this._apiUrl}formRecognizer/showImage/${this.invoiceData.taxId}/${pageNumber}`, { responseType: 'blob' }).subscribe((response: Blob) => {
      this.imgResponse = response;
      this.drawImage(this.imgResponse, ctx, this.scale);
    });
  }

  drawImage(response: Blob, ctx: CanvasRenderingContext2D, scale: number) {
    var canvas = this.documentCanvas.nativeElement;
    let image = new Image();
    image.src = URL.createObjectURL(response);
    let width = this.canvasContainer.nativeElement.offsetWidth * scale;

    canvas.width = scale === 1 ? width : canvas.width;
    //console.log(canvas.width, " ", canvas.height);

    let canvasStyle: any = canvas.getAttribute("style");
    let index = canvasStyle.indexOf("width");
    if(index > -1) {
      canvasStyle = canvasStyle.substring(0, index);
    }
    canvasStyle += `width: ${canvas.width}px; height: ${canvas.height}px;`;
    this.documentCanvas.nativeElement.setAttribute("style", canvasStyle.toString());

    let boundingBoxesToBeDrawn: any[] = [];
    let height: number;
    let page: any;
    let xScale: number;
    let yScale: number;

    if(this.storedBoundingBoxes && this.storedBoundingBoxes.length > 0) {
      boundingBoxesToBeDrawn = this.storedBoundingBoxes;
      height = this.documentCanvas.nativeElement.height * this.scale;
      page = this.mdiResponse.pages.find((p: any) => p.pageNumber == this.currentPage);
      xScale = width / page.width;
      yScale = height / page.height;
    }

    image.onload = function () {
      ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);

      if(boundingBoxesToBeDrawn && boundingBoxesToBeDrawn.length > 0) {
        boundingBoxesToBeDrawn.forEach((element:any) => {
          let polygon = element;
          ctx.strokeStyle = 'blue';
          ctx.lineWidth = 2;
          ctx.strokeRect(polygon.x, polygon.y, polygon.width, polygon.height);
          ctx.fillStyle = "red";
          ctx.font = "16px Arial";
          ctx.fillText("✖", polygon.x + polygon.width, polygon.y + 5);
        });
      }
    }

    ctx.restore();

    this.canvas.addEventListener("click", (e: any) => {
      //console.log(e, e.offsetX, e.offsetY, e.clientX, e.clientY, this.boundingBox);
      //console.log(e.offsetX - (this.boundingBox.x + this.boundingBox.width));
      //console.log(this.boundingBox.y - e.offsetY);
      if(this.boundingBox &&
         (e.offsetX - (this.boundingBox.x + this.boundingBox.width) < 10 && e.offsetX - (this.boundingBox.x + this.boundingBox.width) > -10)
          && (this.boundingBox.y - e.offsetY < 5 && this.boundingBox.y - e.offsetY > -5)) {
        this.clearFieldValue(this.boundingBox);
        this.clearBoundingBox(canvas, this.boundingBox);
      } else if(this.storedBoundingBoxes && this.storedBoundingBoxes.length > 0) {
        for (const element of this.storedBoundingBoxes) {
          //console.log(element);
          if((e.offsetX - (element.x + element.width) < 10 && e.offsetX - (element.x + element.width) > -10)
             && (element.y - e.offsetY < 5 && element.y - e.offsetY > -5)) {
           this.clearFieldValue(element);
           this.clearBoundingBox(canvas, element);
           break;
         }
        }
      }
    });
  }

  clearBoundingBox(canvas:any, boundingBox: any) {
    let index = this.storedBoundingBoxes.findIndex((b: any) => b.x == boundingBox.x);
    this.storedBoundingBoxes.splice(index, 1);
    this.boundingBox = null;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawImage(this.imgResponse, this.ctx, this.scale);
    this.canvasContainer.nativeElement.scrollTo(0, 0);
  }

  clearFieldValue(boundingBox: any) {
    let width = this.canvasContainer.nativeElement.offsetWidth * this.scale;
    let height = this.documentCanvas.nativeElement.height * this.scale;
    let page = this.mdiResponse.pages.find((p: any) => p.pageNumber == this.currentPage);
    let xScale = width / page.width;
    let yScale = height / page.height;

    let fields = this.mdiResponse.documents[0].fields;
    let fieldsTempArr: any[] = Object.keys(fields);

    for (let prop of fieldsTempArr) {
      if (fields[prop] && fields[prop]['type'] == "array") {
      } else if (fields[prop] && fields[prop]['type'] != "array") {
        if(fields[prop]['boundingRegions']) {
          let polygon = fields[prop]['boundingRegions'][0].polygon;
          if(boundingBox.x == polygon[0].x * xScale
            && boundingBox.y == polygon[0].y * yScale
            && boundingBox.width == (polygon[1].x - polygon[0].x) * xScale
            && boundingBox.height == (polygon[2].y - polygon[0].y) * yScale
          ) {
            this.removeSOCRHeaderField(prop);
            break;
          }
        }
      }
    }
  }

  removeSOCRHeaderField (field: string) {
    for (let i = 0; i < this.fieldsArr.length; i++) {
      const element = this.fieldsArr[i];
      if(element.groupType === 'Vendor' || element.groupType === 'Invoice') {
        for (let j = 0; j < element.data.length; j++) {
          const ele = element.data[j];
          let index = this.ocrData.headerFields.findIndex((item: any) => item.name === ele.name);
          if(ele.name == field) {
            ele.value = "";
            if(index > -1) {
              this.ocrData.headerFields[index].value = ele.value;
            }
          }
        }
      } else {
        let index = this.ocrData.headerFields.findIndex((item: any) => item.name === element.name);
        if(element.name == field) {
          element.value = "";
          if(index > -1) {
            this.ocrData.headerFields[index].value = element.value;
          }
        }
      }
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
    this.sOCRService.downloadXML(this.invoiceData.taxId).subscribe({
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
        data: this.invoiceData.requestId,
      })
      .afterClosed();
  }

  zoomIn() {
    this.scale = this.scale * 1.1;
    const { width, height } = this.ctx.canvas;
    this.ctx?.scale(this.scale, this.scale);
    this.ctx.clearRect(0, 0, width, height);

    this.ctx.canvas.height = this.ctx.canvas.height * this.scale;
    this.ctx.canvas.width = this.ctx.canvas.width * this.scale;

    let canvasStyle: any = this.documentCanvas.nativeElement.getAttribute("style");
    let index = canvasStyle.indexOf("width");
    if(index > -1) {
      canvasStyle = canvasStyle.substring(0, index);
    }
    canvasStyle += `width: ${this.ctx.canvas.width}px; height: ${this.ctx.canvas.height}px;`;
    this.documentCanvas.nativeElement.setAttribute("style", canvasStyle.toString());

    this.drawImage(this.imgResponse, this.ctx, this.scale);
  }

  zoomOut() {
    this.scale = this.scale / 1.1;
    if(this.scale < 1) {
      this.scale = 1;
    }
    const { width, height } = this.ctx.canvas;
    this.ctx?.scale(this.scale, this.scale);
    this.ctx.clearRect(0, 0, width, height);

    this.ctx.canvas.height = this.ctx.canvas.height / this.scale;
    this.ctx.canvas.width = this.ctx.canvas.width / this.scale;

    let canvasStyle: any = this.documentCanvas.nativeElement.getAttribute("style");
    let index = canvasStyle.indexOf("width");
    if(index > -1) {
      canvasStyle = canvasStyle.substring(0, index);
    }
    canvasStyle += `width: ${this.ctx.canvas.width}px; height: ${this.ctx.canvas.height}px;`;
    this.documentCanvas.nativeElement.setAttribute("style", canvasStyle.toString());

    this.drawImage(this.imgResponse, this.ctx, this.scale);
  }

  previousPage() {
    this.currentPage--;
    this.pageInd = 0;
    this.contentTotalLength = 0;
    this.page = 1;
    this.getImage(this.currentPage, this.ctx);
    this.getTableContent(this.mdiResponse.tables);
  }

  nextPage() {
    this.currentPage++;
    this.pageInd = 0;
    this.contentTotalLength = 0;
    this.page = 1;
    this.getImage(this.currentPage, this.ctx);
    this.getTableContent(this.mdiResponse.tables);
  }

  onSaveVerification(){
    if(this.ocrData.headerFields?.length){
      this.ocrData.headerFields = this.ocrData.headerFields.map((headerItem: any) => {
         if(headerItem?.valueList != null && headerItem?.valueList != undefined){
           if(headerItem.name == 'PurchaseOrder' || headerItem.name == 'Barcode' && headerItem.valueList?.length){
            console.log(headerItem)
            headerItem.valueList = headerItem.valueList?.map((value: any) => value?.amount);
          }
        }
       return headerItem;
      });
    }
    this.isWait = true;
    this.updateSOCRHeaderFields();
     if(this.ocrData?.headerFields?.length){
      this.ocrData?.headerFields?.forEach((headerItem:any)=>{
        if(headerItem?.type === 'Checkbox'){
         if(headerItem?.value === null){
          headerItem.value = false;
         }
        }
      })
    }
    this.sOCRService.updateHeaderAndLineItemofVerification(this.ocrData, this.requestId).subscribe({
      next:(res:any)=>{
        this.isWait = false;
        this.router.navigateByUrl(`/socr-ocr-q?stage=Verification`)
      }, error:(error)=>{
        this.isWait = false;
      }
    })
  }

  onSaveVerificationProcess(){
    if(this.ocrData.headerFields?.length){
      this.ocrData.headerFields = this.ocrData.headerFields.map((headerItem: any) => {
        if(headerItem?.valueList != null && headerItem?.valueList != undefined){
          if(headerItem.name == 'PurchaseOrder' || headerItem.name == 'Barcode' && headerItem.valueList?.length){
              console.log(headerItem)
              headerItem.valueList = headerItem.valueList?.map((value: any) => value?.amount);
          }
        }
       return headerItem;
      });
    }
    this.isWait2 = true;
    this.updateSOCRHeaderFields();
    this.sOCRService.updateHeaderAndLineItemofVerificationProcess(this.ocrData, this.requestId).subscribe({
       next:(res:any)=>{
        this.isWait2 = false;
        this.getInvoice();
        console.log(res);
        if(res){
           this.router.navigateByUrl(`/socr-ocr-q/details-c/${res}`)
        }
        else{
          this.router.navigateByUrl(`/socr-ocr-q?stage=Verification`)
        }
      }, error:(error)=>{
        this.isWait2 = false;
      }
    })
  }

  updateSOCRHeaderFields () {
    const deepCopy = JSON.parse(JSON.stringify(this.fieldsArr));
    for (let i = 0;  i < deepCopy.length; i++) {
      const element = deepCopy[i];
      if(element.groupType === 'Vendor' || element.groupType === 'Invoice') {
        for (let j = 0; j < element.data.length; j++) {
          const ele = element.data[j];
          let index = this.ocrData.headerFields.findIndex((item: any) => item.name === ele.name);
          if(index > -1) {
            this.ocrData.headerFields[index].value = ele.value;
          }
        }
      } 
      else {
        if(element.name != "InvoiceId"){
         let index = this.ocrData.headerFields.findIndex((item: any) => item.name === element.name);
          if(index > -1) {
            this.ocrData.headerFields[index].value = element.value;
          }
        }
     }
    }
  }

  getMDIResponse() {
    this.sOCRService.getMDIResponse(this.invoiceData.requestId).subscribe({
      next: (res: any) => {
        this.mdiResponse = res.result;
        console.log(this.mdiResponse);
        if(this.mdiResponse && this.mdiResponse.tables) {
          this.getTableContent(this.mdiResponse.tables);
        }

        if (this.invoiceData.stage != 'New' && this.invoiceData.stage != 'PageSeperation') {
          this.selectedTab = 'Fields';
          this.getImage(this.currentPage, this.ctx);
          this.getSOCRResponse();
        }
      },
      error: (err: any) => {
      }
    })
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
      do {
        for (let j = 0; j < table.cells.length; j++) {
          if(table.cells[j].rowIndex === i) {
            rowData.push(table.cells[j].content);
          } else {
            tblData.push(rowData);
            rowData = [];
            rowData.push(table.cells[j].content);
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

  focusBoundingBox(key: string) {
    if(this.invoiceData.stage === 'Verification' && this.mdiResponse.pages) {
      let width = this.canvasContainer.nativeElement.offsetWidth * this.scale;
      let height = this.documentCanvas.nativeElement.height * this.scale;
      const page = this.mdiResponse.pages.find((p: any) => p.pageNumber == this.currentPage);
      const xScale = width / page.width;
      const yScale = height / page.height;

      if (!this.mdiResponse.documents[0].fields[key]) return;
      else if (!this.mdiResponse.documents[0].fields[key].boundingRegions || this.mdiResponse.documents[0].fields[key].boundingRegions[0].pageNumber !== this.currentPage) return;

      let polygon = this.mdiResponse.documents[0].fields[key].boundingRegions[0].polygon;
      this.drawBoundingBox(polygon, xScale, yScale);
      this.canvasContainer.nativeElement.scrollTo(polygon[0].x * xScale, polygon[0].y * yScale);
      this.ctx.restore();
    }
  }

  unfocusBoundingBox(key: string) {
    if(this.invoiceData.stage === 'Verification' && this.mdiResponse.pages) {
      let width = this.canvasContainer.nativeElement.offsetWidth * this.scale;
      let height = this.documentCanvas.nativeElement.height * this.scale;
      const page = this.mdiResponse.pages.find((p: any) => p.pageNumber == this.currentPage);
      const xScale = width / page.width;
      const yScale = height / page.height;

      let polygon;
      if (!this.mdiResponse.documents[0].fields[key]) return;
      else if (!this.mdiResponse.documents[0].fields[key].boundingRegions || this.mdiResponse.documents[0].fields[key].boundingRegions[0].pageNumber !== this.currentPage) return;

      polygon = this.mdiResponse.documents[0].fields[key].boundingRegions[0].polygon;
      this.ctx.strokeStyle = 'rgba(255,255,255)';
      //this.ctx.lineWidth = 2;
      this.ctx.strokeRect(polygon[0].x * xScale, polygon[0].y * yScale, (polygon[1].x - polygon[0].x) * xScale, (polygon[2].y - polygon[0].y) * yScale);
      this.ctx.restore();
    }
  }

  drawBoundingBox(coordinates: any, xScale: number, yScale: number) {
    let polygon = coordinates;
    this.ctx.strokeStyle = 'blue';
    this.ctx.lineWidth = 2;
    if(polygon[0]) {
      this.ctx.strokeRect(polygon[0].x * xScale, polygon[0].y * yScale, (polygon[1].x - polygon[0].x) * xScale, (polygon[2].y - polygon[0].y) * yScale);
      this.drawCrossIcon((polygon[0].x * xScale) + ((polygon[1].x - polygon[0].x) * xScale), (polygon[0].y * yScale) + 5);
      this.boundingBox = {x: polygon[0].x * xScale, y: polygon[0].y * yScale, width: (polygon[1].x - polygon[0].x) * xScale, height: (polygon[2].y - polygon[0].y) * yScale};
      if(!this.storedBoundingBoxes) this.storedBoundingBoxes = [];
      this.storedBoundingBoxes.push(this.boundingBox);
    } else if(polygon.x) {
      this.ctx.strokeRect(polygon.x, polygon.y, polygon.width, polygon.height);
      this.drawCrossIcon(polygon.x + polygon.width, polygon.y + 5);
    }

    //console.log(this.storedBoundingBoxes);
  }

  drawCrossIcon(x: number, y: number) {
    this.ctx.fillStyle = "red";
    this.ctx.font = "16px Arial";
    this.ctx.fillText("✖", x, y);
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

      this.fieldsArr[index].valueList.push({amount:''});    }
  }

  addGRN() {
    let index = this.fieldsArr.findIndex((f:any) => f.name == "Barcode");
    if(index > -1) {
      if(!this.fieldsArr[index].valueList)
        this.fieldsArr[index].valueList = [];

      this.fieldsArr[index].valueList.push({amount:''});
    }
  }

  // deleteOrderNumber(index: number) {
  //   let indexx = this.fieldsArr.findIndex((f:any) => f.name == "PurchaseOrder");
  //   this.fieldsArr[indexx].valueList.splice(index, 1);
  // }

  // deleteGRN(index: number) {
  //   let indexx = this.fieldsArr.findIndex((f:any) => f.name == "Barcode");
  //   this.fieldsArr[indexx].valueList.splice(index, 1);
  // }

  deleteOrderNumber(index: number) {
    let indexx = this.fieldsArr.findIndex((f:any) => f.name == "PurchaseOrder");
    let index2 = this.fieldsArr.findIndex((f:any) => f.name == "PurchaseOrders");
    if (indexx === -1) return; 
    if (!this.fieldsArr[indexx]?.valueList?.length) return;
    if (index >= 0 && index < this.fieldsArr[indexx].valueList.length) {
     this.fieldsArr[indexx].valueList.splice(index, 1);
    }
    // this.fieldsArr[indexx].valueList.splice(index, 1);
    let valueList = this.fieldsArr[indexx].valueList.map((elem:any)=>elem.amount)
    if(index2 !== -1){
        this.fieldsArr[index2].value = valueList.join(",")
    }
  }

  deleteGRN(index: number) {
    let indexx = this.fieldsArr.findIndex((f:any) => f.name == "Barcode");
    let index2 = this.fieldsArr.findIndex((f:any) => f.name == "Barcodes");
    if (indexx === -1) return; 
    if (!this.fieldsArr[indexx]?.valueList?.length) return;
    if (index >= 0 && index < this.fieldsArr[indexx].valueList.length) {
     this.fieldsArr[indexx].valueList.splice(index, 1);
    }
    // this.fieldsArr[indexx].valueList.splice(index, 1);
    let valueList = this.fieldsArr[indexx].valueList.map((elem:any)=>elem.amount)
    if(index2 !== -1){
      this.fieldsArr[index2].value = valueList.join(",")
    }  
  }

  onDateRangeSelected() {
    //throw new Error('Method not implemented.');
  }

  openVendorPopUp() {
    this.addVendorModal.templateRef = this.addVendorView;
    this.addVendorModal.show();
  }

 onSelectVendor (val:any){
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
              if(item.name === 'VendorAddressRecipient'){
                item.value = val.name;
              }
              if(item.name === 'VendorName'){
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

  reprocessInvoice() {
    this.isWaiting= true;
    this.sOCRService.reProcessInvoice(this.requestId).subscribe({
      next: (value: any) => {
        if(value && value.result) {
          //console.log(value);
          this.isWaiting = false;

          this.ocrData = value.result;
          this.displaySOCRResponse();

          this.businessRules = [];
          if(this.ocrData.signaturesAndStamps) {
            Object.keys(this.ocrData.signaturesAndStamps).forEach((key: any) => {
              this.businessRules.push({rule: key != 'Stamp and Physical Signature' ? key : `${key} (On First Page)`, status: this.ocrData.signaturesAndStamps[key] ? this.ocrData.signaturesAndStamps[key].status : 'FAILED'})
            });
          }

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: "Invoice re-processed successfully."
          });
        } else {
          this.isWaiting = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: "Failed to re-process invoice."
          });
        }
      }, error: (err: any) => {
        this.isWaiting = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "Some error occurred."
        });
        //console.log(err);
      },
    })
  }

  openPOPopUp() {
    this.addPOModal.templateRef = this.addPOView;
    this.addPOModal.show();
  }

  onSelectPO(val:any){
    console.log(val)
    this.addPOModal.hide();
        if(this.fieldsArr?.length){
      this.fieldsArr.forEach((elem:any) => {
        if(elem.name === 'PurchaseOrder'){
          console.log(elem)
          elem.value=val.purchaseOrderNumber
        }
      });
    }
  }

  checkRules(){
    if(this.ocrData.headerFields?.length){
      this.ocrData.headerFields = this.ocrData.headerFields.map((headerItem: any) => {
        if(headerItem.name == 'PurchaseOrder' || headerItem.name == 'Barcode' && headerItem.valueList?.length){
          console.log(headerItem)
          headerItem.valueList = headerItem.valueList?.map((value: any) => value?.amount);

       }
       return headerItem;
      });
    }
    this.isWait3 = true;
    this.updateSOCRHeaderFields();
    this.sOCRService.checkRules(this.ocrData, this.requestId).subscribe({
      next:(res:any)=>{
        this.isWait3 = false;
        this.getInvoice();
      }, error:(error)=>{
        this.isWait3 = false;
      }
    })
  }

  onChangeCheckBox(event: any, option: any){
    console.log(event.target.checked);
    console.log(option);
    option.value = event.target.checked;
  }
  

  ngOnDestroy() { }


  hasGRN(){
    return this.fieldsArr.some((field: any) => field.name === 'Barcode' && field.ocrFieldCheck);
  }

  onAddingPOList(event:any){
    if(event.target.value){
      let index = this.fieldsArr.findIndex((f:any) => f.name == "PurchaseOrders");
      let index2 = this.fieldsArr.findIndex((f:any) => f.name == "PurchaseOrder");
      if(index > -1) {
        if(index2 > -1){
          let valueList = this.fieldsArr[index2].valueList.map((elem:any)=>elem.amount)
          if(valueList?.length){
            this.fieldsArr[index].value = valueList.join(",")
          }     
        }
      }
    }
  }

  onAddingBarcodeList(event:any){
    if(event.target.value){
      let index = this.fieldsArr.findIndex((f:any) => f.name == "Barcodes");
      let index2 = this.fieldsArr.findIndex((f:any) => f.name == "Barcode");
      if(index > -1) {
        if(index2 > -1){
          let valueList = this.fieldsArr[index2].valueList.map((elem:any)=>elem.amount)
          if(valueList?.length){
            this.fieldsArr[index].value = valueList.join(",")
          }     
        }
      }
    }
  }

}
