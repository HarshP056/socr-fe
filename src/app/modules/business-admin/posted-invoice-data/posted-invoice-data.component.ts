import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostedInvoiceDataService } from 'src/app/services/posted-invoice-data.service';
import { Location } from '@angular/common';
import { Sort } from '@angular/material/sort';
import { PdfDocumentViewerComponent } from 'src/app/shared/components/pdf-document-viewer/pdf-document-viewer.component';
import { NgDialogAnimationService } from 'ng-dialog-animation';

interface queryParams {
  page: number;
  order: string;
  limit: number;
}
interface searchParams {
  sspInvoiceReferenceNo: string;
}

@Component({
  selector: 'app-posted-invoice-data',
  templateUrl: './posted-invoice-data.component.html',
  styleUrls: ['./posted-invoice-data.component.scss']
})
export class PostedInvoiceDataComponent implements OnInit {
  postedData: any = [];
  displayedColumns: any[] = [
    'sspInvoiceReferenceNo',
    'sapInvoiceReferenceNumber',
    'vendorInvoiceReferenceNumber',
    'supplierId',
    'totalInvoiceAmount',
    'channel',
    'invoiceDate',
    'createdDate',
    'action'
  ];
  queryParams: queryParams = {
    page: 1,
    order: '-createdDate',
    limit: 10,
  };
  searchParams: searchParams = {
    sspInvoiceReferenceNo: '',
  };
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  totalElements: number = 0;
  pageInd: number = 0;
  page: number = 1;
  limit: number = 10;
  order = '-createdDate';
  size: number = 10;

  constructor(private postedDataService: PostedInvoiceDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private dialog: NgDialogAnimationService
  ) { }

  ngOnInit() {
    this.getAllPostedData();
  }

  private getArgsObj() {
    const obj: any = {
      limit: this.queryParams.limit,
      order: this.queryParams.order,
      page: this.queryParams.page,
    };
    if (this.searchParams.sspInvoiceReferenceNo) obj['sspInvoiceReferenceNo'] = this.searchParams.sspInvoiceReferenceNo;
    return obj;
  }

  private updateQueryParams(
    _limit: number,
    _page: number,
    _order: string,
    _sspInvoiceReferenceNo: any | '',
  ) {
    const queryParams: any = {
      limit: _limit,
      page: _page,
      order: _order,
      query: _sspInvoiceReferenceNo || '',
    };
    const url = this.router
      .createUrlTree([], {
        relativeTo: this.activatedRoute,
        queryParams: { ...queryParams, ...this.searchParams },
      })
      .toString();
    this.location.replaceState(url);
  }

  getAllPostedData() {
    console.log('user');
    this.postedDataService.getPostedData(this.getArgsObj()).subscribe({
      next: (res: any) => {
        this.postedData = res['content'];
        this.totalElements = res.totalElements;
        this.resettingLoader = false;
        this.initialLoader = false;
        this.isLoading = false;
        this.updateQueryParams(
          this.queryParams.limit,
          this.queryParams.page,
          this.queryParams.order,
          this.searchParams.sspInvoiceReferenceNo,
        );
      },
      error: (err: any) => {
        this.isLoading = false;
        this.resettingLoader = false;
      },
    });
  }

  reset(){
    this.resettingLoader = true;
      this.queryParams.page = 1,
      this.queryParams.order = '-createdDate',
      this.searchParams.sspInvoiceReferenceNo = '',
      this.pageInd = 0;

    this.updateQueryParams(
      this.queryParams.limit,
      this.queryParams.page,
      this.queryParams.order,
      this.searchParams.sspInvoiceReferenceNo);
      this.resettingLoader = true;
      this.getAllPostedData();
  }

  search() {
    this.isLoading = true;
    this.queryParams.page = 1;
    this.getAllPostedData();
  }

  onPageChange(event: any) {
    console.log(event);
    this.initialLoader = true;
    this.pageInd = event.pageIndex;
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.queryParams.page = this.page;
    this.queryParams.limit = this.limit;
    this.getAllPostedData();
  }

  goToEdit(id: any){
    this.router.navigateByUrl(`/business-admin/posted-invoice-data/edit/${id}`)
  }

  sortChange(sort: Sort) {
      if (sort.direction === 'asc') {
        this.order = sort.active;
        this.queryParams.order = this.order;
        this.page;
        this.size;
        this.getAllPostedData();
      } else if (sort.direction === 'desc') {
        this.order = '-' + sort.active;
        this.queryParams.order = this.order;
        this.page;
        this.size;
        this.getAllPostedData();
      }
    }

     viewDoc(element: any) {
       this.dialog.open(PdfDocumentViewerComponent, {
         height: '100%',
         width: '48%',
         animation: { to: 'left' },
         position: { top: '0px', bottom: '0px', right: '0px' },
         data: {
          data :element,
          type : 'postedInvoiceData'
         },
       });
       // this.offCanvas.open(this.pdfView, { position: 'end' });
     }

}
