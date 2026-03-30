import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicModalComponent } from './basic-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [BasicModalComponent],
  imports: [CommonModule, ModalModule],
  exports: [BasicModalComponent],
})
export class BasicModalModule {}
