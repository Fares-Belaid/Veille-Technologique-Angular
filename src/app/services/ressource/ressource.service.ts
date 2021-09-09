import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Formation} from "../../models/formation";
import {Ressource} from "../../models/ressource";

@Injectable({
  providedIn: 'root'
})
export class RessourceService {

  private baseURL="http://localhost:8081/ressource/"

  constructor(private httpClient: HttpClient) { }

  // upload(formData: FormData): Observable<HttpEvent<string[]>> {
  //   return this.httpClient.post<string[]>(`${this.baseURL}/upload`, formData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   });
  // }


  saveDocument(ressource: Ressource): Observable<Object>{
    const user = window.sessionStorage.getItem("Auth-token");
    // @ts-ignore
    const headers = new HttpHeaders({'Authorization':"Bearer "+user,"auth-token":user});
    return this.httpClient.post(`${this.baseURL}save`,ressource,{headers: headers})
  }

  getRessourcesByFormation_Id(idf: number): Observable<Object>{
    const user = window.sessionStorage.getItem("Auth-token");
    const headers = new HttpHeaders({'Authorization':"Bearer "+user});
    return this.httpClient.get(`${this.baseURL}findByFormation/`+idf,{headers: headers});
  }

  update(id: number,ressource:Ressource): Observable<Object>{
    const user = window.sessionStorage.getItem("Auth-token");
    const headers = new HttpHeaders({'Authorization':"Bearer "+user});
      return this.httpClient.put(`${this.baseURL}update/`+id, ressource,{headers: headers})
  }
}
