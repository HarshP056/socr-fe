import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fabric } from 'fabric';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonService, OCRService } from 'src/app/services';
import * as saveAs from 'file-saver';
import { Location } from "@angular/common";
import { SocrOcrService } from 'src/app/services/socr-ocr.service';

@Component({
  selector: 'app-ocr-details-b',
  templateUrl: './ocr-detail-b.component.html',
  styleUrls: ['./ocr-detail-b.component.scss']
})
export class OcrDetailsBComponent {
  verObj: any = {
    map: {
      // Invoice_Layout$Vendor$VendorName: { value: "", coordinates: [] },
      // Invoice_Layout$Vendor$VendorId: { value: "", coordinates: [] },
      // Invoice_Layout$Vendor$VendorTaxId: { value: "", coordinates: [] },
      // Invoice_Layout$Vendor$VendorAddress: { value: "", coordinates: [] },
      // Invoice_Layout$Vendor$VendorAddressRecipient: { value: "", coordinates: [] },
      // Invoice_Layout$InvoiceId: { value: "", coordinates: [] },
      Invoice_Layout$InvoiceDate: { value: null, coordinates: [] },
      // Invoice_Layout$InvoiceTotal: { value: "", coordinates: [] },
      // Invoice_Layout$Currency: { value: "", coordinates: [] },

      // Invoice_Layout$BillingAddress: { value: "", coordinates: [] },
      // Invoice_Layout$BillingAddressRecipient: { value: "", coordinates: [] },
      // Invoice_Layout$CustomerName: { value: "", coordinates: [] },
      // Invoice_Layout$ShippingAddress: { value: "", coordinates: [] },
      // Invoice_Layout$ShippingAddressRecipient: { value: "", coordinates: [] },
      // Invoice_Layout$SubTotal: { value: "", coordinates: [] },
      // Invoice_Layout$TotalTax: { value: "", coordinates: [] },
      // Invoice_Layout$Items: [
      //   // {Description: {value : null, coordinates: [null]}},
      //   // {Quantity: {value: null, coordinates: [null]}}
      // ],
      // Invoice_Layout$PurchaseOrder: {
      //   childFields: []
      // }
    }
  }

  @ViewChild('documentViewer', { static: false }) documentViewer: ElementRef<HTMLDivElement>;
  @ViewChild('canContainer', { static: false }) canContainer: ElementRef<HTMLCanvasElement>;
  @ViewChild('documentCanvas', { static: false }) documentCanvas: ElementRef<HTMLCanvasElement>;

  public ctx: CanvasRenderingContext2D;
  ocrId: any;
  fixedfields: any;
  dynamicfields: any[] = [];
  urlSafe: string;
  fieldsArr: any[];
  selectedTab: string = 'pre-built Invoice';
  showLineItems: boolean = true;
  canvasList: any[] = [];
  canvas: any;
  tempObservables: any;
  canvOrgHeight: any;
  canvOrgWidth: any;
  tempDocObervables: any;
  documentData: any;
  imgUrl: string = '';
  imageData: string | ArrayBuffer | null = null;
  _apiUrl: string = environment.apiUrl;
  invoiceOCRData: any;
  lineArr: any[] = [];
  vendorId: any;
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
  itemSelected: boolean;
  canvasParentWidth: number;
  invoiceData: any;
  totalPages: any;
  currentPage: number;
  mdiResponse: any;
  lineItemHeaders: any[] = [];
  ocrData: any;
  img: fabric.Image;

