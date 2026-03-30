import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcrProfileComponent } from './ocr-profile.component';
import { CreateOcrProfileComponent } from './components/create-ocr-profile/create-ocr-profile.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DeleteConfirmationModalModule } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.module';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { BasicModalModule } from 'src/app/shared/modals/basic-modal/basic-modal.module';
import { RouterModule, Routes } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

const routes: Routes = [
  { path: '', component: OcrProfileComponent },
  { path: 'create-ocr-profile', component: CreateOcrProfileComponent },
  { path: 'edit-ocr-profile/:id', component: CreateOcrProfileComponent },
];
@NgModule({
  declarations: [OcrProfileComponent, CreateOcrProfileComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DeleteConfirmationModalModule,
    PageLoaderModule,
    FormsModule,
    DropdownModule,
    RouterModule.forChild(routes),
  ],
  providers: [BsModalService],
})
export class OcrProfileModule {}
