import { ProdService } from "src/app/config/prod.service";
import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "src/app/config/user.service";

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
  active = 1;
  selectedFiles = [];
  imgs: string[] = [];
  vids: string[] = [];

  @Input() public openVairantModal: boolean;

  constructor(
    private modalService: NgbModal,
    private _userService: UserService,
    private _prodService: ProdService
  ) {}

  async ngOnInit() {
    let user = await this._userService.getCurrentUser();

    for (let i = 0; i < user.mediaList.length; i++) {
      const element = user.mediaList[i];
      if (element.mimetype.includes("image")) {
        this.imgs.push(element.filename);
      } else {
        this.vids.push(element.filename);
      }
    }
  }

  async open(content) {
    await this.modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "xl",
      centered: true,
    }).result;
  }

  onFileChange(ev) {
    this.selectedFiles = ev.target.files;
  }

  async addUserImg() {
    const _imgs: any = await this._prodService.uploadMedia(this.selectedFiles);
    this.imgs.push(_imgs.map((_img) => _img.filename));
  }

  async addUserVid() {
    const _vids: any = await this._prodService.uploadMedia(this.selectedFiles);
    this.vids.push(_vids.map((_vid) => _vid.filename));
  }
}
