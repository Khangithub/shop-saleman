import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ConfigService } from "../../config/config.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  email: string = "";
  pwd: string = "";
  isLogin: boolean = false;
  visiblePwd: boolean = false;

  constructor(
    private api: ConfigService,
    private route: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  login() {
    this.isLogin = true;
    this.api.loginWithPwd(this.email, this.pwd).subscribe(
      (userData) => {
        if (userData.token && userData.currentUser.role === "saler") {
          this.cookieService.set("token", userData.token); // To Set Cookie
          this.isLogin = false;
          this.route.navigate(["./"]);
        }
      },
      (err) => {
        this.isLogin = false;
        console.log("err", err);
      }
    );
  }

  togglePwd() {
    return (this.visiblePwd = !this.visiblePwd);
  }
}
