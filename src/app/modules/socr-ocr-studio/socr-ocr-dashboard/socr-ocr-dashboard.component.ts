import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-socr-ocr-dashboard',
  templateUrl: './socr-ocr-dashboard.component.html',
  styleUrls: ['./socr-ocr-dashboard.component.scss']
})
export class SocrOcrDashboardComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  redirectToInvoices(url:any){
    this.router.navigateByUrl(`socr-ocr-studio/${url}`)
  }
}
