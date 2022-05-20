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

  async getProdsBySaleman(userId, pageIndex, limit) {
    try {
      const prodsReq: any = await this.http
        .get(environment.GET_PRODUCTS + userId + "/" + pageIndex + "/" + limit)
        .toPromise();

      return prodsReq.docs;
    } catch (err) {
      console.log("err", err);
    }
  }

  async getProd(prodId) {
    try {
      const prodReq = await this.http
        .get(environment.GET_PRODUCT + prodId)
        .toPromise();

      return prodReq;
    } catch (err) {
      console.log("err", err);
    }
  }

  loginWithPwd(email: string, pwd: string): Observable<any> {
    return this.http.post<any>(environment.LOGIN_PWD, {
      email,
      password: pwd,
    });
  }

  async uploadProdMedia(files: File[], prodId: string) {
    const fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append("shop-prod", files[i]);
    }

    let currentUserCookie = this.cookieService.get("token"); // To Get Cookie

    if (!currentUserCookie) {
      return this.route.navigate(["/login"]);
    }

    const headers = { Authorization: "Bearer " + currentUserCookie };

    return this.http
      .patch(environment.UPLOAD_PRODUCT_MEDIA + prodId, fd, { headers })
      .toPromise();
  }

  async uploadMedia(files: File[]) {
    try {
      let currentUserCookie = this.cookieService.get("token"); // To Get Cookie

      if (!currentUserCookie) {
        return this.route.navigate(["/login"]);
      }

      const fd = new FormData();
      for (let i = 0; i < files.length; i++) {
        fd.append("user-media", files[i]);
      }

      const headers = { Authorization: "Bearer " + currentUserCookie };

      const data: any = await this.http
        .post(environment.UPLOAD_USER_MEDIA, fd, { headers })
        .toPromise();
      
      return data.mediaList;
    } catch (err) {
      console.log("err", err);
    }
  }
}
