import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataMappingComponent } from './metadata-mapping.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { DeleteConfirmationModalModule } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MetadataFieldComponent } from './metadata-field/metadata-field.component';
import { MetadataCopyComponent } from './metadata-copy/metadata-copy.component';

const routes: Routes = [
  { path: '', component: MetadataMappingComponent },
  { path: 'meta-field-data', component: MetadataFieldComponent },
  { path: 'edit-meta-field-data/:id', component: MetadataFieldComponent },
  { path: 'copy/:id', component: MetadataCopyComponent },
];

@NgModule({
  declarations: [MetadataMappingComponent, MetadataFieldComponent, MetadataCopyComponent],
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
export class MetadataMappingModule { }
