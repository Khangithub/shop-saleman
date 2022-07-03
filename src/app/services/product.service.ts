import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { lastValueFrom } from "rxjs";
import { Product } from "../model/product.model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private currentUserToken: string = "";
  
  constructor(
    private http: HttpClient,
    private cookie_service: CookieService,
    private route: Router
  ) {
    const tokenData = this.cookie_service.get(environment.TOKEN_NAME);

    if (tokenData) {
      this.currentUserToken = tokenData;
    } else {
      this.route.navigate([environment.LOGIN_ROUTE]);
    }
  }

  async getProductsOfSaleman(userId: string, pageIndex: number, limit: number) {
    try {
      return <{ docs: Product[] }>await lastValueFrom(this.http
        .get(environment.GET_PRODUCTS + userId + "/" + pageIndex + "/" + limit)
      )
    } catch (error) {
      return error;
    }
  }

  async getProd(prodId: string) {
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

    const headers = { Authorization: "Bearer " + this.currentUserToken };

    return await lastValueFrom(this.http
      .patch(environment.UPLOAD_PRODUCT_MEDIA + prodId, fd, { headers }))
  }

  async uploadMedia(files: File[]) {
    try {
      const fd = new FormData();
      for (let i = 0; i < files.length; i++) {
        fd.append("user-media", files[i]);
      }

      const headers = { Authorization: "Bearer " + this.currentUserToken };

      const data: any = await lastValueFrom(this.http
        .post(environment.UPLOAD_USER_MEDIA, fd, { headers }))

      return data.mediaList;
    } catch (err) {
      console.log("err", err);
    }
  }

  async editProd(prod: any) {
    try {
      const headers = { Authorization: "Bearer " + this.currentUserToken };

      const prodsReq: any = await lastValueFrom(this.http
        .patch(environment.EDIT_PROD, { prod }, { headers }))

      return prodsReq;
    } catch (err) {
      console.log("err", err);
    }
  }
}
