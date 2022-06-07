import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProdService } from "src/app/config/prod.service";

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
  variants = {};

  openVariantModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _prodService: ProdService
  ) {}

  async ngOnInit() {
    let prodId = this.route.snapshot.paramMap.get("prodId");
    this.currentProd = await this._prodService.getProd(prodId);
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
    this.swap(document.getElementById(data), e.target.parentNode);
  }

  swap(nodeA: HTMLElement, nodeB: HTMLElement) {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // Move `nodeA` to before the `nodeB`
    nodeB.parentNode.insertBefore(nodeA, nodeB);

    // Move `nodeB` to before the sibling of `nodeA`
    // parentA.insertBefore(nodeB, siblingA);
  }

  onFileChange(ev: any) {
    this.selectedFiles = ev.target.files;
  }

  async onSubmit() {
    const res: any = await this._prodService.uploadProdMedia(
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

  closeModal(data: any) {
    let { propImgUrl, propName, propPrice, variantName } = data;

    let varProp = {
      propName,
      propPrice,
      propImgUrl,
    };

    if (propImgUrl && propName && propPrice && variantName) {
      if (this.variants.hasOwnProperty(variantName)) {
        this.variants[variantName].unshift(varProp);
      } else {
        let variant = {};
        variant[variantName] = [];
        variant[variantName].push(varProp);
        this.variants = { ...variant, ...this.variants };
      }

      this.openVariantModal = false;
    }
  }
}
