import { UserService } from "src/app/config/user.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  currentUser;
  constructor(private route: Router, private api: UserService) {}

  async ngOnInit() {
    this.currentUser = await this.api.getCurrentUser();
  }
}
