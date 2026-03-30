import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-basic-modal',
  templateUrl: './basic-modal.component.html',
  styleUrls: ['./basic-modal.component.scss'],
  standalone: false
})
export class BasicModalComponent {
  @Input() heading: string = 'Modal open';
  @Input() ignoreBackdropClick: boolean = true;

  @Output() hidden: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnBackdrop: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modalTemplate', { static: false }) template: any;

  templateRef: TemplateRef<any>;
  modalRef?: BsModalRef;
  config: ModalOptions = {
    animated: true,
    keyboard: true,
    ignoreBackdropClick: this.ignoreBackdropClick,
    class: 'modal-dialog-centered',
  };

  constructor(
    private modalService: BsModalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges() {
    this.cdr.detectChanges();
    this.modalService.onHidden.subscribe((reason: string) => {
      if (reason === 'backdrop-click') {
        this.OnBackdrop.emit();
      }
      if (reason === 'esc') {
        this.hidden.emit();
      }
    });
  }

  show() {
    this.modalRef = this.modalService.show(this.template, this.config);
  }
  hide(event?: any) {
    this.modalService.hide();
  }
}
