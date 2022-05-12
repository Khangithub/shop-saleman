import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-product-management",
  templateUrl: "./product-management.component.html",
  styleUrls: ["./product-management.component.css"],
})
export class ProductManagementComponent implements OnInit {
  selectedFiles = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onFileChange(event) {
    this.selectedFiles = event.target.files;
  }

  onSubmit() {
    console.log("submitting")
    const fd = new FormData();
    for (let i = 0; i < this.selectedFiles.length; i++) {
      fd.append("product-media", this.selectedFiles[i]);
    }

    this.http
      .post("http://localhost:5000/products/test", fd)
      .subscribe((res) => {
        console.log(res, "done");
      });
  }
}
