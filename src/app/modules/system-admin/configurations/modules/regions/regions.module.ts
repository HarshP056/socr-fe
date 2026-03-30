import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DeleteConfirmationModalModule } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.module';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { BasicModalModule } from 'src/app/shared/modals/basic-modal/basic-modal.module';
import { RouterModule, Routes } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { RegionsComponent } from './regions.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RegionDetailsComponent } from './region-details/region-details.component';

const routes: Routes = [
  { path: '', component: RegionsComponent },]

@NgModule({
  declarations: [RegionsComponent, RegionDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DeleteConfirmationModalModule,
    PageLoaderModule,
    MatDialogModule,
    FormsModule,
    DropdownModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    NgDialogAnimationService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    BsModalService
  ],
})
export class RegionsModule {}
