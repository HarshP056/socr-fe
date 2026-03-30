import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GstComponent } from './gst.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { UploadFileModule } from '../upload-file/upload-file.module';
import { GstDialogComponent } from './gst-dialog/gst-dialog.component';

const route: Routes = [{ path: '', component: GstComponent }];

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
  declarations: [GstComponent, GstDialogComponent]
})
export class GstModule { }
