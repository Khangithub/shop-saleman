import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  loginWithPwd(email: string, pwd: string) {
    console.log(email, pwd, 'config')
    return this.http.post<any>(environment.LOGIN_PWD, {
      email,
      password: pwd,
    });
  }
}
