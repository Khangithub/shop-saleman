import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store";
import { loginWithEmailNPassword } from "src/app/store/actions/user.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  isLogin: boolean = false;
  passwordVisible: boolean = false;


  constructor(
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void { }

  login() {
    this.isLogin = true;
    this.store.dispatch(loginWithEmailNPassword({ email: this.email, password: this.password }));
  }
}
