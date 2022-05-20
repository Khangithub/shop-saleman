import { Component, Input, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";

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
  closeResult = "";
  @Input() public openVairantModal: boolean;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {}

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
