import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostedInvoiceDataComponent } from './posted-invoice-data.component';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { UploadFileModule } from '../upload-file/upload-file.module';
import { EditPostedInvoiceDataComponent } from './edit-posted-invoice-data/edit-posted-invoice-data.component';

const route: Routes = [
  { path: '', component: PostedInvoiceDataComponent },
  { path: 'edit/:id', component: EditPostedInvoiceDataComponent }
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
    FormsModule,
    PageLoaderModule,
    UploadFileModule
  ],
  declarations: [PostedInvoiceDataComponent, EditPostedInvoiceDataComponent]
})
export class PostedInvoiceDataModule { }
