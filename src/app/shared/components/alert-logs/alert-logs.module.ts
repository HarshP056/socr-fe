import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { AlertLogsComponent } from './alert-logs.component';
import { MaterialModule } from '../../material/material.module';
import { PageLoaderModule } from '../../loader/page-loader/page-loader.module';



@NgModule({
  declarations: [
    AlertLogsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule,
    PageLoaderModule,
    FormsModule,
    PipeModule
  ],
  exports: [
    AlertLogsComponent
  ]
})
export class AlertLogsModule { }
