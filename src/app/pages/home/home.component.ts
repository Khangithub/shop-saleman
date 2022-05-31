import { Component, OnInit } from "@angular/core";
import { ProdService } from "src/app/config/prod.service";
import { UserService } from 'src/app/config/user.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  currentUser;
  prods;

  constructor(private _prodService: ProdService, private _userService: UserService) {}

  async ngOnInit() {
    this.currentUser = await this._userService.getCurrentUser();
    this.prods = await this._prodService.getProdsBySaleman(this.currentUser._id, 1, 6);
  }
}
