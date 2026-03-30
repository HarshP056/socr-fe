import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorLogsComponent } from './error-logs.component';
import { ErrorDialogComponent } from './component/error-dialog.component';
import { RouterModule, Routes } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BasicModalModule } from 'src/app/shared/modals/basic-modal/basic-modal.module';
import { AddCommentComponent } from './component/add-comment/add-comment.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DropdownModule } from 'primeng/dropdown';
const route: Routes = [{ path: '', component: ErrorLogsComponent }];

@NgModule({
  declarations: [ErrorLogsComponent, ErrorDialogComponent, AddCommentComponent],
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
    BasicModalModule
  ],
  providers: [
    NgDialogAnimationService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    BsModalService
  ],
})
export class ErrorLogsModule {}
