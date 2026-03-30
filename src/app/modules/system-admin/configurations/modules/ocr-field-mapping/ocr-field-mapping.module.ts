import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { DropdownModule } from 'primeng/dropdown';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { OcrFieldMappingComponent } from './ocr-field-mapping.component';
import { OcrFieldDataComponent } from './component/ocr-field-data/ocr-field-data.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteConfirmationModalModule } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.module';
import { MatSortModule } from '@angular/material/sort';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PipeModule } from 'src/app/pipe/pipe.module';

const routes: Routes = [
  { path: '', component: OcrFieldMappingComponent },
  { path: 'ocr-field-data', component: OcrFieldDataComponent },
  { path: 'edit-ocr-field-data/:id', component: OcrFieldDataComponent },
];

@NgModule({
  declarations: [OcrFieldMappingComponent, OcrFieldDataComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatMenuModule,
    DropdownModule,
    PageLoaderModule,
    MatPaginatorModule,
    DeleteConfirmationModalModule,
    MatSortModule,
    PipeModule
  ],
  providers: [
    NgDialogAnimationService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    BsModalService,
  ],
})
export class OCRFieldMappingModule {}
