import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductService } from "src/app/services/product.service";
import { UserService } from "src/app/services/auth.service";

@Component({
  selector: "app-prod-list",
  templateUrl: "./prod-list.component.html",
  styleUrls: ["./prod-list.component.scss"],
})

export class ProdListComponent implements OnInit {
  currentUser;
  prods;

  constructor(
    private user_service: UserService,
    private product_service: ProductService,
    private route: Router
  ) {}

  async ngOnInit() {
    this.currentUser = await this.user_service.getCurrentUser();
    this.prods = await this.product_service.getProductsOfSaleman(
      this.currentUser._id,
      1,
      6
    );
  }

  onEditProd(id: string) {
    this.route.navigate(["prod/edit", id]);
  }
}
