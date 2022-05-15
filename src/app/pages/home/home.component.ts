import { Component, OnInit } from "@angular/core";
import { ConfigService } from "src/app/config/config.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  currentUser;
  prods;

  constructor(private api: ConfigService) {}

  async ngOnInit() {
    this.currentUser = await this.api.getCurrentUser();
    this.prods = await this.api.getProds(this.currentUser._id, 1, 6);
  }
}
