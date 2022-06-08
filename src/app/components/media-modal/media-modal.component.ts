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

  @Input() modalContent: boolean;
  @Output() closeModal = new EventEmitter<boolean>();
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

  open(content: NgbModalRef) {
    this._modalService
      .open(content, {
        ariaLabelledBy: "modal-basic-title",
        size: "xl",
        centered: true,
      })
      .result.then(
        (data) => {
          // on close
        },
        (error) => {
          // on error/dismiss
          this.closeModal.emit(true);
        }
      );
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
    console.log("url ->", url);
    this.selectedImgUrl.emit(url);
  }
}
