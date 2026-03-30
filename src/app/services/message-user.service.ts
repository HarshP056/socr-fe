import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageUserService {
  constructor() {}

  private previousUrlSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    undefined
  );

  previousUrlSubject$ = this.previousUrlSubject.asObservable();

  get previousUrl(): any {
    return this.previousUrlSubject.value;
  }

  set previousUrl(template: any) {
    this.previousUrlSubject.next(template);
  }

  //Sidebar

  private baSidebarSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    true
  );

  baSidebarSubject$ = this.baSidebarSubject.asObservable();

  get appSideBar(): boolean {
    return this.baSidebarSubject.value;
  }

  set appSidebar(val: boolean) {
    this.baSidebarSubject.next(val);
  }

  // Login user details
  private loginUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  loginUserSubject$ = this.loginUserSubject.asObservable();

  get loginUser(): any {
    return this.loginUserSubject.value;
  }

  set loginUser(val: any) {
    this.loginUserSubject.next(val);
  }

  // Session expired modal
  private sessionExpiredSubject: BehaviorSubject<any> =
    new BehaviorSubject<boolean>(false);

  sessionExpiredSubject$ = this.sessionExpiredSubject.asObservable();

  get sessionExpired(): boolean {
    return this.sessionExpiredSubject.value;
  }

  set sessionExpired(val: boolean) {
    this.sessionExpiredSubject.next(val);
  }

  // Last Login user
  private lastLoginUserSubject: BehaviorSubject<any> =
    new BehaviorSubject<boolean>(false);

  lastLoginUserSubject$ = this.lastLoginUserSubject.asObservable();

  get lastLoginUser(): boolean {
    return this.lastLoginUserSubject.value;
  }

  set lastLoginUser(val: boolean) {
    this.lastLoginUserSubject.next(val);
  }
}
