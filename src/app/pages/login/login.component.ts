import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";
import { AppState } from "src/app/store";
import { loginWithEmailNPassword } from "src/app/store/actions/user.actions";
import { selectCurrentUser } from "src/app/store/selectors/user.selectors";
import { UserService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = "";
  pwd: string = "";
  isLogin: boolean = false;
  visiblePwd: boolean = false;


  constructor(
    private route: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    // const obs = this.store.pipe(select(selectCurrentUser));
    // console.log('obs', obs)
  }

  ngOnDestroy(): void {
    // this.userSubscription$.unsubscribe();
  }

  login() {
    this.isLogin = true;
    this.store.dispatch(loginWithEmailNPassword({ email: this.email, password: this.pwd }));
  }

  togglePwd() {
    return (this.visiblePwd = !this.visiblePwd);
  }
}
