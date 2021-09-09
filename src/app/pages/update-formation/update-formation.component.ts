import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormationService} from "../../services/formation/formation.service";
import {Formation} from "../../models/formation";
import {Observable, Subscriber, Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RessourceService} from "../../services/ressource/ressource.service";
import {HttpClient} from "@angular/common/http";
import {Ressource} from "../../models/ressource";

@Component({
  selector: 'app-update-formation',
  templateUrl: './update-formation.component.html',
  styleUrls: ['./update-formation.component.scss']
})
export class UpdateFormationComponent implements OnInit {

  id: number
  formationForm: FormGroup;
  titre: string;
  categorie: string;
  description: string;
  image: string;
  document: Object;
  myimg: string;
  myfile: string;
  idRes: number;
  formation: Formation = new Formation();
  ressource: any


  constructor(private formationService: FormationService, private router: Router,
              private ressourceService: RessourceService, private route: ActivatedRoute,
              private formationBuilder: FormBuilder, private httpClient: HttpClient) {
  }


  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.formationForm = this.formationBuilder.group({
      'titre': [null, Validators.required],
      'categorie': [null, Validators.required],
      'description': [null, Validators.required],
      'image': [null, Validators.required],
      'document': [null, Validators.required]
    });
    this.ressource = new Ressource();
    this.ressourceService.getRessourcesByFormation_Id(this.id).subscribe(data => {
      this.ressource= data;
      console.log(this.ressource[0]);

    })
  }



  goToFormationList() {
    this.router.navigate(['/home']);

  }

  public onFileChanged($event: Event) {
    const file = ($event.target as HTMLInputElement).files![0];
    this.convertToBase64(file);

    this.formationForm.patchValue({
      fileSource: file
    });
  }

  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((data) => {
      this.myimg = data;
      console.log("Start of image")
      console.log(data)
      console.log("end of image")
    })
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    }
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    }
  }

  convertPDFToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);

    });
    observable.subscribe((data) => {
      this.myfile = data;
      console.log("hetha el file")
      console.log(this.myfile)
    })
  }

  public onChangedPDF($event: Event) {
    const file = ($event.target as HTMLInputElement).files![0];
    this.convertPDFToBase64(file);
  }


  update(){
    this.ressource.formation = this.formationForm.value;
    this.ressource.formation.image = this.myimg;
    this.ressource.document = this.myfile;
    console.log(this.ressource)
    this.ressourceService.update(this.ressource[0].id,this.ressource).subscribe(data => {
    console.log(data);
  })
  }
}
