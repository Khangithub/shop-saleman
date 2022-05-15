import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConfigService } from "src/app/config/config.service";

@Component({
  selector: "app-edit-prod",
  templateUrl: "./edit-prod.component.html",
  styleUrls: ["./edit-prod.component.scss"],
})
export class EditProdComponent implements OnInit {
  currentProd;
  constructor(private route: ActivatedRoute, private api: ConfigService) {}

  async ngOnInit() {
    let prodId = this.route.snapshot.paramMap.get("prodId");
    this.currentProd = await this.api.getProd(prodId);
  }
}
