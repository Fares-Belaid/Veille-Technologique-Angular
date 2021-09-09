import { Component, OnInit } from '@angular/core';
import {FormationService} from "../../services/formation/formation.service";
import {Formation} from "../../models/formation";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {

  formationSubscription: Subscription;
  id: number;
  formations: Formation[];


  constructor(private formationService: FormationService,private router: Router,
              private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.getFormations();

  }
  private getFormations(){
    this.formationService.getFormationList().subscribe(data => {
      this.formations = data;
    });
  }

  formationDetails(id: number){
    console.log("im here");
    this.router.navigate(['details-formation',id]);
  }

  ngOnDestroy(): void {
    this.formationSubscription?.unsubscribe();
  }

  transform(bs: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(bs);
  }
}
