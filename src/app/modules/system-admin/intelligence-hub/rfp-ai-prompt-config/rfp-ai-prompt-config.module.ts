import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RfpAiPromptConfigComponent } from './rfp-ai-prompt-config.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { DeleteConfirmationModalModule } from 'src/app/shared/modals/delete-confirmation-modal/delete-confirmation-modal.module';
import { MatSliderModule } from '@angular/material/slider';
import { RfpAiPromptConfigCreateComponent } from './rfp-ai-prompt-config-create/rfp-ai-prompt-config-create.component';

const routes: Routes = [
  { path: '', component: RfpAiPromptConfigComponent },
  { path: 'create', component: RfpAiPromptConfigCreateComponent },
  { path: 'edit-rfp-ai-prompt/:id', component: RfpAiPromptConfigCreateComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatMenuModule,
    DropdownModule,
    PageLoaderModule,
    MatPaginatorModule,
    DeleteConfirmationModalModule,
    MatSortModule,
    PipeModule,
    MatSliderModule
  ],
  declarations: [RfpAiPromptConfigComponent, RfpAiPromptConfigCreateComponent]
})
export class RfpAiPromptConfigModule { }
