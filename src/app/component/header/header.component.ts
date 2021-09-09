import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";
import {FormationService} from "../../services/formation/formation.service";
import {CollaborateurService} from "../../services/collaborateur.service";
import {Collaborateur} from "../../models/collaborateur";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  collaborateur= new Collaborateur();
  constructor(private tokenStorage: TokenStorageService, private router: Router,
             private collaborateurService: CollaborateurService) { }

  ngOnInit(): void {
    // this.collaborateur;
    this.collaborateurService.getCollaborateur().subscribe(data => {

      this.collaborateur= data;

    })  }

  deconnexion(){
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }

   mesFormation(){

    this.router.navigate(['/mes-formations']);
  }

  // getCollaborateurByAuth(){
  //   this.collaborateur= new Collaborateur();
  //   this.collaborateurService.getCollaborateur().subscribe(data => {
  //
  //     this.collaborateur= data;
  //     console.log("hereee" +  this.collaborateur)
  //   })
  // }

}
