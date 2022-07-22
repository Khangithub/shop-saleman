import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store";
import { loginWithEmailNPassword } from "src/app/store/actions/auth.actions";
import { selectUserStore } from "src/app/store/selectors/auth.selectors";
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  passwordVisible: boolean = false;

  constructor(
    private store: Store<AppState>,
    private message: NzMessageService,
    private form: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.form.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.store.select(selectUserStore).subscribe(({ authError }) => {
      if (authError) {
        this.message.warning(authError)
      }
    });
  }

  login() {
    const {email, password} = this.loginForm.value;

    this.store.dispatch(loginWithEmailNPassword({ email, password }));
  }
}
