import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConfigService } from "src/app/config/config.service";

@Component({
  selector: "app-edit-prod",
  templateUrl: "./edit-prod.component.html",
  styleUrls: ["./edit-prod.component.scss"],
})
export class EditProdComponent implements OnInit {
  currentProd;
  selectedFiles = [];
  constructor(private route: ActivatedRoute, private api: ConfigService) {}

  async ngOnInit() {
    let prodId = this.route.snapshot.paramMap.get("prodId");
    this.currentProd = await this.api.getProd(prodId);
  }

  allowDrag(e: any): void {
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

  onFileChange(ev) {
    this.selectedFiles = ev.target.files;
  }

  async onSubmit() {
    const res: any = await this.api.uploadProdMedia(
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
}