import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {Formation} from "../../models/formation";
import {FormationService} from "../../services/formation/formation.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import {RessourceService} from "../../services/ressource/ressource.service";

@Component({
  selector: 'app-mes-formations',
  templateUrl: './mes-formations.component.html',
  styleUrls: ['./mes-formations.component.scss']
})
export class MesFormationsComponent implements OnInit,OnDestroy {

  base64Image: string;
  formationSubscription: Subscription;
  id: number;
  formations: Formation[];

  constructor(private formationService: FormationService,private router: Router,
              private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.mesFormation();

  }



   formationDetails(id: number){
    console.log("im here");
    this.router.navigate(['details-formation',id]);
  }

   updateFormation(id:number){
    this.router.navigate(['update-formation',id]);
  }

  deleteFormateur(id: number){
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ?',
      text: 'Vous ne pourrez pas récupérer ce fichier !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, Supprimer !',
      cancelButtonText: 'Non, Garder'
    }).then((result) => {
      if (result.value) {
        this.formationService.deleteFormation(id).subscribe(data => {
          console.log(data);
          this.mesFormation();
        })
        Swal.fire(
          'Supprimé!',
          'Votre fichier a été supprimé.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'Votre fichier est en sécurité :)',
          'error'
        )
      }
    })
  }
  mesFormation(){

    this.formationService.getFormationByCollaborateur().subscribe(data => {
      console.log(data);

      this.formations=data;
    })
    this.router.navigate(['/mes-formations']);
    // this.base64Image=this.formations.image;

  }

  ngOnDestroy(): void {
    this.formationSubscription?.unsubscribe();
  }


  transform(bs: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(bs);
  }
}
