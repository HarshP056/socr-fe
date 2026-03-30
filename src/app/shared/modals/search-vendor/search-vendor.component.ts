import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MessageService } from 'primeng/api';
import { VendorService, MiscService, CommonService, LogicalSystemService, SystemConfigService } from 'src/app/services';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search-vendor',
  templateUrl: './search-vendor.component.html',
  styleUrls: ['./search-vendor.component.scss'],
  standalone: false
})
export class SearchVendorComponent implements OnInit {

  @Output() onsubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onclose: EventEmitter<null> = new EventEmitter<null>();

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
    'logicalSystem',
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
  this.getUrlParams();
  this.getLogicalSystem();
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
}

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

  onSelectVendor(elem:any){
    this.onsubmit.emit(elem)
    this.reset();

  }

  close() {
    this.onclose.emit();
  }

}
