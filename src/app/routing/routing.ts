import { Routes } from '@angular/router';

const routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'ocr-q',
    loadChildren: () =>
      import('../modules/ocr-q/ocr-q.module').then((m) => m.OcrQModule),
  },
  {
    path: 'socr-ocr-q',
    loadChildren: () =>
      import('../modules/socr-ocr-q/ocr-q.module').then((m) => m.SOCROCRQModule),
  },
  {
    path: 'socr-ocr-studio',
    loadChildren: () =>
      import('../modules/socr-ocr-studio/socr-ocr-studio.module').then((m) => m.SocrOcrStudioModule),
  },
  {
    path: 'business-admin',
    loadChildren: () =>
      import('../modules/business-admin/business-admin.module').then(
        (m) => m.BusinessAdminModule
      ),
  },
  {
    path: 'system-admin',
    loadChildren: () =>
      import('../modules/system-admin/system-admin.module').then(
        (m) => m.SystemAdminModule
      ),
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
];

export { routing };
