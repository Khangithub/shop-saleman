import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProdService } from "src/app/config/prod.service";
import { UserService } from "src/app/config/user.service";

@Component({
  selector: "app-prod-list",
  templateUrl: "./prod-list.component.html",
  styleUrls: ["./prod-list.component.scss"],
})

export class ProdListComponent implements OnInit {
  currentUser;
  prods;

  constructor(
    private _userService: UserService,
    private _prodService: ProdService,
    private route: Router
  ) {}

  async ngOnInit() {
    this.currentUser = await this._userService.getCurrentUser();
    this.prods = await this._prodService.getProdsBySaleman(
      this.currentUser._id,
      1,
      6
    );
  }

  onEditProd(id: string) {
    this.route.navigate(["prod/edit", id]);
  }
}
