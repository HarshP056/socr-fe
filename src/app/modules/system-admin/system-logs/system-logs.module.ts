import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemLogsComponent } from './system-logs.component';
import { RouterModule, Routes } from '@angular/router';
import { SystemLogsRoutingModule } from './system-logs.routing';

const routes: Routes = [
  {
    path: '',
    component: SystemLogsComponent,
  },
];

@NgModule({
  declarations: [SystemLogsComponent],
  imports: [CommonModule, SystemLogsRoutingModule],
  exports: [RouterModule],
})
export class SystemLogsModule {}
