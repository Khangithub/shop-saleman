import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { ConfigService } from "./config/config.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedFeature = "recipe";

  constructor(private api: ConfigService) {

  }

  ngOnInit(): void {
    this.api.getCurrentUser()
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
