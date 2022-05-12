import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { ProductManagementComponent } from "./pages/product-management/product-management.component";
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [AppComponent, ProductManagementComponent, LoginComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
