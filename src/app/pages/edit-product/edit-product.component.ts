import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Product } from "src/app/model/product.model";
import { AppState } from "src/app/store";
import { getCurrentProductAction } from "src/app/store/actions/product.actions";
import { selectProductStore } from "src/app/store/selectors/product.select";

@Component({
  selector: "app-edit-prod",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.scss"],
})

export class EditProductComponent implements OnInit {
  currentProduct: Product;
  showProductImgModal: boolean = false;
  
  selectedFiles = [];
  productId: string = '';

  variantName: string = "";
  propName: string = "";
  propPrice: number = 0;
  propImgUrl: string = "";

  openVariantModal: boolean = false;
  savingChange: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  async ngOnInit() {
    this.route.queryParamMap.subscribe(params => this.productId = params.get('productId'));
    this.store.dispatch(getCurrentProductAction({ productId: this.productId }));
    this.store.select(selectProductStore).subscribe(({ product }) => {
      this.currentProduct = product
    })
  }
  
  // allowDrag(e: DragEvent): void {
  //   e.preventDefault();
  // }

  // dragMedia(e: any): void {
  //   e.dataTransfer.setData("variant-transfer", e.target.id);
  // }

  // dropMedia(e: any): void {
  //   e.preventDefault();
  //   var data = e.dataTransfer.getData("variant-transfer");
  //   this.insertNode(document.getElementById(data), e.target.parentNode);
  // }

  // insertNode(nodeA: HTMLElement, nodeB: HTMLElement) {
  //   let dragId = nodeA.id;
  //   let dropId = nodeB.id;

  //   let dragArr = dragId.split("-");
  //   let dragVariant = dragArr[0];
  //   let dragIndex = parseInt(dragArr[1]);
  //   let dragTag = dragArr[2];

  //   let dropArr = dropId.split("-");
  //   let dropVariant = dropArr[0];
  //   let dropIndex = parseInt(dropArr[1]);
  //   let dropTag = dropArr[2];

  //   if (dragTag === "variantItem" && dropTag === "variantItem") {
  //     let dragData = this.currentProduct.variants[dragVariant].splice(
  //       dragIndex,
  //       1
  //     )[0];
  //     this.currentProduct.variants[dropVariant].splice(dropIndex, 0, dragData);
  //   }
  // }

  // removeVariant(key: string, index: number) {
  //   this.currentProduct.variants[key].splice(index, 1);
  //   if (this.currentProduct.variants[key].length === 0) {
  //     delete this.currentProduct.variants[key];
  //   }
  //   debugger;
  // }

  // async onSubmit() {
  //   // const res: any = await this.product_service.uploadProdMedia(
  //   //   this.selectedFiles,
  //   //   this.currentProduct._id
  //   // );
  //   // if (res.updated) {
  //   //   this.currentProduct.mediaList = [
  //   //     ...this.currentProduct.mediaList,
  //   //     ...res.mediaList,
  //   //   ];
  //   // }
  // }

  // updateVariant(data: any) {
  //   let { propImgUrl, propName, propPrice, variantName } = data;

  //   let varProp = {
  //     propName,
  //     propPrice,
  //     propImgUrl,
  //   };

  //   if (propImgUrl && propName && propPrice && variantName) {
  //     // if (this.currentProduct.variants.hasOwnProperty(variantName)) {
  //     //   this.currentProduct.variants[variantName].unshift(varProp);
  //     // } else {
  //     //   let variant = {};
  //     //   variant[variantName] = [];
  //     //   variant[variantName].push(varProp);
  //     //   this.currentProduct.variants = {
  //     //     ...variant,
  //     //     ...this.currentProduct.variants,
  //     //   };
  //     // }

  //     this.openVariantModal = false;
  //   }
  // }

  // async editProd() {
  //   // this.savingChange = true;
  //   // const res: any = await this.product_service.editProd(this.currentProduct);
  //   // if (res.updated) {
  //   //   this.savingChange = false;
  //   // }
  // }
}
