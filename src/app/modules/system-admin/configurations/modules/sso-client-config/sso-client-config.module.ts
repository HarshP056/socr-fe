import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SsoClientConfigComponent } from './sso-client-config.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DeleteConfirmationModalModule } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.module';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { SaveSsoClientConfigComponent } from './save-sso-client-config/save-sso-client-config.component';

const routes: Routes = [{ path: '', component: SsoClientConfigComponent }];

@NgModule({
  declarations: [SsoClientConfigComponent, SaveSsoClientConfigComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DeleteConfirmationModalModule,
    PageLoaderModule,
    FormsModule,
    MaterialModule,
  ],
})
export class SSOClientConfigModule {}
