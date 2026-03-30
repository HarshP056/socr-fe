import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationLogComponent } from './application-log.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { BasicModalModule } from 'src/app/shared/modals/basic-modal/basic-modal.module';

const routes: Routes = [{ path: '', component: ApplicationLogComponent }];

@NgModule({
  declarations: [ApplicationLogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    PageLoaderModule,
    BasicModalModule,
    FormsModule,
  ],
})
export class ApplicationLogModule {}
