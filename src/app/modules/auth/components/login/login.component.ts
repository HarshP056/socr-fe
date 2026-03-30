import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';
import { SSOService } from 'src/app/services/sso.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showPassword: boolean = false;
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  google: string;
  user: any = {};
  isLoading: boolean = false;
  microsoft: string;
  errorMessage: string = '';
  constructor(
    private router: Router,
    private loginService: LoginService,
    private ssoService: SSOService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    if (this.router.url.includes('/auth/login')) {
      this.logout();
    }
  }

  ngOnInit() {
    this.initForm();

    // get return url from route parameters or default to '/'
    // this.returnUrl =
    // this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
    this.getUrlParams();
  }

  logout() {
    this.storageService.logout();
    // document.location.reload();
  }

  redirectToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  private getUrlParams() {
    this.route.queryParams.subscribe((params) => {
      this.google = params['gcode'];
      this.microsoft = params['msaauth'];
      console.log(this.microsoft);
      if (params['gcode']) this.checkAuth();
      if (params['msaauth']) this.checkMSAuth();
    });
  }

  private checkAuth() {
    const obj = {
      code: this.google,
    };
    this.ssoService.validateGoogle(this.google).subscribe(
      (val: any) => {
        this.setData(val);
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }

  private checkMSAuth() {
    const obj = {
      code: this.microsoft,
    };
    this.ssoService.validateMicrosoft(this.microsoft).subscribe(
      (val: any) => {
        this.setData(val);
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  passowrdShowToggle() {
    this.showPassword = !this.showPassword;
  }

  private setData(userData: any) {
    this.user = userData.user;
    this.storageService.setLocalStorage(userData);
    this.router.navigateByUrl('/dashboard');
  }

  submit() {
    this.hasError = false;
    this.isLoading = true;
    const obj: LoginRequest = {
      username: this.f['email'].value,
      password: this.f['password'].value,
    };
    const loginSubscr = this.loginService.post$(obj).subscribe({
      next: (val: any) => {
        this.storageService.setLocalStorage(val);
        this.router.navigateByUrl('/dashboard');
      },
      error: (error: any) => {
        this.isLoading = false;
        console.log(error.error.message);
        // ACOUNT_LOCKED_INVALID_ATTEMPTS
        if (error.error.message === 'ACOUNT_LOCKED_INVALID_ATTEMPTS') {
          this.errorMessage = 'Account has been locked due to invalid attempts';
        } else {
          this.errorMessage = '';
        }
        this.hasError = true;
      },
    });
  }

  signInUsingGoogle() {
    this.ssoService.googleSSO();
  }

  signInUsingMicrosoft() {
    console.log('hello');
    this.ssoService.microsoftSSO();
  }
}
