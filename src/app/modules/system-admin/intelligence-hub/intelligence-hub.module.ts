import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntelligenceHubComponent } from './intelligence-hub.component';
import { IntelligenceHubRoutingModule } from './intelligence-hub.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,IntelligenceHubRoutingModule
  ],
  declarations: [IntelligenceHubComponent],
  exports: [RouterModule]
})
export class IntelligenceHubModule { }
