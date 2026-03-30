import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorDeterminationComponent } from './vendor-determination.component';
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

const routes: Routes = [
  { path: '', component: VendorDeterminationComponent }
];

@NgModule({
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
  declarations: [VendorDeterminationComponent]
})
export class VendorDeterminationModule { }
