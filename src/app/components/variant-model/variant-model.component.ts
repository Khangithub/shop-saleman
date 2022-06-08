import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-variant-model",
  templateUrl: "./variant-model.component.html",
  styleUrls: ["./variant-model.component.scss"],
})
export class VariantModelComponent implements OnInit {
  modalContent: boolean;

  @Input() variantName: string;
  @Input() propName: string;
  @Input() propPrice: number;
  @Input() propImgUrl: string;

  @Output() closeModalEvent = new EventEmitter();

  constructor() {}

  async ngOnInit() {}

  addVariantProp() {
    this.closeModalEvent.emit({
      variantName: this.variantName,
      propName: this.propName,
      propPrice: this.propPrice,
      propImgUrl: this.propImgUrl,
    });
  }
}
