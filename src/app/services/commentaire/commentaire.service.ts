import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Formation} from "../../models/formation";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Commentaire} from "../../models/commentaire";
import {Rating} from "../../models/rating";

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  private baseURL="http://localhost:8081/commentaire/"

  constructor(private httpClient: HttpClient) { }

  deleteCommentaire(id: number): Observable<Object>{
    const user = window.sessionStorage.getItem("Auth-token");
    const headers = new HttpHeaders({'Authorization':"Bearer "+user});
    return this.httpClient.delete(`${this.baseURL}delete/${id}`);
  }

  saveCommentaire(commentaire: Commentaire, idf : number): Observable<Object>{
    const user = window.sessionStorage.getItem("Auth-token");
    // @ts-ignore
    const headers = new HttpHeaders({'Authorization':"Bearer "+user,"auth-token":user});
    return this.httpClient.post(`${this.baseURL}save/${idf}`,commentaire,{headers: headers})
  }
}
