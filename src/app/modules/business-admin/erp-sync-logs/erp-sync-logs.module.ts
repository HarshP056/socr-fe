import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ERPSyncLogsComponent } from './erp-sync-logs.component';
import { ERPDialogComponent } from './component/erp-dialog.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BasicModalModule } from 'src/app/shared/modals/basic-modal/basic-modal.module';
import { ErpSearchComponent } from './component/erp-search/erp-search.component';

const route: Routes = [{ path: '', component: ERPSyncLogsComponent }];

@NgModule({
  declarations: [ERPSyncLogsComponent, ERPDialogComponent, ErpSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    PipeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    PageLoaderModule,
    MatTooltipModule,
    DropdownModule,
    BsDatepickerModule.forRoot(),
    BasicModalModule,

  ],
  providers: [
    NgDialogAnimationService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class ERPLogsModule {}
