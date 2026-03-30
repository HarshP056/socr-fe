import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntelligenceHubComponent } from './intelligence-hub.component';
const routes: Routes = [
  {
    path: '',
    component: IntelligenceHubComponent,
  },
  // {
  //   path: 'vendor-determination',
  //   loadChildren: () =>
  //     import('../configurations/modules/vendor-determination/vendor-determination.module').then(
  //       (m) => m.VendorDeterminationModule
  //     ),
  // },
  {
    path: 'fraud-detection',
    loadChildren: () =>
      import('../configurations/modules/ai-prompts/ai-prompts.module').then(
        (m) => m.AIPromptModule
      ),
  },
  {
    path: 'ai-prompt',
    loadChildren: () =>
      import('./rfp-ai-prompt-config/rfp-ai-prompt-config.module').then(
        (m) => m.RfpAiPromptConfigModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntelligenceHubRoutingModule {}
