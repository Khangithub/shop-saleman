import { Component, OnInit } from "@angular/core";
import { ConfigService } from "../../config/config.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  email: string;
  pwd: string;

  constructor(private api: ConfigService) {}
 
  ngOnInit(): void {
    
  }
 
  login() {
    this.api.loginWithPwd(this.email, this.pwd).subscribe((data) => {
      console.warn("get api data", data);
    
    })
  }
}
