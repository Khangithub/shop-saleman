import { ProdService } from "src/app/config/prod.service";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "src/app/config/user.service";

@Component({
  selector: "app-variant-model",
  templateUrl: "./variant-model.component.html",
  styleUrls: ["./variant-model.component.scss"],
})
export class VariantModelComponent implements OnInit {
  active = 1;
  selectedFiles = [];
  imgs: string[] = [];

  @Input() variantName: string;
  @Input() propName: string;
  @Input() propPrice: number;
  @Input() propImgUrl: string;

  @Output() closeModalEvent = new EventEmitter();

  constructor(
    private _modalService: NgbModal,
    private _userService: UserService,
    private _prodService: ProdService
  ) {}

  async ngOnInit() {
    let user = await this._userService.getCurrentUser();

    for (let i = 0; i < user.mediaList.length; i++) {
      const element = user.mediaList[i];
      this.imgs.push(element.filename);
    }
  }

  async open(content: NgbModalRef) {
    await this._modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "xl",
      centered: true,
    }).result;
  }

  onFileChange(ev) {
    this.selectedFiles = ev.target.files;
  }

  async addVariantPropImg() {
    const newImgs: any = await this._prodService.uploadMedia(
      this.selectedFiles
    );
    this.imgs.push(newImgs.map((img: any) => img.filename));
  }

  addVariantProp() {
    this.closeModalEvent.emit({
      variantName: this.variantName,
      propName: this.propName,
      propPrice: this.propPrice,
      propImgUrl: this.propImgUrl,
    });
  }
}
