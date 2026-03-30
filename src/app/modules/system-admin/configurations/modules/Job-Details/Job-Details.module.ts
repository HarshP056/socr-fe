import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobDetailsComponent } from './Job-Details.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DeleteConfirmationModalModule } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.module';
import { UpdateJobsComponent } from './components/update-jobs/update-jobs.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { BsModalService } from 'ngx-bootstrap/modal';
import { JobLogsComponent } from './components/job-logs/job-logs.component';
import { TriggeredJobsComponent } from './components/triggered-jobs/triggered-jobs.component';
const routes: Routes = [{ path: '', component: JobDetailsComponent }];
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    DeleteConfirmationModalModule,
    PageLoaderModule,
    FormsModule,
    DropdownModule,
    RouterModule.forChild(routes),
  ],
  declarations: [JobDetailsComponent, UpdateJobsComponent, JobLogsComponent, TriggeredJobsComponent],
  providers: [
    BsModalService,
    NgDialogAnimationService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class JobDetailsModule {}
