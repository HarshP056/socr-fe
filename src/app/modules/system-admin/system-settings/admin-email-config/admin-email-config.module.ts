import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminEmailConfigComponent } from './admin-email-config.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';

const routes: Routes = [{ path: '', component: AdminEmailConfigComponent }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    RouterModule.forChild(routes),
    ClipboardModule,
  ],
  declarations: [AdminEmailConfigComponent]
})
export class AdminEmailConfigModule { }
