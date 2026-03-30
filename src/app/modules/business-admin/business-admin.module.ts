import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessAdminComponent } from './business-admin.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: BusinessAdminComponent },
  {
    path: 'roles',
    loadChildren: () =>
      import('./roles/roles.module').then((m) => m.RolesModule),
  },
  {
    path: 'user-management',
    loadChildren: () =>
      import('./user-management/user-management.module').then(
        (m) => m.UserManagementModule
      ),
  },
  // {
  //   path: 'error-log',
  //   loadChildren: () =>
  //     import('./error-logs/error-logs.module').then((m) => m.ErrorLogsModule),
  // },
  // {
  //   path: 'erp-sync-log',
  //   loadChildren: () =>
  //     import('./erp-sync-logs/erp-sync-logs.module').then(
  //       (m) => m.ERPLogsModule
  //     ),
  // },
  // {
  //   path: 'application-log',
  //   loadChildren: () =>
  //     import('./application-log/application-log.module').then(
  //       (m) => m.ApplicationLogModule
  //     ),
  // },
  // {
  //   path: 'ocr-q-log',
  //   loadChildren: () =>
  //     import('./ocr-q/ocr-q.module').then((m) => m.OcrQModule),
  // },
  {
    path: 'channel',
    loadChildren: () =>
      import('./channel/channel.module').then((m) => m.ChannelModule),
  },
  // {
  //   path: 'cron-logs',
  //   loadChildren: () =>
  //     import('./cron-logs/cron-logs.module').then(
  //       (m) => m.CronLogsModule
  //     ),
  // },
  {
    path: 'vendor-management',
    loadChildren: () =>
      import('./vendor-management/vendor-management.module').then(
        (m) => m.VendorManagementModule
      ),
  },
  {
    path: 'purchase-order',
    loadChildren: () =>
      import('./purchase-order/purchase-order.module').then(
        (m) => m.PurchaseOrderModule
      ),
  },
  {
    path: 'conditional-mapping',
    loadChildren: () =>
      import('./conditional-mapping/conditional-mapping.module').then(
        (m) => m.ConditionalMappingModule
      ),
  },
  {
    path: 'gst',
    loadChildren: () =>
      import('./gst/gst.module').then(
        (m) => m.GstModule
      ),
  },
  {
    path: 'posted-invoice-data',
    loadChildren: () =>
      import('./posted-invoice-data/posted-invoice-data.module').then(
        (m) => m.PostedInvoiceDataModule
      ),
  },
  {
    path: 'invoice-buffer-report',
    loadChildren: () =>
      import('./invoice-buffer-report/invoice-buffer-report.module').then(
        (m) => m.InvoiceBufferReportModule
      ),
  },
];

@NgModule({
  declarations: [BusinessAdminComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class BusinessAdminModule {}
