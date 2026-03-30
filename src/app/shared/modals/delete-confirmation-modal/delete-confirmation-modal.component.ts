import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.scss'],
})
export class DeleteConfirmationModalComponent {
  @Input() ignoreBackdropClick: boolean = true;
  @Output() hidden: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnBackdrop: EventEmitter<any> = new EventEmitter<any>();
  @Input() isLoading: boolean = false;
  @Input() content: string = 'Are you sure you want to delete it?';
  @Input() deleteBtnText: string = 'Yes, Delete it';
  @Input() title: string = 'Delete';
  @Output() yes: EventEmitter<null> = new EventEmitter<null>();
  @Output() no: EventEmitter<null> = new EventEmitter<null>();
  @ViewChild('modalTemplate', { static: false }) template: any;

  modalRef: BsModalRef;
  modalRefs: BsModalRef[] = [];
  config: ModalOptions = {
    animated: true,
    keyboard: true,
    ignoreBackdropClick: this.ignoreBackdropClick,
    class: 'modal-dialog-centered',
  };

  constructor(private modalService: BsModalService) {}

  ngOnInit() {
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

  closeAllModals() {
    this.modalRefs.forEach((modal) => modal.hide());
  }

  hide(event?: any) {
    this.modalService.hide();
  }
}
