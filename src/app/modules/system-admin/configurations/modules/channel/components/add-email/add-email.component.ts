import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';
import { OauthProfileService } from 'src/app/services/oauth-profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-email',
  templateUrl: './add-email.component.html',
  styleUrls: ['./add-email.component.scss'],
})
export class AddEmailComponent {
  cannelObject: any = {};
  isWait: boolean = false;
  showSubmitSection: boolean = false;
  showEmailDropdown: boolean = true;
  emailTypeCheckbox: any = 'oathemail';
  // basicemail
  @Input() editChannel: any = 'new';
  @Input() getChannel: any;
  @Output() onsubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onclose: EventEmitter<null> = new EventEmitter<null>();
  outhDetails: any;
  en = environment.apiUrl;
  clientId: any;
  userEmail: any;
  showUserEmail: boolean = false;
  constructor(
    private channelService: ChannelService,
    private router: Router,
    private oauthProfileService: OauthProfileService
  ) {}
  ngOnInit(): void {
    this.getClient();
    if (this.editChannel === 'edit') {
      this.getById();
    }
    return;
  }

  changeEmailSection() {
    if (this.emailTypeCheckbox === 'oathemail') {
      if (this.clientId) {
        if (this.showUserEmail) {
          window.open(
            `${this.en}auth2/signin/${this.clientId}` +
              `?userEmail=${this.userEmail}`,
            'mywindow',
            `width=${window.innerWidth},height=${window.innerHeight}`
          );
        } else {
          window.open(
            `${this.en}auth2/signin/${this.clientId}`,
            'mywindow',
            `width=${window.innerWidth},height=${window.innerHeight}`
          );
        }
      }
    } else if (this.emailTypeCheckbox === 'basicemail') {
      this.showSubmitSection = false;
      this.router.navigate([
        '/system-admin/configurations/channel/basic-email-channel',
      ]);
      this.close();
    }
  }
  onChange(val: any) {
    if (val === 'oathemail') {
      this.emailTypeCheckbox = val;
      this.showEmailDropdown = true;
    } else if (val === 'basicemail') {
      this.emailTypeCheckbox = val;
      this.showEmailDropdown = false;
    }
  }

  private getClient() {
    this.oauthProfileService.getOathdetail().subscribe({
      next: (res: any) => {
        this.outhDetails = res;
      },
      error: (error) => {},
    });
  }

  onChangeClient(event: any) {
    console.log(event.value.type);
    if (event.value.type === 'ms-graph' || event.value.type === 'ms-imap') {
      this.showUserEmail = true;
      this.clientId = event.value.clientId;
    } else {
      this.clientId = event.value.clientId;
      this.showUserEmail = false;
      this.userEmail = '';
    }
  }
  // get by id
  private getById() {
    this.channelService.getByIdChannel(this.getChannel.id).subscribe({
      next: (res: any) => {
        this.cannelObject = res['result'];
      },
      error: (err: any) => {},
    });
  }
  // get by id

  close() {
    this.editChannel = 'new';
    this.onclose.emit();
  }

  spaceNotAllowed(event: any) {
    if (event.target.selectionStart === 0 && event.code === 'Space') {
      event.prevenDefault();
    }
  }

  submit() {
    this.isWait = true;
    if (this.editChannel === 'edit') {
      this.updateObject(this.getChannel.id);
    } else {
      this.postObject();
    }
  }

  private postObject() {
    this.channelService.postChannel({ ...this.cannelObject }).subscribe({
      next: (res: any) => {
        this.editChannel = 'new';
        this.isWait = false;
        this.onsubmit.emit();
      },
      error: (err: any) => {
        this.isWait = false;
      },
    });
  }

  private updateObject(id: any) {
    this.channelService.putChannel({ ...this.cannelObject }, id).subscribe({
      next: (res: any) => {
        this.editChannel = 'new';
        this.isWait = false;
        this.onsubmit.emit();
      },
      error: (err: any) => {
        this.isWait = false;
      },
    });
  }
}
