import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailClassificationConfigComponent } from './email-classification-config.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { DeleteConfirmationModalModule } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CreateEmailClassificationComponent } from './component/create-email-classification/create-email-classification.component';
import { WorkflowComponent } from './component/workflow/workflow.component';
import { CreateEmailClassifierWorkflowComponent } from './component/workflow/component/create-workflow/create-workflow.component';

const routes: Routes = [
  { path: '', component: EmailClassificationConfigComponent },
  { path: 'create', component: CreateEmailClassificationComponent },
  { path: 'create/:id', component: CreateEmailClassificationComponent },
  { path: 'edit/:id', component: CreateEmailClassificationComponent},
  { path: ':id/workflows', component: WorkflowComponent},
  { path: ':id/workflows/create', component: CreateEmailClassifierWorkflowComponent},
  { path: ':id/workflows/edit/:workflowId', component: CreateEmailClassifierWorkflowComponent}
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
    PipeModule,
    MatSliderModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    FontAwesomeModule
  ],
  declarations: [EmailClassificationConfigComponent, CreateEmailClassificationComponent, WorkflowComponent, CreateEmailClassifierWorkflowComponent]
})
export class EmailClassificationConfigModule { }
