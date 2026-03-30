import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SearchVendorComponent } from './search-vendor.component';
import { PageLoaderModule } from '../../loader/page-loader/page-loader.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchVendorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    PageLoaderModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
    DropdownModule
  ],
  exports: [SearchVendorComponent],
})
export class SearchVendorModalModule {}
