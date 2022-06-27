import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../model/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private http: HttpClient,
    private cookie_service: CookieService,
    private route: Router
  ) { }

  async getCurrentUser() {
    try {
      let currentUserCookie = this.cookie_service.get("salemanToken"); // To Get Cookie

      if (!currentUserCookie) {
        return this.route.navigate(["/login"]);
      }

      const headers = { Authorization: "Bearer " + currentUserCookie };

      const user: any = await this.http
        .get(environment.GET_CURRENT_USER, { headers })
        .toPromise();

      return user.currentUser;
    } catch (err) {
      this.route.navigate(["/login"]);
    }
  }

  async lgPwd(email: string, pwd: string) {
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
