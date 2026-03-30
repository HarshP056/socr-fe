import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseConfigComponent } from './license-config.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ClipboardModule } from '@angular/cdk/clipboard';

const routes: Routes = [{ path: '', component: LicenseConfigComponent }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    RouterModule.forChild(routes),
    ClipboardModule,
  ],
  declarations: [LicenseConfigComponent]
})
export class LicenseConfigModule { }
