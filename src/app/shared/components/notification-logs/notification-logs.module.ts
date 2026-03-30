import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationLogsComponent } from './notification-logs.component';
import { PageLoaderModule } from '../../loader/page-loader/page-loader.module';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule, PageLoaderModule],
  declarations: [NotificationLogsComponent],
  exports: [NotificationLogsComponent],
})
export class NotificationLogsModule {}
