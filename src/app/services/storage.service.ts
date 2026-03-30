import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiQueryParamsService } from './api-query-params.service';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  private apiUrl: string = environment.apiUrl;
  constructor(private router: Router) { }

  logout() {
    this.removeLs();
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  setLocalStorage(val: any) {
    localStorage.setItem('_user', JSON.stringify(val));
  }

  getLocalStorage(val: any) {
    try {
      const lsValue = localStorage.getItem(val);
      if (!lsValue) {
        return undefined;
      }
      return JSON.parse(lsValue);
    } catch (error) {
      return undefined;
    }
  }

  getToken() {
    try {
      const lsValue = this.getLocalStorage('_user');
      if (!lsValue) {
        return undefined;
      }
      return lsValue.token;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  getUser() {
    try {
      const lsValue = this.getLocalStorage('_user');
      if (!lsValue) {
        return undefined;
      }
      return lsValue.user;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  private removeLs() {
    localStorage.removeItem('_user');
  }

  loadUserToken(): Observable<any> {
    let userDetails = this.getToken();
    if (userDetails) {
      return of(userDetails);
    } else {
      // this.logout();
      return of(undefined);
    }
  }
}