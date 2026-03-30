import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemLogsComponent } from './system-logs.component';

const routes: Routes = [
  {
    path: '',
    component: SystemLogsComponent,
  },
  {
    path: 'error-log',
    loadChildren: () =>
      import('../../business-admin/error-logs/error-logs.module').then((m) => m.ErrorLogsModule),
  },
  {
    path: 'erp-sync-log',
    loadChildren: () =>
      import('../../business-admin/erp-sync-logs/erp-sync-logs.module').then(
        (m) => m.ERPLogsModule
      ),
  },
  {
    path: 'application-log',
    loadChildren: () =>
      import('../../business-admin/application-log/application-log.module').then(
        (m) => m.ApplicationLogModule
      ),
  },
  {
    path: 'ocr-q-log',
    loadChildren: () =>
      import('../../business-admin/ocr-q/ocr-q.module').then((m) => m.OcrQModule),
  },
  {
    path: 'file-logs',
    loadChildren: () =>
      import('../../system-admin/system-logs/file-logs/file-logs.module').then((m) => m.FileLogsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemLogsRoutingModule {}
