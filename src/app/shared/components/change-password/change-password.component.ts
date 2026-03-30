import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { StorageService } from 'src/app/services';
import { UserService } from 'src/app/services/user.service';
import { BasicModalComponent } from '../../modals/basic-modal/basic-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  standalone: false
})
export class ChangePasswordComponent {
  @Output() onsubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onclose: EventEmitter<null> = new EventEmitter<null>();
  query:any={
    newPassword:'',
    oldPassword: ''
  }
  isWait: boolean = false;

  constructor(private storage: StorageService, private userService: UserService, private modalService: BsModalService){}


  close() {
    this.modalService.hide();
  }

  submit() {
    this.isWait = true;
    this.userService.changeUserPassword(this.query).subscribe({
      next: (res: any) => {
        this.isWait = false;
        this.modalService.hide();
        this.storage.logout();
        document.location.reload();
      },
      error: (err)=>{
        this.isWait = false;
      }
    });
  }

  spaceNotAllowed(event: any) {
    if (event.target.selectionStart === 0 && event.code === 'Space') {
      event.prevenDefault();
    }
  }

}
