import {Component, OnDestroy, OnInit} from '@angular/core';
import {Formation} from "../../models/formation";
import {ActivatedRoute} from "@angular/router";
import {FormationService} from "../../services/formation/formation.service";
import {Subscription} from "rxjs";
import {Rating} from "../../models/rating";
import {Commentaire} from "../../models/commentaire";
import {RessourceService} from "../../services/ressource/ressource.service";
import {Ressource} from "../../models/ressource";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-details-formation',
  templateUrl: './details-formation.component.html',
  styleUrls: ['./details-formation.component.scss']
})
export class DetailsFormationComponent implements OnInit,OnDestroy {

  base64Image: string;
  rating = 0;
  id: number;
  formation : any;
  formationSubscription: Subscription;
  ressourceSubscription: Subscription;
  ressource: any;
  constructor(private route: ActivatedRoute,private formationService: FormationService,
              private ressourceService: RessourceService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.formation = new Formation();
    this.formationSubscription= this.formationService.getFormationById(this.id).subscribe(data => {
      this.formation= data;
      this.base64Image=this.formation.image
      console.log(this.formation)
    });
    this.ressource = new Ressource();
    this.ressourceSubscription= this.ressourceService.getRessourcesByFormation_Id(this.id).subscribe(data => {
      this.ressource= data;
      console.log(this.ressource[0])
    })
  }

  returnStar(i: number) {
    let stars="";
    for (let j = 0; j < i; j++) {
      stars+='star '
    }
    return stars
  }

  ngOnDestroy(): void {
    this.formationSubscription?.unsubscribe();
    this.ressourceSubscription?.unsubscribe();
  }



  transform(doc: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(doc);
  }


}
