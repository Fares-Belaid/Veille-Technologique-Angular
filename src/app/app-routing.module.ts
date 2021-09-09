import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import {DetailsFormationComponent} from "./pages/details-formation/details-formation.component";
import {NouvelleFormationComponent} from "./pages/nouvelle-formation/nouvelle-formation.component";
import {MesFormationsComponent} from "./pages/mes-formations/mes-formations.component";
import {ApplicationGuardService} from "./services/application-guard.service";
import {UpdateFormationComponent} from "./pages/update-formation/update-formation.component";

const routes: Routes = [
  { path: 'login', component: PageLoginComponent},
  { path: 'home', component: HomeComponent,canActivate: [ApplicationGuardService]},
  { path: '', component: PageLoginComponent,canActivate: [ApplicationGuardService]},
  { path: 'details-formation/:id', component: DetailsFormationComponent,canActivate: [ApplicationGuardService]},
  { path: 'nouvelle-formation', component: NouvelleFormationComponent,canActivate: [ApplicationGuardService]},
  { path: 'mes-formations', component: MesFormationsComponent,canActivate: [ApplicationGuardService]},
  { path: 'update-formation/:id', component: UpdateFormationComponent,canActivate: [ApplicationGuardService]},
  // { path: 'details-formation', component: DetailsFormationComponent,canActivate: [ApplicationGuardService]},
  // { path: 'update-formation', component: UpdateFormationComponent,canActivate: [ApplicationGuardService]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
