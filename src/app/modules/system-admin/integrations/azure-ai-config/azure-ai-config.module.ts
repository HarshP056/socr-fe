import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AzureAiConfigComponent } from './azure-ai-config.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { PageLoaderModule } from 'src/app/shared/loader/page-loader/page-loader.module';
import { OpenAzureAiDialogComponent } from './open-azure-ai-dialog/open-azure-ai-dialog.component';

const routes: Routes = [{ path: '', component: AzureAiConfigComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatMenuModule,
    DropdownModule,
    PageLoaderModule
  ],
  declarations: [AzureAiConfigComponent, OpenAzureAiDialogComponent]
})
export class AzureAiConfigModule { }
