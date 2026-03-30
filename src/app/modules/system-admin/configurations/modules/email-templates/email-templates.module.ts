import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { DropdownModule } from 'primeng/dropdown';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DeleteConfirmationModalModule } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.module';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { EmailTemplatesComponent } from './email-templates.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EmailTemplateDetailsComponent } from './component/email-template-details/email-template-details.component';
import { CreateTemplateComponent } from './component/create-template/create-template.component';

const route: Routes = [
  { path: '', component: EmailTemplatesComponent },
  { path: 'create-email-template', component: CreateTemplateComponent },
  { path: 'edit-email-template/:id', component: CreateTemplateComponent },
];

@NgModule({
  declarations: [
    EmailTemplatesComponent,
    EmailTemplateDetailsComponent,
    CreateTemplateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    DropdownModule,
    PageLoaderModule,
    DeleteConfirmationModalModule,
    ClipboardModule,
    MatSlideToggleModule,
  ],
  providers: [
    NgDialogAnimationService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    BsModalService,
  ],
})
export class EmailTemplatesModule {}
