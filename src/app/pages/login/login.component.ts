import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";
import { AppState } from "src/store";
import { lgPwd } from "src/store/actions/user.actions";
import { UserService } from "../../services/auth.service";

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
    private api: UserService,
    private route: Router,
    private cookie_service: CookieService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  login() {
    this.isLogin = true;
    this.store.dispatch(lgPwd({ email: this.email, password: this.pwd }));
  }

  togglePwd() {
    return (this.visiblePwd = !this.visiblePwd);
  }
}
