import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcrQComponent } from './ocr-q.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { BasicModalModule } from 'src/app/shared/modals/basic-modal/basic-modal.module';
import { DropdownModule } from 'primeng/dropdown';
const routes: Routes = [{ path: '', component: OcrQComponent }];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    PageLoaderModule,
    BasicModalModule,
    FormsModule,
    DropdownModule,
  ],
  declarations: [OcrQComponent],
})
export class OcrQModule {}
