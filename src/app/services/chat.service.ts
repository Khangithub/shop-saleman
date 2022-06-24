import { environment } from "src/environments/environment";
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  constructor(
    private http: HttpClient,
    private cookie_service: CookieService,
    private route: Router
  ) {}

  async getChats(userId: string) {
    try {
      let currentUserCookie = this.cookie_service.get("salemanToken"); // To Get Cookie

      if (!currentUserCookie) {
        return this.route.navigate(["/login"]);
      }

      const headers = { Authorization: "Bearer " + currentUserCookie };

      const chatReq: any = await this.http
        .get(environment.GET_CHATS + userId, { headers })
        .toPromise();

      return chatReq.chats;
    } catch (err) {
      this.route.navigate(["/login"]);
    }
  }

  async getMsgs(roomName: string) {
    try {
      let currentUserCookie = this.cookie_service.get("salemanToken"); // To Get Cookie

      if (!currentUserCookie) {
        return this.route.navigate(["/login"]);
      }

      const headers = { Authorization: "Bearer " + currentUserCookie };

      const msgsReq: any = await this.http
        .get(environment.GET_MSGS + roomName, { headers })
        .toPromise();

      return msgsReq.msgs;
    } catch (err) {
      this.route.navigate(["/login"]);
    }
  }
}