import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorManagementComponent } from './vendor-management.component';
import { RouterModule, Routes } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { DropdownModule } from 'primeng/dropdown';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { VendorDialogComponent } from './vendor-dialog/vendor-dialog.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { UploadFileModule } from '../upload-file/upload-file.module';

const route: Routes = [{ path: '', component: VendorManagementComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    DropdownModule,
    PageLoaderModule,
    UploadFileModule
  ],
  providers: [
    NgDialogAnimationService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  declarations: [VendorManagementComponent, VendorDialogComponent]
})
export class VendorManagementModule { }
