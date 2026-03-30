import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { ChangePasswordComponent } from './change-password.component';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    PipeModule,
    PasswordModule,
    DividerModule,
  ],
  exports: [ChangePasswordComponent],
})
export class ChangePasswordModule {}
