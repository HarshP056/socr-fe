import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfDocumentViewerComponent } from './pdf-document-viewer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { PipeModule } from 'src/app/pipe/pipe.module';



@NgModule({
  declarations: [
    PdfDocumentViewerComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    PipeModule
  ],
  exports: [PdfDocumentViewerComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
  
})
export class PdfDocumentViewerModule { }
