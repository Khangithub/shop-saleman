import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfigService } from "src/app/config/config.service";

@Component({
  selector: "app-prod-list",
  templateUrl: "./prod-list.component.html",
  styleUrls: ["./prod-list.component.scss"],
})
export class ProdListComponent implements OnInit {
  currentUser;
  prods;

  constructor(private api: ConfigService, private route: Router) {}

  async ngOnInit() {
    this.currentUser = await this.api.getCurrentUser();
    this.prods = await this.api.getProdsBySaleman(this.currentUser._id, 1, 6);
  }

  onEditProd(id: string) {
    this.route.navigate(["prod/edit", id]);
  }
}
