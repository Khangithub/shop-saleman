import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store";
import { User } from "src/app/model/user.model";
import { Product } from "src/app/model/product.model";
import { selectUserState } from "src/app/store/selectors/user.selectors";
import { getCurrentUser } from "src/app/store/actions/user.actions";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  currentUser: User;
  prods: Product[];
  isCollapsed: boolean = false;
  constructor(private store: Store<AppState>) {
    this.store.select(selectUserState).subscribe(({ currentUser }) => {
      if (currentUser) {
        this.currentUser = currentUser
      } else {
        this.store.dispatch(getCurrentUser())
      }
    })
  }

  async ngOnInit() {
    // this.currentUser = await this.user_service.getCurrentUser();
    // this.prods = await this.product_service.getProdsBySaleman(this.currentUser._id, 1, 6);
  }
}
