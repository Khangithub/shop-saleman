import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {

  searchValue = '';
  visible = false;

  @Input() products: Product[]
  @Input() displayedProducts: Product[]

  constructor() { }

  ngOnInit(): void {
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.displayedProducts = this.products.filter((item) => item.name.indexOf(this.searchValue) !== -1);
  }

}
