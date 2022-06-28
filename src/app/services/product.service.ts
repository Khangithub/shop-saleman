import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProdService {
  constructor(
    private http: HttpClient,
    private cookie_service: CookieService,
    private route: Router
  ) { }

  async getProdsBySaleman(userId: string, pageIndex: number, limit: number) {
    try {
      const prodsReq: any = await lastValueFrom(this.http
        .get(environment.GET_PRODUCTS + userId + "/" + pageIndex + "/" + limit)
      )
      return prodsReq.docs;
    } catch (err) {
      console.log("err", err);
    }
  }

  async getProd(prodId) {
    try {
      const prodReq = await lastValueFrom(this.http
        .get(environment.GET_PRODUCT + prodId)
      )
      return prodReq;
    } catch (err) {
      console.log("err", err);
    }
  }

  async uploadProdMedia(files: File[], prodId: string) {
    const fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append("shop-prod", files[i]);
    }

    let currentUserCookie = this.cookie_service.get("salemanToken"); // To Get Cookie

    if (!currentUserCookie) {
      return this.route.navigate(["/login"]);
    }

    const headers = { Authorization: "Bearer " + currentUserCookie };

    return await lastValueFrom(this.http
      .patch(environment.UPLOAD_PRODUCT_MEDIA + prodId, fd, { headers }))
  }

  async uploadMedia(files: File[]) {
    try {
      let currentUserCookie = this.cookie_service.get("salemanToken"); // To Get Cookie

      if (!currentUserCookie) {
        return this.route.navigate(["/login"]);
      }

      const fd = new FormData();
      for (let i = 0; i < files.length; i++) {
        fd.append("user-media", files[i]);
      }

      const headers = { Authorization: "Bearer " + currentUserCookie };

      const data: any = await lastValueFrom(this.http
        .post(environment.UPLOAD_USER_MEDIA, fd, { headers }))

      return data.mediaList;
    } catch (err) {
      console.log("err", err);
    }
  }

  async editProd(prod: any) {
    try {
      let currentUserCookie = this.cookie_service.get("salemanToken"); // To Get Cookie

      if (!currentUserCookie) {
        return this.route.navigate(["/login"]);
      }
      const headers = { Authorization: "Bearer " + currentUserCookie };

      const prodsReq: any = await lastValueFrom(this.http
        .patch(environment.EDIT_PROD, { prod }, { headers }))

      return prodsReq;
    } catch (err) {
      console.log("err", err);
    }
  }
}
