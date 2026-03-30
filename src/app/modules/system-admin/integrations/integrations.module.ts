import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IntegrationsComponent } from './integrations.component';
import { IntegrationsRoutingModule } from './integrations.routing';
import { BasicModalModule } from 'src/app/shared/modals/basic-modal/basic-modal.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [IntegrationsComponent],
  imports: [CommonModule, IntegrationsRoutingModule, BasicModalModule, DropdownModule, FormsModule, BsDatepickerModule.forRoot(),],
  exports: [RouterModule],
})
export class IntegrationsModule {}
