import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SOcrQComponent } from './ocr-q.component';
import { OcrBoundingBoxComponent } from './component/bounding-box/bounding-box.component';
import { RouterModule, Routes } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MdiResponseComponent } from './component/mdiResponse/mdi-response.component';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PdfDocumentViewerModule } from 'src/app/shared/components/pdf-document-viewer/pdf-document-viewer.module';
import { DropdownModule } from 'primeng/dropdown';
import { NotificationLogsModule } from 'src/app/shared/components/notification-logs/notification-logs.module';
import { UploadFileComponent } from './component/upload-file/upload-file.component';
import { OcrDetailsBComponent } from './component/ocr-detail-b/ocr-detail-b.component';
import { OcrDetailsCComponent } from './component/ocr-detail-c/ocr-detail-c.component';
import { OcrDetailsDComponent } from './component/ocr-detail-d/ocr-detail-d.component';
import { LogsComponent } from './component/logs/logs.component';
import { TimelineModule } from 'primeng/timeline';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ErrorLogComponent } from './component/error-log/error-log.component';
import { BasicModalModule } from 'src/app/shared/modals/basic-modal/basic-modal.module';
//import { SearchVendorComponent } from './component/search-vendor/search-vendor.component';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchVendorModalModule } from 'src/app/shared/modals/search-vendor/search-vendor.module';
import { SearchPoModule } from 'src/app/shared/modals/search-po/search-po.module';

const router: Routes = [
  { path: '', component: SOcrQComponent },
  { path: 'details/:docId', component: OcrBoundingBoxComponent },
  { path: 'details-b/:docId', component: OcrDetailsBComponent },
  { path: 'details-c/:docId', component: OcrDetailsCComponent },
  { path: 'details-d/:docId', component: OcrDetailsDComponent }
];

@NgModule({
  declarations: [SOcrQComponent, MdiResponseComponent, OcrBoundingBoxComponent, UploadFileComponent, OcrDetailsBComponent, OcrDetailsCComponent, OcrDetailsDComponent, LogsComponent, ErrorLogComponent],
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
    TimelineModule,
    NgxJsonViewerModule,
    BasicModalModule,
    MatMenuModule,
    FontAwesomeModule,
    SearchVendorModalModule,
    SearchPoModule
  ],
  providers: [
    NgDialogAnimationService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class SOCROCRQModule {}
