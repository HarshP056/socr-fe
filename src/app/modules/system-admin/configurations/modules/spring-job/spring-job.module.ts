import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DeleteConfirmationModalModule } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.module';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { SpringJobComponent } from './spring-job.component';
import { SpringLogsComponent } from './spring-logs/spring-logs.component';

const routes: Routes = [{ path: '', component: SpringJobComponent }];

@NgModule({
  declarations: [SpringJobComponent, SpringLogsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DeleteConfirmationModalModule,
    PageLoaderModule,
    FormsModule,
    MaterialModule,
  ],
})
export class SpringJobModule {}
