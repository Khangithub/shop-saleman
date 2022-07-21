import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UserService } from "src/app/services/auth.service";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-media-modal",
  templateUrl: "./media-modal.component.html",
})
export class MediaModalComponent implements OnInit {
  imgs: string[] = [];
  selectedFiles = [];

  openMediaModal: boolean = false;
  isVisibleMiddle = false;
  isVisibleTop = true;

  showModalTop(): void {
    this.isVisibleTop = true;
  }

  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }

  handleOkTop(): void {
    this.isVisibleTop = false;
  }

  handleCancelTop(): void {
    this.isVisibleTop = false;
  }

  @Output() selectedImgUrl = new EventEmitter<string>();

  constructor(
    // private _modalService: NgbModal,
    private user_service: UserService,
    private product_service: ProductService
  ) {}

  async ngOnInit() {
    let user = await this.user_service.getCurrentUser();

    for (let i = 0; i < user.mediaList.length; i++) {
      const element = user.mediaList[i];
      this.imgs.push(element.filename);
    }
  }

  // openModal(content: NgbModalRef) {
  //   this._modalService.open(content, {
  //     ariaLabelledBy: "modal-basic-title",
  //     size: "xl",
  //     centered: true,
  //   }).result;
  // }

  onFileChange(ev) {
    this.selectedFiles = ev.target.files;
  }

  async addVariantPropImg() {
    const newImgs: any = await this.product_service.uploadMedia(
      this.selectedFiles
    );
    this.imgs.push(newImgs.map((img: any) => img.filename));
  }

  selectImg(url: string) {
    this.selectedImgUrl.emit(url);
  }
}
