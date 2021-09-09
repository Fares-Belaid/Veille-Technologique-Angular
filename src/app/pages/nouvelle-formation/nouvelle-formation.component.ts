import { Component, OnInit } from '@angular/core';
import {Formation} from "../../models/formation";
import {FormationService} from "../../services/formation/formation.service";
import {Router} from "@angular/router";
import {RessourceService} from "../../services/ressource/ressource.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscriber} from "rxjs";
import {Ressource} from "../../models/ressource";

@Component({
  selector: 'app-nouvelle-formation',
  templateUrl: './nouvelle-formation.component.html',
  styleUrls: ['./nouvelle-formation.component.scss']
})
export class NouvelleFormationComponent implements OnInit {

  formationForm: FormGroup;
  titre: string;
  categorie: string;
  description: string;
  image: string;
  document: Object;

  myimg:string;
  myfile:string;

  formation: Formation = new Formation();
  ressource: Ressource = new Ressource();


  constructor(private formationService: FormationService, private router: Router, private ressourceService: RessourceService,
              private formationBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formationForm = this.formationBuilder.group({
      'titre': [null, Validators.required],
      'categorie': [null, Validators.required],
      'description': [null, Validators.required],
      'image': [null, Validators.required],
      'document': [null, Validators.required]
    });

  }

  saveFormation() {
    this.formationService.saveFormation(this.formationForm.value).subscribe(data => {
        console.log(data);
      },
      error => console.log(error));
    //this.goToFormationList();
  }


  goToFormationList() {
    this.router.navigate(['/home']);

  }

  public onFileChanged($event: Event) {
    const file=($event.target as HTMLInputElement).files![0];
    this.convertToBase64(file);

    this.formationForm.patchValue({
      fileSource: file
    });
  }

  convertToBase64(file: File){
    const observable= new Observable((subscriber: Subscriber<any>) =>{
    this.readFile(file,subscriber);
    });
    observable.subscribe((data) => {
      this.myimg=data;
      console.log("Start of image")
      console.log(data)
      console.log("end of image")
    })
  }

  readFile(file: File,subscriber: Subscriber<any>){
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload=()=>{
      subscriber.next(filereader.result);
      subscriber.complete();
    }
    filereader.onerror=(error)=> {
      subscriber.error(error);
      subscriber.complete();
    }
  }

  convertPDFToBase64(file: File){
    const observable= new Observable((subscriber: Subscriber<any>) =>{
      this.readFile(file,subscriber);

    });
    observable.subscribe((data) => {
      this.myfile=data;
      console.log("hetha el file")
      console.log(this.myfile)
    })
  }

  public onChangedPDF($event: Event) {
    const file=($event.target as HTMLInputElement).files![0];
    this.convertPDFToBase64(file);
  }


  saveDocument(){
    console.log(this.ressource);
    this.ressource.formation = this.formationForm.value;
    this.ressource.formation.image = this.myimg;
    this.ressource.document=this.myfile;

    console.log(this.ressource);

    this.ressourceService.saveDocument(this.ressource).subscribe(data => {

      this.document=data;
    })
    this.goToFormationList();


  }
  // onUploadFiles(files: File[]): void {
  //   const formData = new FormData();
  //   for (const file of files) {
  //     formData.append('file', file, file.name);
  //   }
  //   this.ressourceService.upload(formData).subscribe(
  //     event => {
  //       console.log(event);
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error);
  //     }
  //   );
  //   this.saveFormation();
  //
  // }
  // public onFileChanged(event: any) {
  //   //Select File
  //   this.selectedFile = event.target.files[0];
  // }
  //
  // onUpload() {
  //   console.log(this.selectedFile);
  //
  //   //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
  //   const uploadImageData = new FormData();
  //   uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  //
  //   //Make a call to the Spring Boot Application to save the image
  //   this.httpClient.post('http://localhost:8081/image/upload', uploadImageData, { observe: 'response' })
  //     .subscribe((response) => {
  //         if (response.status === 200) {
  //           this.message = 'Image uploaded successfully';
  //         } else {
  //           this.message = 'Image not uploaded successfully';
  //         }
  //       }
  //     );
  //
  //
  // }
}
