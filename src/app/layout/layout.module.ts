import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { routing } from '../routing/routing';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BasicModalModule } from '../shared/modals/basic-modal/basic-modal.module';
import { ChangePasswordComponent } from '../shared/components/change-password/change-password.component';
import { ChangePasswordModule } from '../shared/components/change-password/change-password.module';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { AlertLogsModule } from '../shared/components/alert-logs/alert-logs.module';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: routing },
];

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    BasicModalModule,
    ChangePasswordModule,
    AlertLogsModule
  ],
  exports: [RouterModule],
  providers: [
    BsModalService,
    NgDialogAnimationService,
  ],
})
export class LayoutModule {}
