import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { FormationComponent } from './pages/formation/formation.component';
import { FooterComponent } from './component/footer/footer.component';
import { DetailsFormationComponent } from './pages/details-formation/details-formation.component';
import { NouvelleFormationComponent } from './pages/nouvelle-formation/nouvelle-formation.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { BouttonActionComponent } from './component/boutton-action/boutton-action.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { RatingComponent } from './pages/rating/rating.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from "@angular/forms";
import { MesFormationsComponent } from './pages/mes-formations/mes-formations.component';
import { HttpClientModule} from "@angular/common/http";
import { ReactiveFormsModule} from "@angular/forms";
import { UpdateFormationComponent } from './pages/update-formation/update-formation.component';
import { AddCommentaireComponent } from './pages/add-commentaire/add-commentaire.component';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    HomeComponent,
    HeaderComponent,
    FormationComponent,
    FooterComponent,
    DetailsFormationComponent,
    NouvelleFormationComponent,
    BouttonActionComponent,
    PaginationComponent,
    RatingComponent,
    MesFormationsComponent,
    UpdateFormationComponent,
    AddCommentaireComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFileUploaderModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
