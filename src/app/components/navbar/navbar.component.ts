import { UserService } from "src/app/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store";
import { getCurrentUser } from "src/app/store/actions/user.actions";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(private route: Router,
    private store: Store<AppState>,
    private user_service: UserService) {
    this.store.dispatch(getCurrentUser())
  }

  async ngOnInit() {
  }
}
