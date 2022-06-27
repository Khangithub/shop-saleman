import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ProdService } from "src/app/services/product.service";
import { UserService } from 'src/app/services/auth.service';
import { AppState } from "src/app/store";
import { User } from "src/app/model/user.model";
import { Product } from "src/app/model/product.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  currentUser: User;
  prods: Product[];

  constructor(private product_service: ProdService, private user_service: UserService, private store:Store<AppState>) {}

  async ngOnInit() {
    // this.currentUser = await this.user_service.getCurrentUser();
    // this.prods = await this.product_service.getProdsBySaleman(this.currentUser._id, 1, 6);
  }
}
