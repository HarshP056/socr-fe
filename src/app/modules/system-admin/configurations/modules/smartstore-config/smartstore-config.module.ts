import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartstoreConfigComponent } from './smartstore-config.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

const routes: Routes = [{ path: '', component: SmartstoreConfigComponent }];

@NgModule({
  declarations: [SmartstoreConfigComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DropdownModule],
})
export class SmartstoreConfigModule {}
