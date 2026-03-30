import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPoComponent } from './search-po.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DropdownModule } from 'primeng/dropdown';
import { PageLoaderModule } from '../../loader/page-loader/page-loader.module';

@NgModule({
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
  declarations: [SearchPoComponent],
  exports: [SearchPoComponent],
})
export class SearchPoModule { }
