import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OCRService } from 'src/app/services';
import { Location } from '@angular/common';
import { Sort } from '@angular/material/sort';
import { CommonService } from 'src/app/services';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { DataViewerComponent } from './component/data-viewer/data-viewer.component';

interface QueryParams {
  page: number;
  order: string;
  limit: number;
  status: string;
  // channel: string;
  // tagName: string;
  // isScanned: boolean;
}

interface SearchParams {
  docId: string;
  invoiceCategory: string;
}

@Component({
  selector: 'app-invoice-buffer-report',
  templateUrl: './invoice-buffer-report.component.html',
  styleUrls: ['./invoice-buffer-report.component.scss']
})
export class InvoiceBufferReportComponent implements OnInit {
  invoiceBufferData: any = [];
  displayedColumns: any[] = [
    'requestId',
    // 'invoiceDocId',
    'projectName',
    'invoiceCategory',
    'fileName',
    'logicalSystem',
    'creator',
    'receivedDate',
    'action'
  ];

  queryParams: QueryParams = {
    page: 1,
    order: '-id',
    limit: 10,
    status: 'OCR_COMPLETED'
    // channel: 'EMAIL',
    // tagName: 'Email',
    // isScanned: false
  };

  searchParams: SearchParams = {
    docId: '',
    invoiceCategory: 'PO'
  };

  invoiceCategories = [
    { label: 'PO', value: 'PO' },
    { label: 'NPO', value: 'NPO' }
  ];

  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  totalElements: number = 0;
  pageInd: number = 0;
  page: number = 1;
  limit: number = 10;
  order = '-id';

  constructor(
    private ocrService: OCRService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private commonService: CommonService,
    private dialog: NgDialogAnimationService
  ) { }

  ngOnInit() {
    this.initialLoader = true;
    this.getAllInvoiceBufferData();
  }

  private getArgsObj() {
    const obj: any = {
      limit: this.queryParams.limit,
      order: this.queryParams.order,
      page: this.queryParams.page,
      status: this.queryParams.status,
      // channel: this.queryParams.channel,
      // tagName: this.queryParams.tagName,
      // isScanned: this.queryParams.isScanned
    };

    if (this.searchParams.docId) obj['docId'] = this.searchParams.docId;
    if (this.searchParams.invoiceCategory && this.searchParams.invoiceCategory !== 'ALL') {
      obj['invoiceCategory'] = this.searchParams.invoiceCategory;
    }

    return obj;
  }

  private updateQueryParams(
    _limit: number,
    _page: number,
    _order: string
  ) {
    const queryParams: any = {
      limit: _limit,
      page: _page,
      order: _order,
      ...this.searchParams
    };
    const url = this.router
      .createUrlTree([], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
      })
      .toString();
    this.location.replaceState(url);
  }

  getAllInvoiceBufferData() {
    this.ocrService.getAllInvoices(this.getArgsObj()).subscribe({
      next: (res: any) => {
        this.invoiceBufferData = res['content'];
        this.totalElements = res.totalElements;
        this.resettingLoader = false;
        this.initialLoader = false;
        this.isLoading = false;
        this.updateQueryParams(
          this.queryParams.limit,
          this.queryParams.page,
          this.queryParams.order
        );
      },
      error: (err: any) => {
        this.isLoading = false;
        this.resettingLoader = false;
        this.initialLoader = false;
      },
    });
  }

  reset() {
    this.resettingLoader = true;
    this.queryParams.page = 1;
    this.queryParams.order = '-id';
    this.searchParams.docId = '';
    this.searchParams.invoiceCategory = 'PO';
    this.pageInd = 0;

    this.updateQueryParams(
      this.queryParams.limit,
      this.queryParams.page,
      this.queryParams.order
    );
    this.getAllInvoiceBufferData();
  }

  search() {
    this.isLoading = true;
    this.queryParams.page = 1;
    this.getAllInvoiceBufferData();
  }

  onPageChange(event: any) {
    this.initialLoader = true;
    this.pageInd = event.pageIndex;
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.queryParams.page = this.page;
    this.queryParams.limit = this.limit;
    this.getAllInvoiceBufferData();
  }

  sortChange(sort: Sort) {
    if (sort.direction === 'asc') {
      this.order = sort.active;
      this.queryParams.order = this.order;
      this.getAllInvoiceBufferData();
    } else if (sort.direction === 'desc') {
      this.order = '-' + sort.active;
      this.queryParams.order = this.order;
      this.getAllInvoiceBufferData();
    }
  }

  onCategoryChange() {
    this.search();
  }

  getDoc(element: any) {
    if (element.invoiceDocId) {
      this.commonService.downloadFile(element.logicalSystem, element.invoiceDocId).subscribe({
        next: (res: any) => {
          const url = res.status;
          window.open(url, "_blank");
        },
        error: (error) => {
          console.error('Error downloading file:', error);
        },
      });
    }
  }

  getProjectName(element: any): string {
    // Extract project name from subject or title if available
    return element.title || element.subject || 'N/A';
  }

  getFileName(element: any): string {
    if (element.attachments && element.attachments.length > 0) {
      return element.attachments[0].filename || 'N/A';
    }
    return 'N/A';
  }

  downloadXML(element: any) {
    if (element.requestId) {
      this.ocrService.getXInvoiceData(element.requestId).subscribe({
        next: (res: any) => {
          const blob = new Blob([res], { type: 'text/xml' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `invoice_${element.requestId}.xml`;
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          console.error('Error downloading XML:', error);
        },
      });
    }
  }

  viewXML(element: any) {
    if (element.id) {
      this.dialog.open(DataViewerComponent, {
        height: '100%',
        width: '50%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: {
          id: element.id,
          type: 'xml',
          title: 'Invoice XML Data'
        },
      });
    }
  }

  viewSyncData(element: any) {
    if (element.abbyBatchId) {
      this.dialog.open(DataViewerComponent, {
        height: '100%',
        width: '50%',
        animation: { to: 'left' },
        position: { top: '0px', bottom: '0px', right: '0px' },
        data: {
          id: element.abbyBatchId,
          type: 'sync',
          title: 'S1 Synched Data'
        },
      });
    }
  }
}
