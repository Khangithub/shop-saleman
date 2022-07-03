import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store";
import { User } from "src/app/model/auth.model";
import { Product } from "src/app/model/product.model";
import { selectUserStore } from "src/app/store/selectors/auth.selectors";
import { getCurrentUser } from "src/app/store/actions/auth.actions";
import { getProductsOfSalemanAction } from "src/app/store/actions/product.actions";
import { selectProductStore } from "src/app/store/selectors/product.select";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  currentUser: User;
  products: Product[];
  isCollapsed: boolean = false;
  constructor(private store: Store<AppState>) { }

  async ngOnInit() {
    this.store.select(selectUserStore).subscribe(({ currentUser }) => {
      if (currentUser) {
        this.currentUser = currentUser
        this.store.dispatch(getProductsOfSalemanAction({ salemanId: currentUser._id, pageIndex: 1, limit: 6 }))
      } else {
        this.store.dispatch(getCurrentUser())
      }
    })

    this.store.select(selectProductStore).subscribe(({ products }) => {
      this.products = products
    })
  }
}
