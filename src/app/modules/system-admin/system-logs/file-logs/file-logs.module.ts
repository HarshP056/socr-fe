import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileLogsComponent } from './file-logs.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { BasicModalModule } from 'src/app/shared/modals/basic-modal/basic-modal.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

const routes: Routes = [{ path: '', component: FileLogsComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    PageLoaderModule,
    BasicModalModule,
    FormsModule,
    DropdownModule,
    BsDatepickerModule.forRoot(),
],
  declarations: [FileLogsComponent]
})
export class FileLogsModule { }
