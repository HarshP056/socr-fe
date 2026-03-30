import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationsComponent } from './configurations.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationsComponent,
  },
  {
    path: 'channel',
    loadChildren: () =>
      import('./modules/channel/channel.module').then((m) => m.ChannelModule),
  },
  {
    path: 'email-templates',
    loadChildren: () =>
      import('./modules/email-templates/email-templates.module').then(
        (m) => m.EmailTemplatesModule
      ),
  },
  {
    path: 'ocr-projects',
    loadChildren: () =>
      import('./modules/ocr-project/ocr-project.module').then(
        (m) => m.OcrProjectModule
      ),
  },
  {
    path: 'metadata-mapping',
    loadChildren: () =>
      import('./modules/metadata-mapping/metadata-mapping.module').then(
        (m) => m.MetadataMappingModule
      ),
  },
  {
    path: 'docid-range',
    loadChildren: () =>
      import('../system-settings/doc-id-range/doc-id-range.module').then(
        (m) => m.DocIdRangeModule
      ),
    }

    // {
    //   path: 'ocr-profile',
    //   loadChildren: () =>
    //     import('./modules/ocr-profile/ocr-profile.module').then(
    //       (m) => m.OcrProfileModule
    //     ),
    // },
    // {
    //   path: 'ocr-field-mapping',
    //   loadChildren: () =>
    //     import('./modules/ocr-field-mapping/ocr-field-mapping.module').then(
    //       (m) => m.OCRFieldMappingModule
    //     ),
    // },
    // {
    //   path: 'region',
    //   loadChildren: () =>
    //     import('./modules/regions/regions.module').then((m) => m.RegionsModule),
    // },
    // {
    //   path: 'job-details',
    //   loadChildren: () =>
    //     import('./modules/Job-Details/Job-Details.module').then(
    //       (m) => m.JobDetailsModule
    //     ),
    // },
  ,
  {
    path: 'fraud-detection',
    loadChildren: () =>
      import('./modules/ai-prompts/ai-prompts.module').then(
        (m) => m.AIPromptModule
      ),
  },
    // {
    //   path: 'system-properties',
    //   loadChildren: () =>
    //     import('../system-settings/system-properties/system-properties.module').then(
    //       (m) => m.SystemPropertiesModule
    //     ),
    // },
  {
    path: 'email-classification',
    loadChildren: () =>
      import('./modules/email-classification-config/email-classification-config.module').then(
        (m) => m.EmailClassificationConfigModule
      ),
  },
  {
    path: 'xinvoice-mapping',
    loadChildren: () =>
      import('./modules/xinvoice-mapping-config/xinvoice-mapping-config.module').then(
        (m) => m.XInvoiceMappingConfigModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}
