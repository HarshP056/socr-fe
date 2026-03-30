export class LoginRequest {
    password: string;
    username: string;
    constructor(data?: any) {
      Object.assign(this, data);
    }
  }
  
  export class LoginResponse {
    token: string;
    user: any;
    constructor(data?: any) {
      Object.assign(this, data);
    }
  }