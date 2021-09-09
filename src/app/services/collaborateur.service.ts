import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Collaborateur} from "../models/collaborateur";

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {

  private baseURL="http://localhost:8081/collaborateur";

  constructor(private httpClient: HttpClient) { }

  getCollaborateur() : Observable<Collaborateur>{
    const user = window.sessionStorage.getItem("Auth-token");
    // @ts-ignore
    const headers = new HttpHeaders({'Authorization':"Bearer "+user,"auth-token":user});
    // @ts-ignore
    return this.httpClient.get(`${this.baseURL}/byAuth`,{headers: headers})
  }


}
