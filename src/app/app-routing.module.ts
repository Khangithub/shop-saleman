import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SettingsComponent } from './pages/settings/settings.component';
import { ChatsComponent } from "./pages/chats/chats.component";
import { EditProdComponent } from "./pages/edit-prod/edit-prod.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { NotfoundComponent } from "./pages/notfound/notfound.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "chats",
    component: ChatsComponent,
  },
  {
    path: "settings",
    component: SettingsComponent,
  },
  {
    path: "prod/edit/:prodId",
    component: EditProdComponent,
  },
  { path: "**", component: NotfoundComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
