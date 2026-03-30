import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SystemSettingsComponent } from './system-settings.component';

import { SystemSettingsRoutingModule } from './system-settings.routing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  {
    path: '',
    component: SystemSettingsComponent,
  },
];

@NgModule({
  declarations: [SystemSettingsComponent],
  imports: [CommonModule, SystemSettingsRoutingModule, FontAwesomeModule],
  exports: [RouterModule],
})
export class SystemSettingsModule {}
