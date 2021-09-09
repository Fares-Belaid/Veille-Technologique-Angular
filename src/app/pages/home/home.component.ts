import { Component, OnInit } from '@angular/core';
import {FormationService} from "../../services/formation/formation.service";
import {Formation} from "../../models/formation";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formations: Formation[];
  constructor(private formationService: FormationService,private router: Router ) { }

  ngOnInit(): void {
    this.getFormations();

  }

  private getFormations(){
    this.formationService.getFormationList().subscribe(data => {
      this.formations = data;
    });
  }

  formationDetails(id: number){
    this.router.navigate(['details-formation',id]);
  }
}
