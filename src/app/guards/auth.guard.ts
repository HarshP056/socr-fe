import { StorageService } from '../services/storage.service';
import { MessageUserService } from '../services/message-user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationGuard {

  constructor(
    private storage: StorageService,
    private messageUserService: MessageUserService
  ) {}

  canActivate(): boolean {
    const user = this.storage.getUser();
    this.messageUserService.loginUser = user;
    if (user) return true;
    this.storage.logout();
    return false;
  }
}
