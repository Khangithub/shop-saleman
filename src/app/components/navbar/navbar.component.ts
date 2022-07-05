import { UserService } from "src/app/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store";
import { getCurrentUser } from "src/app/store/actions/auth.actions";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
