import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemSettingsComponent } from './system-settings.component';

const routes: Routes = [
  {
    path: '',
    component: SystemSettingsComponent,
  },
  {
    path: 'license-config',
    loadChildren: () =>
      import('./license-config/license-config.module').then(
        (m) => m.LicenseConfigModule
      ),
  },
  {
    path: 'cron-logs',
    loadChildren: () =>
      import('../../business-admin/cron-logs/cron-logs.module').then(
        (m) => m.CronLogsModule
      ),
  },
  {
    path: 'spring-job',
    loadChildren: () =>
      import('./../configurations/modules/spring-job/spring-job.module').then((m) => m.SpringJobModule),
  },
  {
    path: 'system-properties',
    loadChildren: () =>
       import('./system-properties/system-properties.module').then(
        (m) => m.SystemPropertiesModule
      ),
  },
  {
    path: 'admin-email-config',
    loadChildren: () =>
      import('./admin-email-config/admin-email-config.module').then(
        (m) => m.AdminEmailConfigModule
      ),
  },
   {
    path: 'socr-system-config',
    loadChildren: () =>
      import('./socr-system-config/socr-system-config.module').then(
        (m) => m.SocrSystemConfigModule
      ),
  },
  {
    path: 'logical-system',
    loadChildren: () =>
      import('./logical-systems/logical-system.module').then(
        (m) => m.LogicalSystemModule
      ),
},
  // {
  // {
  //   path: 'smartkey-store-config',
  //   loadChildren: () =>
  //     import('./smart-key-system/smart-key-system.module').then(
  //       (m) => m.SmartKeySystemConfigModule
  //     ),
  // },
  // {
  //   path: 'system-config',
  //   loadChildren: () =>
  //     import('./system-config/system-config.module').then(
  //       (m) => m.SystemConfigModule
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemSettingsRoutingModule {}
