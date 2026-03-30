import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MessageService } from 'primeng/api';
import { MiscService, SystemConfigService } from 'src/app/services';
import { VendorService } from 'src/app/services/vendor.service';
import { Location } from '@angular/common';
import { VendorDialogComponent } from '../vendor-management/vendor-dialog/vendor-dialog.component';
import { LogicalSystemService } from 'src/app/services/logical-system.service';
import { UploadFileComponent } from '../upload-file/upload-file.component';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent {
  totlaElements: any;
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  displayedColumns: any[] = [
    // 'id',
    'purchaseOrderNumber',
    // 'podesc',
    'poType',
    'poDate',
    // 'supplierId',
    'supplierName',
    'status',
    'amount',
    // 'contractNo',
    'purchasingGroup',
    'purchasingOrg',
    // 'paymentTerms',
    'deliveryDate',
    'logicalSystem',
    // 'requestor',
    // 'buyer',
    // 'companyCode',
    // 'action'
  ];
  page: number = 1;
  order: any = '-poDate';
  limits = [5, 10, 25, 50];
  limit: number = 10;
  pageInd: number = 0;
  orders: any[] = [];
  systems: any[] = [];
  selectedFile: File;
  systemConfig: any = {
    enable: false
  };


constructor(
  private vendorService: VendorService,
  private messageService: MessageService,
  private activatedRoute: ActivatedRoute,
  private router: Router,
  private location: Location,
  private misc: MiscService,
  private dialog: NgDialogAnimationService,
  private logicalService: LogicalSystemService,
  private systemConfigService: SystemConfigService
) {}

ngOnInit(): void {
  this.initialLoader = true;
  // this.getAllPO();
  this.getUrlParams();
  this.getLogicalSystem();
  this.getSystemConfig();
}

private updateQueryParams(
  _limit: number,
  _page: number,
  _order: string,
  _purchaseOrderNumber: string,
  _logicalSystem: string
) {
  const searchQueryParams: any = {
    limit: _limit,
    page: _page,
    order: _order,
    purchaseOrderNumber: _purchaseOrderNumber,
    logicalSystem: _logicalSystem,
  };
  const url = this.router
    .createUrlTree([], {
      relativeTo: this.activatedRoute,
      queryParams: searchQueryParams,
    })
    .toString();
  this.location.replaceState(url);
}

private getUrlParams() {
  this.activatedRoute.queryParams.subscribe((params) => {
    if (params['limit'] && this.misc.isPositiveInteger(params['limit'])) {
      this.searchQueryParams.limit = params['limit'];
      this.updateSize(params['limit']);
    }
    if (params['page'] && this.misc.isPositiveInteger(params['page'])) {
      this.searchQueryParams.page = Number(params['page']);
      this.page = Number(params['page']);
      this.pageInd = Number(params['page']) - 1;
    }
    if (params['order']) {
      this.searchQueryParams.order = params['order'];
      this.order = params['order'];
    }
    if (params['purchaseOrderNumber']) {
      this.searchQueryParams.purchaseOrderNumber = params['purchaseOrderNumber'];
    }
    if (params['logicalSystem']) {
      this.searchQueryParams.logicalSystem = params['logicalSystem'];
    }
    this.getAllPO();
  });
}

private updateSize(limit: number) {
  this.limit = limit;
  // update limits array if limit recived from URL parameters is not present
  if (!this.limits.includes(Number(limit))) {
    this.limits.push(Number(limit));
    this.limits.sort((a, b) => {
      return a - b;
    });
  }
}

searchQueryParams: any = {
  page: 1,
  order: '-poDate',
  limit: 10,
  purchaseOrderNumber: '',
  logicalSystem: '',
};

getAllPO() {
  this.isLoading = true;
  this.vendorService.getAllPO(this.searchQueryParams).subscribe(
    (res: any) => {
      this.orders = res.content;
      this.totlaElements = res.totalElements;
      this.isLoading = false;
      this.initialLoader = false;
      this.resettingLoader = false;
      this.updateQueryParams(
        this.searchQueryParams.limit,
        this.searchQueryParams.page,
        this.searchQueryParams.order,
        this.searchQueryParams.purchaseOrderNumber,
        this.searchQueryParams.logicalSystem
      );
    },
    (err) => {
      this.isLoading = false;
      this.resettingLoader = false;
    }
  );
}

reset(){
  this.resettingLoader = true;
  this.searchQueryParams.page = 1;
  this.searchQueryParams.order = '-poDate';
  this.searchQueryParams.purchaseOrderNumber = '';
  this.searchQueryParams.logicalSystem = '';
  this.pageInd = 0;

  this.updateQueryParams(
    this.searchQueryParams.limit,
    this.searchQueryParams.page,
    this.searchQueryParams.order,
    this.searchQueryParams.purchaseOrderNumber,
    this.searchQueryParams.logicalSystem);
    this.resettingLoader = true;
    this.getAllPO();
}

search() {
  this.isLoading = true;
  this.searchQueryParams.page = 1;
  this.getAllPO();
}

onPageChange(event: any) {
  this.initialLoader = true;
  this.pageInd = event.pageIndex;
  this.page = event.pageIndex + 1;
  this.limit = event.pageSize;
  this.searchQueryParams.page = this.page;
  this.searchQueryParams.limit = this.limit;
  this.getAllPO();
}

openDialog(id: string) {
  this.dialog
    .open(VendorDialogComponent, {
      disableClose: true,
      height: '100%',
      width: '35%',
      animation: { to: 'left' },
      position: { top: '0px', bottom: '0px', right: '0px' },
      data: id,
    })
    .afterClosed()
    .subscribe((val) => {
      this.getAllPO();
    });
}

deletePO(id: any) {
  this.vendorService.deletePO(id.toString()).subscribe({
    next: (res: any) => {
      this.getAllPO();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: res.message,
      });
    },
    error: (err: any) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Some error occurred!!',
      });
    },
  });
}

getLogicalSystem() {
  this.logicalService.getAllLogicalSystems().subscribe({
    next: (res: any) => {
      this.systems = res;
      this.initialLoader = false;
    },
    error: (err: any) => {
      this.initialLoader = false;
    },
  });
}

onFileSelected(event : any) {
  this.selectedFile = <File>event.target.files[0];
}

uploadFile() {
  this.dialog
  .open(UploadFileComponent, {
    disableClose: true,
    height: '100%',
    width: '35%',
    animation: { to: 'left' },
    position: { top: '0px', bottom: '0px', right: '0px' },
    data: "purchaseOrder",
  })
  .afterClosed().subscribe((res:any)=>{
    this.getAllPO();
  })
}

syncPo(){
  this.vendorService.syncPO().subscribe({
    next:(res:any)=>{
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: res.message,
      });
    },
    error:(error:any)=>{
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Some error occurred!!',
      });
    }
  })
}

getSystemConfig(){
  this.systemConfigService.getSystemConfigById('SYSTEM_CONFIG').subscribe({
    next:(res:any)=>{
      if(res){
        this.systemConfig = res;
      }
    },
    error: (error: any) => {},
  })
}
}
