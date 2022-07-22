import { LoginComponent } from "./pages/login/login.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from "./pages/home/home.component";
import { EditProductComponent } from "./pages/edit-product/edit-product.component";
import { NotfoundComponent } from "./pages/notfound/notfound.component";
import { VariantModelComponent } from "./components/variant-model/variant-model.component";
import { ChatsComponent } from "./pages/chats/chats.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { MediaModalComponent } from "./components/media-modal/media-modal.component";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UserEffect } from "src/app/store/effects/auth.effects";
import { userReducer } from "src/app/store/reducers/auth.reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzTableModule } from 'ng-zorro-antd/table';
import { ProductEffect } from "./store/effects/product.effects";
import { productReducer } from "./store/reducers/product.reducers";
import { ProductTableComponent } from './components/product-table/product-table.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { LayoutComponent } from './components/layout/layout.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    EditProductComponent,
    NotfoundComponent,
    VariantModelComponent,
    ChatsComponent,
    SettingsComponent,
    MediaModalComponent,
    ProductTableComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NzButtonModule,
    NzInputModule,
    NzTypographyModule,
    NzDividerModule,
    NzIconModule,
    NzMessageModule,
    BrowserAnimationsModule,
    NzSpinModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzTableModule,
    NzDropDownModule,
    NzPaginationModule,
    NzModalModule,
    EffectsModule.forRoot([UserEffect, ProductEffect]),
    StoreModule.forRoot({ user: userReducer, product: productReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
