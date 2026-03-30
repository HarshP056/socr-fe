import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MessageService } from 'primeng/api';
import { VendorService, MiscService, CommonService, LogicalSystemService, SystemConfigService } from 'src/app/services';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { VendorDialogComponent } from '../vendor-management/vendor-dialog/vendor-dialog.component';
import { Location } from '@angular/common';
import { GstService } from 'src/app/services/gst.service';
import { GstDialogComponent } from './gst-dialog/gst-dialog.component';

@Component({
  selector: 'app-gst',
  templateUrl: './gst.component.html',
  styleUrls: ['./gst.component.scss']
})
export class GstComponent implements OnInit {

  totlaElements: any;
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  gstList: any[] = [];
  displayedColumns: any[] = [
    'gstNo',
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

constructor(
  private messageService: MessageService,
  private activatedRoute: ActivatedRoute,
  private router: Router,
  private location: Location,
  private misc: MiscService,
  private dialog: NgDialogAnimationService,
  private logicalService: LogicalSystemService,
  private gstService : GstService
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
  _gstNo:string,
  _logicalSystem: string
) {
  const searchQueryParams: any = {
    limit: _limit,
    page: _page,
    order: _order,
    gstNo: _gstNo,
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
    if (params['gstNo']) {
      this.searchQueryParams.gstNo = params['gstNo'];
    }
    if (params['logicalSystem']) {
      this.searchQueryParams.logicalSystem = params['logicalSystem'];
    }
    this.getAllGST();
  });
}

private updateSize(limit: number) {
  this.limit = limit;
  if (!this.limits.includes(Number(limit))) {
    this.limits.push(Number(limit));
    this.limits.sort((a, b) => {
      return a - b;
    });
  }
}


searchQueryParams: any = {
  page: 1,
  order: 'id',
  limit: 10,
  supplierId: '',
  name: '',
  logicalSystem: '',
};

getAllGST() {
  this.isLoading = true;
  this.gstService.getGSTPage(this.searchQueryParams).subscribe(
    (res: any) => {
      this.gstList = res.content;
      this.totlaElements = res.totalElements;
      this.isLoading = false;
      this.initialLoader = false;
      this.resettingLoader = false;
      this.updateQueryParams(
        this.searchQueryParams.limit,
        this.searchQueryParams.page,
        this.searchQueryParams.order,
        this.searchQueryParams.gstNo,
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
    this.searchQueryParams.page = 1,
    this.searchQueryParams.order = '-id',
    this.searchQueryParams.gstNo = '';
    this.searchQueryParams.logicalSystem = '';
    this.pageInd = 0;

  this.updateQueryParams(
    this.searchQueryParams.limit,
    this.searchQueryParams.page,
    this.searchQueryParams.order,
    this.searchQueryParams.gstNo,
    this.searchQueryParams.logicalSystem);
    this.resettingLoader = true;
    this.getAllGST();
}

search() {
  this.isLoading = true;
  this.searchQueryParams.page = 1;
  this.getAllGST();
}

onPageChange(event: any) {
  console.log(event);
  this.initialLoader = true;
  this.pageInd = event.pageIndex;
  this.page = event.pageIndex + 1;
  this.limit = event.pageSize;
  this.searchQueryParams.page = this.page;
  this.searchQueryParams.limit = this.limit;
  this.getAllGST();
}

openDialog(id: string) {
  this.dialog
    .open(GstDialogComponent, {
      disableClose: true,
      height: '100%',
      width: '35%',
      animation: { to: 'left' },
      position: { top: '0px', bottom: '0px', right: '0px' },
      data: id,
    })
    .afterClosed()
    .subscribe((val) => {
      if(val == "success") {
        this.getAllGST();
      }      
    });
}

deleteGST(id: number) {
  this.gstService.deleteGST(id.toString()).subscribe({
    next: (res: any) => {
      if(res) {
        this.getAllGST();
      }
    },
    error: (err: any) => {
      console.log(err);
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

}
