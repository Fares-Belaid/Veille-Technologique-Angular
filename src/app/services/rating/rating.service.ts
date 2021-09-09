import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Commentaire} from "../../models/commentaire";
import {Observable} from "rxjs";
import {Rating} from "../../models/rating";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private baseURL="http://localhost:8081/rating/";


  constructor(private httpClient: HttpClient) { }

  deleteRating(id: number): Observable<Object>{
    const user = window.sessionStorage.getItem("Auth-token");
    const headers = new HttpHeaders({'Authorization':"Bearer "+user});
    return this.httpClient.delete(`${this.baseURL}delete/${id}`);
  }

  saveRating(rating: Rating, idf : number): Observable<Object>{
    const user = window.sessionStorage.getItem("Auth-token");
    // @ts-ignore
    const headers = new HttpHeaders({'Authorization':"Bearer "+user,"auth-token":user});
    return this.httpClient.post(`${this.baseURL}save/${idf}`,rating,{headers: headers})
  }
}
