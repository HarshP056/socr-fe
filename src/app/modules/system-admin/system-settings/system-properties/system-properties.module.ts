import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ClipboardModule } from "@angular/cdk/clipboard";
import { SystemPropertiesComponent } from './system-properties.component';

const routes: Routes = [{ path: '', component: SystemPropertiesComponent }];

@NgModule({
  declarations: [SystemPropertiesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxJsonViewerModule,
    ClipboardModule
   
  ],
  providers: [
    NgDialogAnimationService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class SystemPropertiesModule {}
