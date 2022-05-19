import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-variant-model",
  templateUrl: "./variant-model.component.html",
  styleUrls: ["./variant-model.component.scss"],
})
export class VariantModelComponent implements OnInit {
  variantName: string = "";
  propName: string = "";
  propPrice: number = 0;
  propMedia: File;
  @Input() public openVairantModal: boolean;

  constructor() {
    console.log("out", this.openVairantModal);
  }

  ngOnInit(): void {}
}
