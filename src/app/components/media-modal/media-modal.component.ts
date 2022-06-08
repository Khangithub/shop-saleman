import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "src/app/config/user.service";
import { ProdService } from "src/app/config/prod.service";

@Component({
  selector: "app-media-modal",
  templateUrl: "./media-modal.component.html",
  styleUrls: ["./media-modal.component.scss"],
})
export class MediaModalComponent implements OnInit {
  imgs: string[] = [];
  selectedFiles = [];

  openMediaModal: boolean = false;
  @Output() selectedImgUrl = new EventEmitter<string>();

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

  openModal(content: NgbModalRef) {
    this._modalService.open(content, {
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

  selectImg(url: string) {
    this.selectedImgUrl.emit(url);
  }
}
