import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { OathProfileComponent } from './oath-profile.component';
import { OathDialogComponent } from './component/oath-dialog.component';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { DropdownModule } from 'primeng/dropdown';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { HelpDocsComponent } from './component/help-docs/help-docs.component';

const routes: Routes = [{ path: '', component: OathProfileComponent }];

@NgModule({
  declarations: [OathProfileComponent, OathDialogComponent, HelpDocsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatMenuModule,
    DropdownModule,
    PageLoaderModule
  ],
  providers: [
    NgDialogAnimationService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class OathProfileModule {}
