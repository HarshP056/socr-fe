import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { Routes } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgDialogAnimationService } from 'ng-dialog-animation';

const route: Routes = [{ path: '', component: UploadFileComponent }];

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    PageLoaderModule,
    DropdownModule
  ],
  declarations: [UploadFileComponent],
  providers: [
    NgDialogAnimationService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class UploadFileModule { }
