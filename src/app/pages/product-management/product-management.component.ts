import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-product-management",
  templateUrl: "./product-management.component.html",
  styleUrls: ["./product-management.component.scss"],
})
export class ProductManagementComponent implements OnInit {
  private productImage: any[] = [];
  private name: string = "";
  private manufacturer: string = "";
  private price: number = 0;
  private discount: number = 0;
  private category: string = "";
  private description: string = "";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onFileChange(event) {
    this.productImage = event.target.files;
  }

  onSubmit() {

    const fd = new FormData();
    for (let i = 0; i < this.productImage.length; i++) {
      fd.append("product-media", this.productImage[i]);
    }

    this.http
      .post("http://localhost:5000/products/test", fd)
      .subscribe((res) => {
        console.log(res, "done");
      });
  }
}
