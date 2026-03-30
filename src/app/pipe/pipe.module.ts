import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XmlPipe } from './xml.pipe';
import { FilterTable } from './filter-table.pipe';
import { SafePipe } from './url-safe.pipe';

@NgModule({
  declarations: [XmlPipe, FilterTable, SafePipe],
  exports: [XmlPipe, FilterTable, SafePipe],
  imports: [CommonModule],
})
export class PipeModule {}
