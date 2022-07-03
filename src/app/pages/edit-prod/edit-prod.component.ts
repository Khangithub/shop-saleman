import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-edit-prod",
  templateUrl: "./edit-prod.component.html",
  styleUrls: ["./edit-prod.component.scss"],
})
export class EditProdComponent implements OnInit {
  currentProd: any;
  selectedFiles = [];

  variantName: string = "";
  propName: string = "";
  propPrice: number = 0;
  propImgUrl: string = "";

  openVariantModal: boolean = false;
  savingChange: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private product_service: ProductService
  ) {}

  async ngOnInit() {
    let prodId = this.route.snapshot.paramMap.get("prodId");
    this.currentProd = await this.product_service.getProd(prodId);
  }

  allowDrag(e: DragEvent): void {
    e.preventDefault();
  }

  dragMedia(e: any): void {
    e.dataTransfer.setData("variant-transfer", e.target.id);
  }

  dropMedia(e: any): void {
    e.preventDefault();
    var data = e.dataTransfer.getData("variant-transfer");
    this.insertNode(document.getElementById(data), e.target.parentNode);
  }

  insertNode(nodeA: HTMLElement, nodeB: HTMLElement) {
    let dragId = nodeA.id;
    let dropId = nodeB.id;

    let dragArr = dragId.split("-");
    let dragVariant = dragArr[0];
    let dragIndex = parseInt(dragArr[1]);
    let dragTag = dragArr[2];

    let dropArr = dropId.split("-");
    let dropVariant = dropArr[0];
    let dropIndex = parseInt(dropArr[1]);
    let dropTag = dropArr[2];

    if (dragTag === "variantItem" && dropTag === "variantItem") {
      let dragData = this.currentProd.variants[dragVariant].splice(
        dragIndex,
        1
      )[0];
      this.currentProd.variants[dropVariant].splice(dropIndex, 0, dragData);
    }
  }

  removeVariant(key: string, index: number) {
    this.currentProd.variants[key].splice(index, 1);
    if (this.currentProd.variants[key].length === 0) {
      delete this.currentProd.variants[key];
    }
    debugger;
  }

  async onSubmit() {
    const res: any = await this.product_service.uploadProdMedia(
      this.selectedFiles,
      this.currentProd._id
    );
    if (res.updated) {
      this.currentProd.mediaList = [
        ...this.currentProd.mediaList,
        ...res.mediaList,
      ];
    }
  }

  updateVariant(data: any) {
    let { propImgUrl, propName, propPrice, variantName } = data;

    let varProp = {
      propName,
      propPrice,
      propImgUrl,
    };

    if (propImgUrl && propName && propPrice && variantName) {
      if (this.currentProd.variants.hasOwnProperty(variantName)) {
        this.currentProd.variants[variantName].unshift(varProp);
      } else {
        let variant = {};
        variant[variantName] = [];
        variant[variantName].push(varProp);
        this.currentProd.variants = {
          ...variant,
          ...this.currentProd.variants,
        };
      }

      this.openVariantModal = false;
    }
  }

  async editProd() {
    this.savingChange = true;
    const res: any = await this.product_service.editProd(this.currentProd);
    if (res.updated) {
      this.savingChange = false;
    }
  }
}
