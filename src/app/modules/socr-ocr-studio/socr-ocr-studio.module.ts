import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PdfDocumentViewerModule } from 'src/app/shared/components/pdf-document-viewer/pdf-document-viewer.module';
import { DropdownModule } from 'primeng/dropdown';
import { NotificationLogsModule } from 'src/app/shared/components/notification-logs/notification-logs.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { SocrOcrStudioComponent } from './socr-ocr-studio.component';
import { SocrOcrDashboardComponent } from './socr-ocr-dashboard/socr-ocr-dashboard.component';
import { BasicModalModule } from 'src/app/shared/modals/basic-modal/basic-modal.module';
import { SearchVendorModalModule } from 'src/app/shared/modals/search-vendor/search-vendor.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const router: Routes = [
  { path: '', component: SocrOcrDashboardComponent },
  { path: 'invoices', component: SocrOcrStudioComponent },
  { path: 'purchaseOrder', component: SocrOcrStudioComponent },
  { path: 'contracts', component: SocrOcrStudioComponent },
  { path: 'expenses', component: SocrOcrStudioComponent },
  { path: 'general-documents', component: SocrOcrStudioComponent }
];

@NgModule({
  declarations: [SocrOcrStudioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    FormsModule,
    PipeModule,
    PageLoaderModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTooltipModule,
    BsDatepickerModule.forRoot(),
    PdfDocumentViewerModule,
    DropdownModule,
    NotificationLogsModule,
    NgxJsonViewerModule,
    BasicModalModule,
    SearchVendorModalModule,
    MatProgressBarModule
  ],
  providers: [
    NgDialogAnimationService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class SocrOcrStudioModule {}
