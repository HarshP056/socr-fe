import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelComponent } from './channel.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AddEmailComponent } from './components/add-email/add-email.component';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { BasicModalModule } from 'src/app/shared/modals/basic-modal/basic-modal.module';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { BasicEmailComponent } from './components/basic-email/basic-email.component';
import { EditChannelComponent } from './components/edit-channel/edit-channel.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { DeleteConfirmationModalModule } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.module';
import { ScannerComponent } from './components/scanner/scanner.component';
import { AddDataComponent } from './components/add-data/add-data.component';
import { ViewChannelLogComponent } from './components/view-channel-log/view-channel-log.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
const routes: Routes = [
  { path: '', component: ChannelComponent },
  { path: 'ftp-channel', component: BasicEmailComponent },
  { path: 'thick-client-channel', component: BasicEmailComponent },
  { path: 'basic-email-channel', component: BasicEmailComponent },
  { path: 'edit-channel/:id', component: BasicEmailComponent },
  { path: 'scanner', component: ScannerComponent },
];

@NgModule({
  declarations: [
    ChannelComponent,
    AddEmailComponent,
    BasicEmailComponent,
    EditChannelComponent,
    ScannerComponent,
    AddDataComponent,
    ViewChannelLogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    PageLoaderModule,
    BasicModalModule,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    MultiSelectModule,
    DropdownModule,
    DeleteConfirmationModalModule,
  ],
  providers: [
    BsModalService,
    NgDialogAnimationService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class ChannelModule {}
