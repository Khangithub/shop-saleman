import { ProductManagementComponent } from './pages/product-management/product-management.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [LoginComponent, ProductManagementComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
