import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLoaderComponent } from './page-loader.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [PageLoaderComponent],
  exports: [PageLoaderComponent],
})
export class PageLoaderModule {}
