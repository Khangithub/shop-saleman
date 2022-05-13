import { Router } from "@angular/router";
import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private route: Router
  ) {}

  getCurrentUser() {
    let currentUserCookie = this.cookieService.get("token"); // To Get Cookie

    if (!currentUserCookie) {
      return this.route.navigate(["/login"]);
    }

    const headers = { Authorization: "Bearer " + currentUserCookie };

    return this.http.get(environment.GET_CURRENT_USER, { headers }).subscribe(
      (data) => {
        return data;
      },
      (err) => {
        console.log("oops", err);
        return this.route.navigate(["/login"]);
      }
    );
  }

  loginWithPwd(email: string, pwd: string): Observable<any> {
    return this.http.post<any>(environment.LOGIN_PWD, {
      email,
      password: pwd,
    });
  }
}
