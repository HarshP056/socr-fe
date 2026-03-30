import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegrationsComponent } from './integrations.component';
const routes: Routes = [
  {
    path: '',
    component: IntegrationsComponent,
  },
  {
    path: 'smartstore-config',
    loadChildren: () =>
      import('./../configurations/modules/smartstore-config/smartstore-config.module').then(
        (m) => m.SmartstoreConfigModule
      ),
  },
  {
    path: 'openai-config',
    loadChildren: () =>
      import('./../configurations/modules/open-ai-config/open-ai-config.module').then(
        (m) => m.OpenAiConfigModule
      ),
  },
  {
    path: 'sso-client-config',
    loadChildren: () =>
      import('./../configurations/modules/sso-client-config/sso-client-config.module').then(
        (m) => m.SSOClientConfigModule
      ),
  },
  {
    path: 'auth-profile',
    loadChildren: () =>
      import('./../configurations/modules/oath-profile/oath-profile.module').then(
        (m) => m.OathProfileModule
      ),
  },
  {
    path: 'application',
    loadChildren: () =>
      import('./../configurations/modules/application/application.module').then(
        (m) => m.ApplicationModule
      ),
  },
  {
    path: 'azure-ai-config',
    loadChildren: () =>
      import('./azure-ai-config/azure-ai-config.module').then(
        (m) => m.AzureAiConfigModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntegrationsRoutingModule {}
