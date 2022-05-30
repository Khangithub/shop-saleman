import { LoginComponent } from "./pages/login/login.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from "./pages/home/home.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ProdListComponent } from "./components/prod-list/prod-list.component";
import { EditProdComponent } from "./pages/edit-prod/edit-prod.component";
import { NotfoundComponent } from "./pages/notfound/notfound.component";
import { VariantModelComponent } from "./components/variant-model/variant-model.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ChatsComponent } from './pages/chats/chats.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    ProdListComponent,
    EditProdComponent,
    NotfoundComponent,
    VariantModelComponent,
    ChatsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
