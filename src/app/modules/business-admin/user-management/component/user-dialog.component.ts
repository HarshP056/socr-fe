import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserManagementComponent } from '../user-management.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChannelService, CommonService, OcrProjectService, StorageService } from 'src/app/services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnDestroy, OnInit {
  user: any = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    invalidPasswordAttempts:0
  };
  rolesOptions: any = [];
  showForm: boolean = false;
  userLoggedIn: any;
  channelOptions: any = [];
  ocrProjectOptions: any = [];
  selectedChannel: any = [];
  selectedProject: any = [];

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private storageService: StorageService,
    private commonService: CommonService,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    private channelService : ChannelService,
    private ocrProjectService : OcrProjectService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.userLoggedIn = this.storageService.getUser();
    console.log(this.userLoggedIn);
    if (this.data) {
      this.getUser();
    } else {
      this.user = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
      };
    }
    this.getAllRoles();
    this.getAllChannels();
    this.getAllOcrProjects();
    this.showForm = true;
  }

  spaceNotAllowed(event: any) {
    if (event.target.selectionStart === 0 && event.code === 'Space') {
      event.prevenDefault();
    }
  }

  getUser() {
    this.userService.getUsersById(this.data).subscribe({
      next: (res: any) => {
        this.user = res;
        this.selectedChannel = this.user.channel;
        this.selectedProject = this.user.ocrProject;
        //console.log(this.oauthProfiles, 'oauth list...')
      },
      error: (err: any) => {
        console.log(err);
        // this.loader = false;
        // this._toastr.error('Something went wrong!', 'Error');
      },
    });
  }

  getAllRoles() {
    this.commonService.getRoles().subscribe({
      next: (res: any) => {
        this.rolesOptions = res;
      },
      error: (err: any) => {},
    });
  }

  getAllChannels() {
    this.channelService.getAllChannel().subscribe({
      next: (res: any) => {
        this.channelOptions = res;
        console.log(res)
      },
      error: (err: any) => {},
    });
  }

  getAllOcrProjects() {
    this.ocrProjectService.getOcrProfile().subscribe({
      next: (res: any) => {
        this.ocrProjectOptions = res;
        console.log(res)
      },
      error: (err: any) => {},
    });
  }

  submit() {
    console.log(this.user);
    this.saveUser()
    return
  }

  saveUser() {
    if (!this.data) {
      delete this.user.id;

      this.userService.saveUser(this.user).subscribe({
        next: (res: any) => {
          console.log(res.status);
          if (res.status === 'failed') {
            return;
          } else {
            this.dialogRef.close('success');
            return;
          }
        },
        error: (err: any) => {},
      });
    } else {
      this.userService.updateUser(this.user, this.data).subscribe({
        next: (res: any) => {
          if (res.status === 'failed') {
            return;
          } else {
            this.dialogRef.close('success');
            return;
          }
        },
        error: (err: any) => {},
      });
    }
  }

  ngOnDestroy() {}

  onChangeMultiselectChannel(event:any){
    this.user.channel = event
  }

  onChangeMultiselectProject(event:any){
    this.user.ocrProject = event
  }
}
