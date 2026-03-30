import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CronLogsComponent } from './cron-logs.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DropdownModule } from 'primeng/dropdown';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { BasicModalModule } from 'src/app/shared/modals/basic-modal/basic-modal.module';
import { ExecutionLogsComponent } from './execution-logs/execution-logs.component';

const route: Routes = [{ path: '', component: CronLogsComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    PipeModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    DropdownModule,
    MatSortModule,
    MatDialogModule,
    MatTooltipModule,
    PageLoaderModule,
    BsDatepickerModule.forRoot(),
    BasicModalModule,
    MatSlideToggleModule
  ],
  declarations: [CronLogsComponent, ExecutionLogsComponent]
})
export class CronLogsModule { }
