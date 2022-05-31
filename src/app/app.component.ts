import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { UserService } from "./config/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedFeature = "recipe";

  constructor(private api: UserService) {

  }

  ngOnInit(): void {
    this.api.getCurrentUser()
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
