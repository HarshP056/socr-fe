import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocrSystemConfigComponent } from './socr-system-config.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { DeleteConfirmationModalModule } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.module';

const routes: Routes = [
  {path: '', component: SocrSystemConfigComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    PageLoaderModule,
    DeleteConfirmationModalModule,
    MatSlideToggleModule
],
  declarations: [SocrSystemConfigComponent]

})
export class SocrSystemConfigModule { }
