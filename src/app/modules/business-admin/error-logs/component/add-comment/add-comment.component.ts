import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StorageService } from 'src/app/services';
import { ExceptionService } from 'src/app/services/error.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent {
  resolved: any = {
    comment: '',
    resolvedBy: '',
    // scope: '',
  };

  @Input() txtId: any;
  @Input() status: any;
  isWait: boolean = false;
  @Output() onsubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onclose: EventEmitter<null> = new EventEmitter<null>();
  searching: boolean;
  searchFailed: boolean;
  selectedUser: string = '';
  user: any = {};
  constructor(
    private exceptionLogService: ExceptionService,
    private storage: StorageService
  ) {}
  ngOnInit(): void {
    this.user = this.storage.getUser();
    console.log(this.user);
  }

  close() {
    // this.editactivity = false;
    this.onclose.emit();
  }

  spaceNotAllowed(event: any) {
    if (event.target.selectionStart === 0 && event.code === 'Space') {
      event.prevenDefault();
    }
  }

  submit() {
    this.isWait = true;
    this.UpdateResolved();
    return;
  }

  private UpdateResolved() {
    const obj = {
      status: 'RESOLVED',
      comment: this.resolved.comment,
      resolvedBy: this.user?.email,
    };
    this.exceptionLogService.updateExceptionResolver(this.txtId, obj).subscribe({
      next: (res: any) => {
        this.isWait = false;
        this.onsubmit.emit(res);
      }
    });
  }
}
