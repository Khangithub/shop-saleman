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
    e.dataTransfer.setData("text", e.target.id);
  }

  dropMedia(e: any): void {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    this.swap(document.getElementById(data), e.target);
  }

  swap(nodeA: HTMLElement, nodeB: HTMLElement) {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // Move `nodeA` to before the `nodeB`
    nodeB.parentNode.insertBefore(nodeA, nodeB);

    // Move `nodeB` to before the sibling of `nodeA`
    parentA.insertBefore(nodeB, siblingA);
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
    console.log("data", data);
  }
}
