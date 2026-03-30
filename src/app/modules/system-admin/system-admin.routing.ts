import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemAdminComponent } from './system-admin.component';

const routes: Routes = [
  {
    path: '',
    component: SystemAdminComponent,
    children: [
      { path: '', redirectTo: 'configurations', pathMatch: 'full' },
      {
        path: 'configurations',
        loadChildren: () =>
          import('./configurations/configurations.module').then(
            (m) => m.ConfigurationsModule
          ),
      },
      {
        path: 'integrations',
        loadChildren: () =>
          import('./integrations/integrations.module').then(
            (m) => m.IntegrationsModule
          ),
      },
      {
        path: 'test',
        loadChildren: () =>
          import('./test/test.module').then(
            (m) => m.TestModule
          ),
      },
      {
        path: 'system-settings',
        loadChildren: () =>
          import('./system-settings/system-settings.module').then(
            (m) => m.SystemSettingsModule
          ),
      },
      {
        path: 'system-logs',
        loadChildren: () =>
          import('./system-logs/system-logs.module').then(
            (m) => m.SystemLogsModule
          ),
      },
      {
        path: 'intelligence-hub',
        loadChildren: () =>
          import('./intelligence-hub/intelligence-hub.module').then(
            (m) => m.IntelligenceHubModule
          ),
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemAdminRoutingModule {}
