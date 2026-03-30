import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { DashboardComponent } from './dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, FormsModule, NgApexchartsModule, RouterModule.forChild(routes), DropdownModule, BsDatepickerModule.forRoot(),],
  exports: [RouterModule],
})
export class DashboardModule {}
