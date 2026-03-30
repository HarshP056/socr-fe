import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceBufferReportComponent } from './invoice-buffer-report.component';
import { DataViewerComponent } from './component/data-viewer/data-viewer.component';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';

const route: Routes = [
  { path: '', component: InvoiceBufferReportComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    DropdownModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatTooltipModule,
    MatRippleModule,
    FormsModule,
    PageLoaderModule
  ],
  declarations: [
    InvoiceBufferReportComponent,
    DataViewerComponent
  ]
})
export class InvoiceBufferReportModule { }
