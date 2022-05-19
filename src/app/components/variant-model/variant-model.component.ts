import { Component, OnInit } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  onAddMedia($event) {

  }

  openVerticallyCentered(content) {
    console.log('content', content);
    this.modalService.open(content, { centered: true });
  }
}
