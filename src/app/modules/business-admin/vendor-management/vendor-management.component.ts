import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MessageService } from 'primeng/api';
import { MiscService, CommonService, SystemConfigService } from 'src/app/services';
import { LogicalSystemService } from 'src/app/services/logical-system.service';
import { Location } from '@angular/common';
import { VendorService } from 'src/app/services/vendor.service';
import { VendorDialogComponent } from './vendor-dialog/vendor-dialog.component';
import { UploadFileComponent } from '../upload-file/upload-file.component';

@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.scss']
})
export class VendorManagementComponent implements OnInit {

  totlaElements: any;
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  vendors: any[] = [];
  displayedColumns: any[] = [
    'name',
    'supplierId',
    'gst',
    'phone',
    'address.country',
    'logicalSystem',
    'action'
  ];
  page: number = 1;
  order: any = 'name';
  limits = [5, 10, 25, 50];
  limit: number = 10;
  pageInd: number = 0;
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
  private commonService: CommonService,
  private logicalService: LogicalSystemService,
  private systemConfigService: SystemConfigService
) {}

ngOnInit(): void {
  this.initialLoader = true;
  //this.getAllVendors();
  this.getUrlParams();
  this.getLogicalSystem();
  this.getSystemConfig();
}

private updateQueryParams(
  _limit: number,
  _page: number,
  _order: string,
  _name: string,
  _supplierId:string,
  _logicalSystem: string,
  _gstNo: string
) {
  const searchQueryParams: any = {
    limit: _limit,
    page: _page,
    order: _order,
    supplierId: _supplierId,
    name: _name,
    logicalSystem: _logicalSystem,
    gstNo: _gstNo
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
    if (params['name']) {
      this.searchQueryParams.name = params['name'];
    }
    if (params['supplierId']) {
      this.searchQueryParams.supplierId = params['supplierId'];
    }
    if (params['logicalSystem']) {
      this.searchQueryParams.logicalSystem = params['logicalSystem'];
    }
    if (params['gstNo']) {
      this.searchQueryParams.gstNo = params['gstNo'];
    }
    this.getAllVendors();
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
  order: 'name',
  limit: 10,
  supplierId: '',
  name: '',
  logicalSystem: '',
  gstNo: '',
};

getAllVendors() {
  this.isLoading = true;
  this.vendorService.getAllVendors(this.searchQueryParams).subscribe(
    (res: any) => {
      this.vendors = res.content;
      this.totlaElements = res.totalElements;
      this.isLoading = false;
      this.initialLoader = false;
      this.resettingLoader = false;
      this.updateQueryParams(
        this.searchQueryParams.limit,
        this.searchQueryParams.page,
        this.searchQueryParams.order,
        this.searchQueryParams.name,
        this.searchQueryParams.supplierId,
        this.searchQueryParams.logicalSystem,
        this.searchQueryParams.gstNo
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
    this.searchQueryParams.page = 1,
    this.searchQueryParams.order = '-id',
    this.searchQueryParams.name = '',
    this.searchQueryParams.supplierId = '';
    this.searchQueryParams.logicalSystem = '';
     this.searchQueryParams.gstNo = '';
    this.pageInd = 0;

  this.updateQueryParams(
    this.searchQueryParams.limit,
    this.searchQueryParams.page,
    this.searchQueryParams.order,
    this.searchQueryParams.name,
    this.searchQueryParams.supplierId,
    this.searchQueryParams.logicalSystem,
    this.searchQueryParams.gstNo);
    this.resettingLoader = true;
    this.getAllVendors();
}

search() {
  this.isLoading = true;
  this.searchQueryParams.page = 1;
  this.getAllVendors();
}

onPageChange(event: any) {
  console.log(event);
  this.initialLoader = true;
  this.pageInd = event.pageIndex;
  this.page = event.pageIndex + 1;
  this.limit = event.pageSize;
  this.searchQueryParams.page = this.page;
  this.searchQueryParams.limit = this.limit;
  this.getAllVendors();
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
      this.getAllVendors();
    });
}

deleteUser(id: number) {
  this.vendorService.deleteVendor(id.toString()).subscribe({
    next: (res: any) => {
      this.getAllVendors();
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

onFileSelected(event: any) {
  this.selectedFile = <File>event.target.files[0];
}

uploadFile() {
  this.dialog
  .open(UploadFileComponent, {
    disableClose: false,
    height: '100%',
    width: '35%',
    animation: { to: 'left' },
    position: { top: '0px', bottom: '0px', right: '0px' },
    data: "vendor",
  })
  .afterClosed().subscribe((res:any)=>{
    this.getAllVendors();
  })

}

  syncVendor(){
    this.vendorService.syncVendor().subscribe({
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
