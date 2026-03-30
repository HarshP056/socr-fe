import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { DeleteConfirmationModalModule } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.module';

import { XInvoiceMappingConfigComponent } from './xinvoice-mapping-config.component';
import { XInvoiceMappingConfigEditComponent } from './xinvoice-mapping-config-edit/xinvoice-mapping-config-edit.component';

const routes: Routes = [
  { path: '', component: XInvoiceMappingConfigComponent },
  { path: 'create', component: XInvoiceMappingConfigEditComponent },
  { path: 'edit/:id', component: XInvoiceMappingConfigEditComponent },
];

@NgModule({
  declarations: [
    XInvoiceMappingConfigComponent,
    XInvoiceMappingConfigEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatMenuModule,
    MatRippleModule,
    PageLoaderModule,
    DeleteConfirmationModalModule,
  ],
})
export class XInvoiceMappingConfigModule {}
