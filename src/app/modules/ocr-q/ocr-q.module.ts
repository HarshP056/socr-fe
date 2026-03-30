import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcrQComponent } from './ocr-q.component';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BasicModalModule } from 'src/app/shared/modals/basic-modal/basic-modal.module';
import { OcrXmlComponent } from './component/ocr-xml/ocr-xml.component';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PdfDocumentViewerModule } from 'src/app/shared/components/pdf-document-viewer/pdf-document-viewer.module';
import { DropdownModule } from 'primeng/dropdown';
import { NotificationLogsModule } from 'src/app/shared/components/notification-logs/notification-logs.module';
import { S1ResponseComponent } from './component/s1-response/s1-response.component';

const router: Routes = [{ path: '', component: OcrQComponent }];

@NgModule({
  declarations: [OcrQComponent, OcrXmlComponent, S1ResponseComponent],
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
    FontAwesomeModule
  ],
  providers: [
    NgDialogAnimationService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class OcrQModule {}
