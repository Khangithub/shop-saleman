import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/model/auth.model';
import { Product } from 'src/app/model/product.model';
import { AppState } from 'src/app/store';
import { getCurrentUser } from 'src/app/store/actions/auth.actions';
import { getProductsOfSalemanAction } from 'src/app/store/actions/product.actions';
import { selectUserStore } from 'src/app/store/selectors/auth.selectors';
import { selectProductStore } from 'src/app/store/selectors/product.select';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  currentUser: User;
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
  }
}

