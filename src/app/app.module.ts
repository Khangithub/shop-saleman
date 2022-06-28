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
import { ChatsComponent } from "./pages/chats/chats.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { MediaModalComponent } from "./components/media-modal/media-modal.component";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UserEffect } from "src/app/store/effects/user.effects";
import { userReducer } from "src/app/store/reducers/user.reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';

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
    SettingsComponent,
    MediaModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NzButtonModule,
    NzInputModule,
    NzTypographyModule,
    NzDividerModule,
    NzIconModule,
    EffectsModule.forRoot([UserEffect]),
    StoreModule.forRoot({ user: userReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
