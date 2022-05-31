import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private route: Router
  ) {}

  async getCurrentUser() {
    try {
      let currentUserCookie = this.cookieService.get("token"); // To Get Cookie

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

  
  loginWithPwd(email: string, pwd: string): Observable<any> {
    return this.http.post<any>(environment.LOGIN_PWD, {
      email,
      password: pwd,
    });
  }
}
