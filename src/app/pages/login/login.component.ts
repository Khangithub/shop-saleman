import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store";
import { loginWithEmailNPassword } from "src/app/store/actions/auth.actions";
import { selectUserState } from "src/app/store/selectors/auth.selectors";
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  passwordVisible: boolean = false;

  constructor(
    private store: Store<AppState>,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.store.select(selectUserState).subscribe(({ authError }) => {
      if (authError) {
        this.message.warning(authError)
      }
    });
  }

  login() {
    this.store.dispatch(loginWithEmailNPassword({ email: this.email, password: this.password }));
  }
}
