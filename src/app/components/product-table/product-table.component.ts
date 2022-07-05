import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/model/product.model';
import { AppState } from 'src/app/store';
import { selectProductStore } from 'src/app/store/selectors/product.select';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {

  searchValue = '';
  visible = false;
  current = 1;
  limit: number = 6;
  pageIndex: number = 1;
  products: Product[]
  displayedProducts: Product[]


  constructor(
    private route: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select(selectProductStore).subscribe(({ products }) => {
      this.products = products
      this.displayedProducts = products
    })
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.displayedProducts = this.products.filter((item) => item.name.indexOf(this.searchValue) !== -1);
  }

  onEditProduct(productId: string) {
    this.route.navigate([environment.EDIT_PRODUCT_ROUTE + productId])
  }
}
