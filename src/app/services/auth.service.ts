import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../model/user.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  currentCookie: string;

  constructor(
    private http: HttpClient,
    private cookie_service: CookieService,
    private route: Router
  ) {
    this.currentCookie = this.cookie_service.get(environment.TOKEN_NAME)
  }

  async getCurrentUser() {
    try {
      if (!this.currentCookie) {
        return this.route.navigate(["/login"]);
      }

      const headers = { Authorization: "Bearer " + this.currentCookie };

      const userData = <{ currentUser: User }>await this.http
        .get(environment.GET_CURRENT_USER, { headers })
        .toPromise();

      return userData.currentUser;
    } catch (error) {
      return error;
    }
  }

  async loginWithEmailNPassword(email: string, pwd: string) {
    try {
      const loginData = <{ currentUser: User; token: string }>await this.http
        .post<any>(environment.LOGIN_PWD, {
          email,
          password: pwd,
        })
        .toPromise();

      return loginData;
    } catch (error) {
      return error
    }
  }
}
