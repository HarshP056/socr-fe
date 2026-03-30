import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogicalSystemService, MessageUserService } from 'src/app/services';
import { PostedInvoiceDataService } from 'src/app/services/posted-invoice-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-posted-invoice-data',
  templateUrl: './edit-posted-invoice-data.component.html',
  styleUrls: ['./edit-posted-invoice-data.component.scss']
})
export class EditPostedInvoiceDataComponent implements OnInit {
  editMode: any = 'new';
  isLoading: boolean = false;
  resettingLoader: boolean = false;
  initialLoader: boolean = false;
  postedInvoiceId: string = "";
  postedInvoiceData: any = {};
  logicalSystems: any = [];
  creditMemos : any = [
    {name:'True', value : true},
    {name:'False', value : false}
  ];
  channels : any = [
    {name:'Portal', value : 'PORTAL'},
    {name:'Email', value : 'EMAIL'}
  ];
  isWait: boolean = false;
  displayedColumns: any[] = [
    'itemText',
    'quantity',
    'unitPrice',
    'companyCode',
    'costCenter',
    'glAccountCode'
  ];
  constructor(
    private messageSer: MessageUserService,
    private postedInvoiceDataService: PostedInvoiceDataService,
    private activateRoute: ActivatedRoute,
    private logicalSystemService : LogicalSystemService
  ) {

  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: any) => {
      this.postedInvoiceId = params.id;
      if (this.postedInvoiceId) {
        this.initialLoader = true;
        this.getPostedInvoiceData();
      }
    });
    this.getLogicalSystem();
  }

  private getPostedInvoiceData() {
    this.postedInvoiceDataService.getPostedDataById(this.postedInvoiceId).subscribe({
      next: (res: any) => {
        let result = res.result;
        this.postedInvoiceData = res.result;
        console.log(result)
        this.initialLoader = false;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.resettingLoader = false;
        this.initialLoader = false;
      },
    });
  }

  getLogicalSystem() {
    this.logicalSystemService.getAllLogicalSystems().subscribe({
      next: (res: any) => {
        this.logicalSystems = res;
      },
      error: (err: any) => {},
    });
  }

}
