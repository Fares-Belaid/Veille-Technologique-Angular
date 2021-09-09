import {Component, Input, OnInit} from '@angular/core';
import {Commentaire} from "../../models/commentaire";
import {CommentaireService} from "../../services/commentaire/commentaire.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-commentaire',
  templateUrl: './add-commentaire.component.html',
  styleUrls: ['./add-commentaire.component.scss']
})
export class AddCommentaireComponent implements OnInit {

  @Input() idf : number;
  commentaireForm: FormGroup;

  commentaire: Commentaire = new Commentaire();

  constructor(private commentaireService: CommentaireService, private router: Router,
              private formationBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentaireForm = this.formationBuilder.group({
      'commentaire': [null, Validators.required]
    });
  }
  saveCommentaire(){
    this.commentaireService.saveCommentaire(this.commentaireForm.value,this.idf).subscribe(data =>{

      console.log(data);
      window.location.reload();
    })
  }
}
