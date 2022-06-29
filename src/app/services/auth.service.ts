import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../model/user.model";
import { environment } from "src/environments/environment";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  currentUserToken: string;

  constructor(
    private http: HttpClient,
    private cookie_service: CookieService,
    private route: Router
  ) {
    this.currentUserToken = this.cookie_service.get(environment.TOKEN_NAME)
  }

  async getCurrentUser() {
    try {
      if (!this.currentUserToken) {
        this.route.navigate(["/login"]);
        throw 'no token found'
      }

      const headers = { Authorization: "Bearer " + this.currentUserToken };

      const currentUserData = <{ currentUser: User }>await lastValueFrom(this.http
        .get(environment.GET_CURRENT_USER, { headers }));

      return { currentUser: currentUserData.currentUser, token: this.currentUserToken }
    } catch (error) {
      return error;
    }
  }

  async loginWithEmailNPassword(email: string, pwd: string) {
    try {
      const loginData = <{ currentUser: User; token: string }>await lastValueFrom(this.http
        .post<any>(environment.LOGIN_PWD, {
          email,
          password: pwd,
        }))

      return loginData;
    } catch (error) {
      return error
    }
  }
}