  constructor(
    private sOCRService: SocrOcrService,
    private activateRoute: ActivatedRoute,
    private http: HttpClient,
    private commonService: CommonService,
    private location: Location,
    private ocrService: OCRService
  ) { }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: any) => {
      this.ocrId = params.docId;
      if (this.ocrId) {
        this.getInvoice();
      }
    });
  }

  getInvoice() {
    this.sOCRService.getInvoiceByRequestId(this.ocrId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.invoiceData = res.result;
        this.getMDIResponse();
        this.totalPages = this.invoiceData.totalPageNo;
        this.currentPage = 1;
        //this.updateStages();
        if (this.invoiceData.stage != 'New' && this.invoiceData.stage != 'PageSeperation') {
          this.selectedTab = 'Fields';
          this.getImage(this.currentPage);
        } else {
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

  onBack(){
    this.location.back();
  }

  getLineItemsDetails(pageNumber: number) {
    let validLine: boolean = false;
    this.totalLength = 0;
    this.lineArr = [];
    this.lineHeaders = [];
    for (let item of this.lineItems) {
      let j = 0;
      item.valueObjectM = [];
      validLine = false;
      let valueObjectTempArr: any[] = Object.keys(item.valueObject);
      for (let propp of valueObjectTempArr) {
        if (item.valueObject[propp] != null) {
          if(item.valueObject[propp]['boundingRegions'][0].pageNumber === pageNumber) {
            if(this.lineHeaders && this.lineHeaders.length == 0) {
              this.lineHeaders = valueObjectTempArr;
            }
            validLine = true;
            item.valueObjectM.push(item.valueObject[propp]);
            item.valueObjectM[j]['name'] = propp;
          }
          j++;
        }
      }

      if(validLine) {
        this.lineArr.push(item);
        this.totalLength++;
      }

    }
    console.log(this.lineArr);
  }

  // getOCR() {
  //   let pageNum = 1;

  //   //  generating CanvasElement
  //   this.canvasList?.push({
  //     id: 'canvas0'
  //   })

  //   setTimeout(() => {

  //     // integrating created Canvases with fabric canvas

  //     let canvas: any = new fabric.Canvas('canvas0', {
  //       allowTouchScrolling: true,
  //     });

  //     if (!this.canvas) {
  //       this.canvas = canvas
  //     }

  //     //set CanvasId
  //     canvas.set('id', 'canvas-0');
  //     this.canvasList[0].canvasElem = canvas;

  //     this.tempObservables?.push(this.ocrService.getForm(this.ocrId));
  //     //this.tempDocObervables?.push(this.restApiService.getDocumentText(this.batchId, this.documentId, this.projectId , pageNum))

  //     //setting up api calls to get images
  //     forkJoin(this.tempObservables)?.subscribe((res: any) => {
  //       res?.forEach((item: any, i: any) => {
  //         var img;
  //         var reader: any = new FileReader();
  //         reader.readAsDataURL(res[i]);
  //         reader.onloadend = () => {
  //           console.log(reader.result.toString(), i, 'readerrrr');
  //           img = fabric.Image.fromURL(reader.result.toString(), (oImg) => {
  //             if (!this.canvOrgHeight) {
  //               this.canvOrgHeight = oImg?.height
  //               console.log(this.canvOrgHeight, 'heightt');
  //             }

  //             if (!this.canvOrgWidth) {
  //               this.canvOrgWidth = oImg?.width
  //               console.log(this.canvOrgWidth, 'widthhh');
  //             }

  //             this.canvasList[i]?.canvasElem?.setHeight(oImg?.height);
  //             this.canvasList[i]?.canvasElem?.setWidth(oImg?.width);
  //             this.canvasList[i]?.canvasElem?.setBackgroundImage(oImg);

  //             this.canvasList[i].canvasElemOrgHeight = oImg?.height
  //             this.canvasList[i].canvasElemOrgWidth = oImg?.width

  //             this.canvasList[i]?.canvasElem?.requestRenderAll();

  //             // this.canvasList[i]?.canvasElem?.on('mouse:move', (e) => {
  //             //   this.f_move(e)
  //             // });

  //             // this.canvasList[i]?.canvasElem?.on('mouse:down', (e) => {
  //             //   this.f_mDown(e)
  //             // });

  //             // this.canvasList[i]?.canvasElem?.on('mouse:over', (e) => {
  //             //   this.f_mOver(e)
  //             // });

  //             // this.canvasList[i]?.canvasElem?.on('mouse:out', (e) => {
  //             //   this.f_mOut(e)
  //             // });

  //             // this.canvasList[i]?.canvasElem?.on('mouse:up', (e) => {
  //             //   this.f_mUp(e)
  //             // });

  //             // this.canvasList[i]?.canvasElem?.on('selection:updated', (e) => {
  //             //   this.handelSelection(e)
  //             // });

  //             // this.canvasList[i]?.canvasElem?.on('selection:created', (e) => {
  //             //   this.handelSelection(e)
  //             // });

  //             // this.canvasList[i]?.canvasElem?.on({
  //             //   'selection:updated': ()=>{this.handelSelection} ,
  //             //   'selection:created':  ()=>{this.handelSelection}
  //             // });

  //             // this.canvasList[i]?.canvasElem?.on('selection:cleared', (e) => {
  //             //   this.handelSelectionCleared(e)
  //             // });

  //           },
  //             {
  //               selectable: false,
  //               evented: false,
  //             });
  //         }
  //       })

  //       // forkJoin(this.tempDocObervables)?.subscribe((res: any) => {
  //       //   res?.forEach((item: any, i: any) => {
  //       //     if (!this.documentData) {
  //       //       this.documentData = item;
  //       //     }

  //       //     this.canvasList[i].documentCoords = item
  //       //     this.canvasList[i].pageId = i += 2
  //       //     console.log(this.documentData, 'docDataaa')
  //       //   })

  //       //   this.getProcessedDocument();
  //       // })
  //     })


  //   }, 100);
  // }

  setActiveTab(tab: string) {
    this.selectedTab = tab;
  }

  showLineItemData() {
    this.showLineItems = !this.showLineItems;
  }

  getImage(pageNumber: number) {
    return this.http.get(`${this._apiUrl}formRecognizer/showImage/${this.invoiceData.taxId}/${pageNumber}`, { responseType: 'blob' }).subscribe((response: Blob) => {
      this.readBlobAsDataURL(response, pageNumber);
      // if(pageNumber < this.pageCount) {
      //   this.getImage(pageNumber + 1);
      // } else {
      //   this.displayImg = true;
      // }

      this.displayImg = true;
    });
  }

  readBlobAsDataURL(blob: Blob, pageNumber: number) {
    this.canvasParentWidth = this.canContainer.nativeElement.offsetWidth;

    this.canvasList?.push({
      id: 'canvas0'
    })

    setTimeout(() => {
      let canvas: any = new fabric.Canvas(`canvas0`, {
        allowTouchScrolling: true,
        selection: false,
        preserveObjectStacking: true,
        width: this.canContainer.nativeElement.offsetWidth,
        height: this.canContainer.nativeElement.offsetHeight
      });

      if (!this.canvas) {
        this.canvas = canvas
      }

      canvas.set('id', `canvas-0`);
      this.canvasList[0].canvasElem = canvas;

      let width = this.documentCanvas.nativeElement.width;
      let height = this.documentCanvas.nativeElement.height;

      console.log(width, 'width', height, 'height');

      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        this.imageData = reader.result as string;
        fabric.Image.fromURL(this.imageData, (oImg) => {
          this.img = oImg;
          if (!this.canvOrgHeight) {
            this.canvOrgHeight = oImg?.height
            console.log(this.canvOrgHeight, 'heightt');
          }

          if (!this.canvOrgWidth) {
            this.canvOrgWidth = oImg?.width
            console.log(this.canvOrgWidth, 'widthhh');
          }

          //console.log(this.canContainer.nativeElement.offsetHeight, 'heightt', this.canContainer.nativeElement.offsetWidth, 'widthh')

          oImg.scaleToHeight(this.canContainer.nativeElement.offsetHeight, true);
          //console.log(oImg, 'oImg');

          this.canvasList[0]?.canvasElem?.setBackgroundImage(oImg);
          oImg.centerH();
          this.canvasList[0]?.canvasElem?.requestRenderAll();

          const page = this.mdiResponse.pages.find((p: any) => p.pageNumber == pageNumber);

          const xScale = width / page.width;
          const yScale = height / page.height;

          let keys = Object.keys(this.mdiResponse.documents[0].fields);

          keys.forEach((key:string) => {
            if(!this.mdiResponse.documents[0].fields[key] || !this.mdiResponse.documents[0].fields[key].boundingRegions || this.mdiResponse.documents[0].fields[key].boundingRegions[0].pageNumber !== pageNumber) return;

            const polygon = this.mdiResponse.documents[0].fields[key].boundingRegions[0].polygon;

            var rect = new fabric.Rect({
              left: polygon[0].x ,
              top: polygon[0].y,
              width: polygon[1].x,
              height: polygon[1].y,
              fill: '',
              angle: 20,
              padding: 10
            });
            this.canvasList[0]?.canvasElem?.add(rect);
          });

          canvas.on('after:render', function() {
            canvas.contextContainer.strokeStyle = '#555';

            canvas.forEachObject(function(obj:any) {
              console.log(obj, 'obj');
              var bound = obj.getBoundingRect();

              canvas.contextContainer.strokeRect(
                bound.left + 0.5,
                bound.top + 0.5,
                bound.width,
                bound.height
              );
            })
          });

          // this.canvasList[0]?.canvasElem?.setZoom(1);

          this.canvasList[0]?.canvasElem?.on('mouse:move', (e: any) => {
            //this.f_move(e)
          });

          this.canvasList[0]?.canvasElem?.on('mouse:down', (e: any) => {
            //this.f_mDown(e)
          });

          this.canvasList[0]?.canvasElem?.on('mouse:over', (e: any) => {
            this.f_mOver(e)
          });

          this.canvasList[0]?.canvasElem?.on('mouse:out', (e: any) => {
            this.f_mOut(e)
          });

          this.canvasList[0]?.canvasElem?.on('mouse:up', (e: any) => {
            //this.f_mUp(e)
          });

          // this.canvasList[0]?.canvasElem?.on('selection:updated', (e: any) => {
          //   this.handelSelection(e)
          // });

          // this.canvasList[0]?.canvasElem?.on('selection:created', (e: any) => {
          //   this.handelSelection(e)
          // });

          // this.canvasList[i]?.canvasElem?.on({
          //   'selection:updated': ()=>{this.handelSelection} ,
          //   'selection:created':  ()=>{this.handelSelection}
          // });

          // this.canvasList[0]?.canvasElem?.on('selection:cleared', (e: any) => {
          //   this.handelSelectionCleared(e)
          // });

          //this.getProcessedDocument(canvas);
        },
        {
          selectable: false,
          evented: false,
        });
      };
    }, 100);
  }

  f_mOver(event: any) {
  }

  f_mOut(event: any) {
  }

  handelSelection(event: any)
  {
    this.itemSelected = true
  }

  handelSelectionCleared(event: any)
  {
    this.itemSelected = false
  }

  getProcessedDocument(canvas: any) {
    for (let i = 0; i < this.fieldsArr?.length; i++) {
      // if(this.fieldsArr[i].name === 'Vendor') {
      //   for(let j = 0; j < this.fieldsArr[i].getDocumentChild?.length; j++) {
      //     if(this.fieldsArr[i]?.getDocumentChild[j]?.name === 'Name') {
      //       this.verObj.map.Invoice_Layout$Vendor$Name.value = this.fieldsArr[i]?.getDocumentChild[j]?.value;
      //       this.verObj.map.Invoice_Layout$Vendor$Name.coordinates[0] = this.fieldsArr[i]?.getDocumentChild[j]?.coordinates;
      //       this.verObj.map.Invoice_Layout$Vendor$Name.pageId = this.fieldsArr[i]?.getDocumentChild[j]?.pageId
      //     }
      //     if(this.fieldsArr[i]?.getDocumentChild[j]?.name === 'VendorId') {
      //       this.verObj.map.Invoice_Layout$Vendor$VendorId.value = this.fieldsArr[i]?.getDocumentChild[j]?.value;
      //       this.verObj.map.Invoice_Layout$Vendor$VendorId.coordinates[0] = this.fieldsArr[i]?.getDocumentChild[j]?.coordinates;
      //       this.verObj.map.Invoice_Layout$Vendor$VendorId.pageId = this.fieldsArr[i]?.getDocumentChild[j]?.pageId
      //     }
      //     if(this.fieldsArr[i]?.getDocumentChild[j]?.name === 'Street') {
      //       this.verObj.map.Invoice_Layout$Vendor$Street.value = this.fieldsArr[i]?.getDocumentChild[j]?.value;
      //       this.verObj.map.Invoice_Layout$Vendor$Street.coordinates[0] = this.fieldsArr[i]?.getDocumentChild[j]?.coordinates;
      //       this.verObj.map.Invoice_Layout$Vendor$Street.pageId = this.fieldsArr[i]?.getDocumentChild[j]?.pageId
      //     }
      //     if(this.fieldsArr[i]?.getDocumentChild[j]?.name === 'City') {
      //       this.verObj.map.Invoice_Layout$Vendor$City.value = this.fieldsArr[i]?.getDocumentChild[j]?.value;
      //       this.verObj.map.Invoice_Layout$Vendor$City.coordinates[0] = this.fieldsArr[i]?.getDocumentChild[j]?.coordinates;
      //       this.verObj.map.Invoice_Layout$Vendor$City.pageId = this.fieldsArr[i]?.getDocumentChild[j]?.pageId;

      //     }
      //     if(this.fieldsArr[i]?.getDocumentChild[j]?.name === 'State') {
      //       this.verObj.map.Invoice_Layout$Vendor$State.value = this.fieldsArr[i]?.getDocumentChild[j]?.value;
      //       this.verObj.map.Invoice_Layout$Vendor$State.coordinates[0] = this.fieldsArr[i]?.getDocumentChild[j]?.coordinates;
      //       this.verObj.map.Invoice_Layout$Vendor$State.pageId = this.fieldsArr[i]?.getDocumentChild[j]?.pageId;

      //     }
      //     if(this.fieldsArr[i]?.getDocumentChild[j]?.name === 'Zip') {
      //       this.verObj.map.Invoice_Layout$Vendor$Zip.value = this.fieldsArr[i]?.getDocumentChild[j]?.value;
      //       this.verObj.map.Invoice_Layout$Vendor$Zip.coordinates[0] = this.fieldsArr[i]?.getDocumentChild[j]?.coordinates;
      //       this.verObj.map.Invoice_Layout$Vendor$Zip.pageId = this.fieldsArr[i]?.getDocumentChild[j]?.pageId;

      //     }
      //     if(this.fieldsArr[i]?.getDocumentChild[j]?.name === 'Country') {
      //       this.verObj.map.Invoice_Layout$Vendor$Country.value = this.fieldsArr[i]?.getDocumentChild[j]?.value;
      //       this.verObj.map.Invoice_Layout$Vendor$Country.coordinates[0] = this.fieldsArr[i]?.getDocumentChild[j]?.coordinates;
      //       this.verObj.map.Invoice_Layout$Vendor$Country.pageId = this.fieldsArr[i]?.getDocumentChild[j]?.pageId;

      //     }
      //   }
      // }

      // if (this.fieldsArr[i]?.name === 'InvoiceId') {
      //   this.verObj.map.Invoice_Layout$InvoiceId.value = this.fieldsArr[i]?.valueString;
      //   this.verObj.map.Invoice_Layout$InvoiceId.coordinates[0] = this.fieldsArr[i]?.boundingRegions;
      //   this.verObj.map.Invoice_Layout$InvoiceId.pageId = 0;
      // }
      if (this.fieldsArr[i]?.type === 'Invoice') {
        for (let index = 0; index < this.fieldsArr[i].data.length; index++) {
          const element = this.fieldsArr[i].data[index];
          if(element.name === 'InvoiceDate') {
            this.verObj.map.Invoice_Layout$InvoiceDate.value = element.valueString;
            this.verObj.map.Invoice_Layout$InvoiceDate.coordinates[0] = element.boundingRegions[0].polygon;
            this.verObj.map.Invoice_Layout$InvoiceDate.pageId = element.boundingRegions[0].pageNumber;
          }
        }
      }
      // if (this.fieldsArr[i]?.name === 'InvoiceTotal') {
      //   this.verObj.map.Invoice_Layout$InvoiceTotal.value = this.fieldsArr[i]?.valueString;
      //   this.verObj.map.Invoice_Layout$InvoiceTotal.coordinates[0] = this.fieldsArr[i]?.boundingRegions;
      //   this.verObj.map.Invoice_Layout$InvoiceTotal.pageId = 0;
      // }
      // if (this.fieldsArr[i]?.name === 'BillingAddress') {
      //   this.verObj.map.Invoice_Layout$BillingAddress.value = this.fieldsArr[i]?.valueString;
      //   this.verObj.map.Invoice_Layout$BillingAddress.coordinates[0] = this.fieldsArr[i]?.boundingRegions;
      //   this.verObj.map.Invoice_Layout$BillingAddress.pageId = 0;
      // }
      // if (this.fieldsArr[i]?.name === 'BillingAddressRecipient') {
      //   this.verObj.map.Invoice_Layout$BillingAddressRecipient.value = this.fieldsArr[i]?.valueString;
      //   this.verObj.map.Invoice_Layout$BillingAddressRecipient.coordinates[0] = this.fieldsArr[i]?.boundingRegions;
      //   this.verObj.map.Invoice_Layout$BillingAddressRecipient.pageId = 0;
      // }
      // if (this.fieldsArr[i]?.name === 'CustomerName') {
      //   this.verObj.map.Invoice_Layout$CustomerName.value = this.fieldsArr[i]?.valueString;
      //   this.verObj.map.Invoice_Layout$CustomerName.coordinates[0] = this.fieldsArr[i]?.boundingRegions;
      //   this.verObj.map.Invoice_Layout$CustomerName.pageId = 0;
      // }


      // if (this.fieldsArr[i]?.name === 'PurchaseOrder') {
      //   this.verObj.map.Invoice_Layout$PurchaseOrder.childFields = []
      //   this.fieldsArr[i]?.getDocumentChild?.forEach((item: any) => {
      //     this.verObj.map.Invoice_Layout$PurchaseOrder.childFields?.push(
      //       {
      //         coordinates: null,
      //         fieldIdTemplatePath: "1\\53\\1\\9",
      //         fieldNamePath: "Invoice Layout\LineItems[" + this.formattedLineTable.length + "]\\" + item?.value,
      //         id: 1,
      //         name: item?.name,
      //         originalId: [53, 1, 9],
      //         value: item?.value
      //       }
      //     )
      //   })
      // }

      //console.log(this.verObj);
    }

    this.mapInitialSelection(canvas);
  }

  mapInitialSelection(canvas: any) {
    // if (this.verObj.map.Invoice_Layout$InvoiceId.coordinates && !this.verObj.map.Invoice_Layout$InvoiceId?.coordinates?.includes(null) &&
    //   this.verObj.map.Invoice_Layout$InvoiceId.coordinates?.length > 0) {
    //   for (let element of this.verObj.map.Invoice_Layout$InvoiceId.coordinates) {

    //     let rect: any = new fabric.Rect({
    //       left: element[0].polygon[0].x,
    //       top: element[0].polygon[3].y,
    //       originX: 'left',
    //       originY: 'top',
    //       width: (element[0].polygon[1].x - element[0].polygon[0].x) + 6,
    //       height: (element[0].polygon[3].y - element[0].polygon[0].y),
    //       angle: 0,
    //       stroke: '#DCDCDC',
    //       strokeWidth: 1,
    //       fill: 'rgba(205, 209, 228 , 0.5)',
    //       selectable: true,
    //       objectCaching: false,
    //       noScaleCache: false,
    //       strokeUniform: true,
    //     })
    //     rect.id = 'invNo'

    //     //adding object to its respcetive canvas based on pageId
    //     this.addInitialObjecToCanvas(this.verObj.map.Invoice_Layout$InvoiceId?.pageId, rect, 'invNo')

    //     //this.menuItems?.splice(this.menuItems?.indexOf('invNo'), 1)

    //   }
    // }

    if (this.verObj.map.Invoice_Layout$InvoiceDate.coordinates && !this.verObj.map.Invoice_Layout$InvoiceDate?.coordinates?.includes(null) &&
      this.verObj.map.Invoice_Layout$InvoiceDate.coordinates?.length > 0) {
      for (let element of this.verObj.map.Invoice_Layout$InvoiceDate.coordinates) {


        // let rect: any = new fabric.Rect({
        //   left: element[0],
        //   top: element[3],
        //   originX: 'left',
        //   originY: 'top',
        //   width: (element[1] - element[0]) + 6,
        //   height: (element[3] - element[0].y),
        //   angle: 0,
        //   stroke: '#DCDCDC',
        //   strokeWidth: 1,
        //   fill: '',
        //   selectable: true,
        //   objectCaching: false,
        //   noScaleCache: false,
        //   strokeUniform: true,
        // })
        // rect.id = 'invDate'

        var rect = new fabric.Rect({
            left: 100,
            top: 50,
            width: 100,
            height: 100,
            fill: '',
            angle: 20,
            padding: 10
          });
          canvas.add(rect);
          //this.canvasList[0]?.canvasElem?.requestRenderAll();

          canvas.on('after:render', function() {
            canvas.contextContainer.strokeStyle = '#555';

            canvas.forEachObject(function(obj:any) {
              console.log(obj, 'obj');
              var bound = obj.getBoundingRect();

              canvas.contextContainer.strokeRect(
                bound.left + 0.5,
                bound.top + 0.5,
                bound.width,
                bound.height
              );
            })
          });

        //this.addInitialObjecToCanvas(this.verObj.map.Invoice_Layout$InvoiceDate?.pageId, rect, 'invDate')


        //this.menuItems?.splice(this.menuItems?.indexOf('invDate'), 1)

      }
    }

    // if (this.verObj.map.Invoice_Layout$InvoiceTotal.coordinates && !this.verObj.map.Invoice_Layout$InvoiceTotal?.coordinates?.includes(null) &&
    //   this.verObj.map.Invoice_Layout$InvoiceTotal.coordinates?.length > 0) {
    //   for (let element of this.verObj.map.Invoice_Layout$InvoiceTotal.coordinates) {

    //     let rect: any = new fabric.Rect({
    //       left: element[0].polygon[0].x,
    //       top: element[0].polygon[3].y,
    //       originX: 'left',
    //       originY: 'top',
    //       width: (element[0].polygon[1].x - element[0].polygon[0].x) + 6,
    //       height: (element[0].polygon[3].y - element[0].polygon[0].y),
    //       angle: 0,
    //       stroke: '#DCDCDC',
    //       strokeWidth: 1,
    //       fill: 'rgba(205, 209, 228 , 0.5)',
    //       selectable: true,
    //       objectCaching: false,
    //       noScaleCache: false,
    //       strokeUniform: true,
    //     })
    //     rect.id = 'amountRef'

    //     this.addInitialObjecToCanvas(this.verObj.map.Invoice_Layout$InvoiceTotal?.pageId, rect, 'amountRef')


    //     //this.menuItems?.splice(this.menuItems?.indexOf('amountRef'), 1)

    //   }
    // }

    // if (this.verObj.map.Invoice_Layout$BillingAddress.coordinates && !this.verObj.map.Invoice_Layout$BillingAddress?.coordinates?.includes(null) &&
    //   this.verObj.map.Invoice_Layout$BillingAddress.coordinates?.length > 0) {
    //   for (let element of this.verObj.map.Invoice_Layout$BillingAddress.coordinates) {

    //     let rect: any = new fabric.Rect({
    //       left: element[0].polygon[0].x,
    //       top: element[0].polygon[3].y,
    //       originX: 'left',
    //       originY: 'top',
    //       width: (element[0].polygon[1].x - element[0].polygon[0].x) + 6,
    //       height: (element[0].polygon[3].y - element[0].polygon[0].y),
    //       angle: 0,
    //       stroke: '#DCDCDC',
    //       strokeWidth: 1,
    //       fill: 'rgba(205, 209, 228 , 0.5)',
    //       selectable: true,
    //       objectCaching: false,
    //       noScaleCache: false,
    //       strokeUniform: true,
    //     })
    //     rect.id = 'billingAddress'

    //     this.addInitialObjecToCanvas(this.verObj.map.Invoice_Layout$BillingAddress?.pageId, rect, 'billingAddress')


    //     //this.menuItems?.splice(this.menuItems?.indexOf('amountRef'), 1)

    //   }
    // }

  }

  addInitialObjecToCanvas(pageid: number, cont: any, id: any)
  {
    let pageNum = pageid;
    this.canvasList[pageNum]?.canvasElem?.add(cont)
    // this.allObjects.selectedContainers?.push({
    //   input: id,
    //   container: cont,
    //   selectedCanvas: this.canvasList[pageNum]?.canvasElem,
    //   selectedCoords: this.canvasList[pageNum]?.documentCoords,
    //   objCanOrgHeight: this.canvasList[pageNum]?.canvasElemOrgHeight,
    //   objCanOrgWidth: this.canvasList[pageNum]?.canvasElemOrgWidth}
    // )

    //console.log(this.canvasList);
  }

  renderInitialObjects()
  {
    this.canvasList?.forEach((item: any)=>{
      item?.canvasElem?.requestRenderAll()
    })
  }

  getDoc(element: any) {
    const docId: any = element.attachment.documentid;
    this.commonService.downloadFile(element.attachment.systemId,docId).subscribe({
      next: (res: any) => {
         const url = res.status
        window.open(url, "_blank");
      },
      error: (error) => {},
    });
  }

  downloadXML(element: any) {
    this.sOCRService.downloadXML(element).subscribe({
      next: (res: Blob) => {
        //console.log(res);
        const blob = new Blob([res], { type: 'text/xml' });
        saveAs(blob, 'file.xml');
      },
      error: (error) => {
      },
    });
  }

  onPaginateChange(event: any) {
    //console.log(event);
    if(!this.orgPageEvent) {
      this.orgPageEvent = event;
      this.page = this.page + 1;
      this.pageInd++;
    } else {
      if(this.orgPageEvent.pageIndex < event.pageIndex) {
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
    if(!this.orgCanvasPageEvent) {
      this.orgCanvasPageEvent = event;
      this.canvasPage = this.canvasPage + 1;
      this.canvasPageInd++;
    } else {
      if(this.orgCanvasPageEvent.pageIndex < event.pageIndex) {
        this.canvasPage = this.canvasPage + 1;
        this.canvasPageInd++;
      } else {
        this.canvasPage = this.canvasPage - 1;
        this.canvasPageInd--;
      }
      this.orgCanvasPageEvent = event;

      this.getLineItemsDetails(this.canvasPage);
    }
  }

  /**
   * Add function for Zoom In and Zoom Out
   */
  zoomIn() {
    this.canvasList[0]?.canvasElem?.setZoom(this.canvasList[0]?.canvasElem?.getZoom() * 1.1);
    if(this.canvasParentWidth <= this.canvasList[0]?.canvasElem?.getWidth()) {
      this.canvasList[0]?.canvasElem?.setWidth(this.canvasList[0]?.canvasElem?.getWidth() * 1.1);
    }
    this.canvasList[0]?.canvasElem?.setHeight(this.canvasList[0]?.canvasElem?.getHeight() * 1.1);
    this.canvasList[0]?.canvasElem?.requestRenderAll();
    this.documentViewer.nativeElement.scrollTo((this.documentViewer.nativeElement.scrollWidth - this.documentViewer.nativeElement.clientWidth) / 2, 0);
  }

  zoomOut() {
    if(this.canvasList[0]?.canvasElem?.getZoom() > 1) {
      this.canvasList[0]?.canvasElem?.setZoom(this.canvasList[0]?.canvasElem?.getZoom() / 1.1);
      if(this.canvasParentWidth <= this.canvasList[0]?.canvasElem?.getWidth()) {
        this.canvasList[0]?.canvasElem?.setWidth(this.canvasList[0]?.canvasElem?.getWidth() / 1.1);
      }
      this.canvasList[0]?.canvasElem?.setHeight(this.canvasList[0]?.canvasElem?.getHeight() / 1.1);
      this.canvasList[0]?.canvasElem?.requestRenderAll();
      this.documentViewer.nativeElement.scrollLeft = (this.documentViewer.nativeElement.scrollWidth - this.documentViewer.nativeElement.clientWidth) / 2;
    }
  }

  getMDIResponse() {
    this.sOCRService.getMDIResponse(this.invoiceData.requestId).subscribe({
      next: (res: any) => {
        this.mdiResponse = res.result;
        // if(this.mdiResponse && this.mdiResponse.tables) {
        //   this.getTableContent(this.mdiResponse.tables);
        // }

        if (this.invoiceData.stage != 'New' && this.invoiceData.stage != 'PageSeperation') {
          this.getSOCRResponse();
        } else {
          if(this.mdiResponse) {
            this.responseManupilation(this.mdiResponse);
          }
        }
      },
      error: (err: any) => {
      }
    })
  }

  getSOCRResponse() {
    this.sOCRService.getSOCRResponse(this.ocrId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.ocrData = res.result;

        // this.businessRules = [];
        // if(res && res.result && res.result.signaturesAndStamps) {
        //   Object.keys(res.result.signaturesAndStamps).forEach((key: any) => {
        //     this.businessRules.push({rule: key != 'Stamp and Physical Signature' ? key : `${key} (On First Page)`, status: res.result.signaturesAndStamps[key] ? res.result.signaturesAndStamps[key].status : 'FAILED'})
        //   });
        // }

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
      if (prop === 'PurchaseOrder') {
        if (this.fieldsArr.length > 2) {
          this.fieldsArr.splice(2, 0, this.fixedfields[index]);
        } else {
          this.fieldsArr.push(this.fixedfields[index]);
        }
        i = this.fieldsArr.length;
      } else if (prop.includes('Invoice') || prop == "SubTotal" || prop == "TotalTax") {
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
          this.fieldsArr[indexx]['data'].push(this.fixedfields[index]);
        }
        i = this.fieldsArr.length;
      } else if (prop.includes('Vendor')) {
        let isPropExist = this.fieldsArr.find((item: any) => item.groupType === "Vendor");
        if (!isPropExist) {
          this.fieldsArr.unshift({ "groupType": "Vendor" });
          this.fieldsArr[0]['data'] = [];
          this.fieldsArr[0]['data'].push(this.fixedfields[index]);
        } else {
          let indexx = this.fieldsArr.findIndex((item: any) => item.groupType === "Vendor");
          this.fieldsArr[indexx]['data'].push(this.fixedfields[index]);
        }
        i = this.fieldsArr.length;
      } else {
        this.fieldsArr.push(this.fixedfields[index]);
          i++;
      }
    }
    //console.log(this.fieldsArr);
  }

  responseManupilation(ocrData: any) {
    this.fixedfields = ocrData.documents[0];
    this.dynamicfields = ocrData.keyValuePairs;
    let fieldsTempArr: any[] = Object.keys(this.fixedfields.fields);
    this.fieldsArr = [];
    this.lineArr = [];
    let i = 0;
    let k = 0;
    this.totalLength = 0;
    this.lineItemHeaders = [];
    for (let prop of fieldsTempArr) {
      if (this.fixedfields.fields[prop] && this.fixedfields.fields[prop]['type'] == "array") {
        for (let item of this.fixedfields.fields[prop]['valueArray']) {
          let j = 0;
          item.valueObjectM = [];
          let valueObjectTempArr: any[] = Object.keys(item.valueObject);
          for (let propp of valueObjectTempArr) {
            if (item.valueObject[propp] != null) {
              item.valueObjectM.push(item.valueObject[propp]);
              item.valueObjectM[j]['name'] = propp;
              if (this.totalLength == 0) {
                this.lineItemHeaders.push(propp);
              }

              j++;
            }
          }
          this.totalLength++;
        }
        this.lineArr.push(this.fixedfields.fields[prop]);
        this.lineArr[k]['name'] = prop;
        k++;
      } else {
        if (prop === 'PurchaseOrder') {
          if (this.fieldsArr.length > 2) {
            this.fieldsArr.splice(2, 0, this.fixedfields.fields[prop]);
            this.fieldsArr[2]['name'] = prop;
            i = this.fieldsArr.length;
          } else {
            this.fieldsArr.push(this.fixedfields.fields[prop]);
            this.fieldsArr[i]['name'] = prop;
            i = this.fieldsArr.length;
          }
        } else if (prop.includes('Invoice') || prop == "SubTotal" || prop == "TotalTax") {
          let isPropExist = this.fieldsArr.find((item: any) => item.groupType === "Invoice");
          if (!isPropExist) {
            this.fieldsArr.splice(1, 0, { "type": "Invoice" });
            this.fieldsArr[1]['data'] = [];
            this.fieldsArr[1]['data'].push(this.fixedfields.fields[prop]);
            this.fieldsArr[1]['data'][0]['name'] = prop;
          } else {
            let index = this.fieldsArr.findIndex((item: any) => item.groupType === "Invoice");
            let count = this.fieldsArr[index]['data'].length;
            this.fieldsArr[index]['data'].push(this.fixedfields.fields[prop]);
            this.fieldsArr[index]['data'][count]['name'] = prop;
          }
          i = this.fieldsArr.length;
        } else if (prop.includes('Vendor')) {
          let isPropExist = this.fieldsArr.find((item: any) => item.groupType === "Vendor");
          if (!isPropExist) {
            this.fieldsArr.unshift({ "type": "Vendor" });
            this.fieldsArr[0]['data'] = [];
            this.fieldsArr[0]['data'].push(this.fixedfields.fields[prop]);
            this.fieldsArr[0]['data'][0]['name'] = prop;
          } else {
            let index = this.fieldsArr.findIndex((item: any) => item.groupType === "Vendor");
            let count = this.fieldsArr[index]['data'].length;
            this.fieldsArr[index]['data'].push(this.fixedfields.fields[prop]);
            this.fieldsArr[index]['data'][count]['name'] = prop;
          }
          i = this.fieldsArr.length;
        } else {
          if (this.fixedfields.fields[prop]) {
            this.fieldsArr.push(this.fixedfields.fields[prop]);
            this.fieldsArr[i]['name'] = prop;
            i++;
          }
        }
      }
    }

    for (let index = 0; index < this.fieldsArr.length; index++) {
      const element = this.fieldsArr[index];
      if (index === 0 && element.type !== "Vendor") {
        let propIndex = this.fieldsArr.findIndex((item: any) => item.groupType === "Vendor");
        this.fieldsArr.unshift(this.fieldsArr[propIndex]);
      } else if (index === 1 && element.type !== "Invoice") {
        let propIndex = this.fieldsArr.findIndex((item: any) => item.groupType === "Invoice");
        this.fieldsArr.splice(1, 0, this.fieldsArr[propIndex]);
        this.fieldsArr.splice(propIndex + 1, 1);
      } else if (index === 2 && element.name !== "PurchaseOrder") {
        let propIndex = this.fieldsArr.findIndex((item: any) => item.name === "PurchaseOrder");
        this.fieldsArr.splice(2, 0, this.fieldsArr[propIndex]);
        this.fieldsArr.splice(propIndex + 1, 1);
      } else if (index > 2) {
        break;
      }
    }

    if(this.ocrData) {
      let companyGST = this.ocrData.headerFields.find((item: any) => item.name === 'CompanyGST');
      let vendorGST = this.ocrData.headerFields.find((item: any) => item.name === 'VendorGST');
      let po = this.ocrData.headerFields.find((item: any) => item.name === 'PurchaseOrder');

      let isPOExist = this.fieldsArr.findIndex((item: any) => item.name === 'PurchaseOrder');
      if(isPOExist > -1 && po) {
        this.fieldsArr[isPOExist]['content'] = po.value;
      }

      let isVendorExist = this.fieldsArr.findIndex((item: any) => item.groupType === "Vendor");
      if (isVendorExist > -1 && vendorGST) {
        this.fieldsArr[isVendorExist]['data'].push({name: vendorGST.name, content: vendorGST.value});
      }

      if(companyGST) {
        this.fieldsArr.push({name: 'Company GST', content: companyGST.value});
      }

    }

    console.log(this.fieldsArr);
    console.log(this.lineArr);
  }

  ngOnDestroy() { }

}
