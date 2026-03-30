import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemAdminComponent } from './system-admin.component';
import { SystemAdminRoutingModule } from './system-admin.routing';


@NgModule({
  declarations: [SystemAdminComponent],
  imports: [CommonModule, SystemAdminRoutingModule],
})

export class SystemAdminModule {}
