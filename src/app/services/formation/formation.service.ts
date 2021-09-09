import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Formation} from "../../models/formation";
import {Ressource} from "../../models/ressource";

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private baseURL="http://localhost:8081/formation"

  constructor(private httpClient: HttpClient) { }

  getFormationList() : Observable<Formation[]> {
    const user = window.sessionStorage.getItem("Auth-token");
    const headers = new HttpHeaders({'Authorization':"Bearer "+user});
    return this.httpClient.get<Formation[]>(`${this.baseURL}/`,{headers: headers});
  }

  // getFormationByCollaboratuerName(nom: string) : Observable<Formation[]> {
  //   return this.httpClient.get<Formation[]>(`${this.baseURL}`+nom);
  // }
  deleteFormation(id: number): Observable<Object>{
    const user = window.sessionStorage.getItem("Auth-token");
    const headers = new HttpHeaders({'Authorization':"Bearer "+user});
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`,{headers: headers});
  }
  getFormationById(id: number): Observable<Object>{
    const user = window.sessionStorage.getItem("Auth-token");
    const headers = new HttpHeaders({'Authorization':"Bearer "+user});
    return this.httpClient.get(`${this.baseURL}/find/`+id,{headers: headers});
  }
  saveFormation(formation: Formation): Observable<Object>{

    console.log(formation);
    const user = window.sessionStorage.getItem("Auth-token");

    // @ts-ignore
    const headers = new HttpHeaders({'auth-token':user,'Authorization':"Bearer "+user});
    return this.httpClient.post(`${this.baseURL}/save`,formation,{headers: headers})
  }

  getFormationByCollaborateur() : Observable<Formation[]> {
    const user = window.sessionStorage.getItem("Auth-token");
    // @ts-ignore
    const headers = new HttpHeaders({'auth-token':user,'Authorization':"Bearer "+user});
    return this.httpClient.get<Formation[]>(`${this.baseURL}/collaborateur`,{headers: headers});
  }

  update(formation: Formation): Observable<Object>{
    const user = window.sessionStorage.getItem("Auth-token");
    const headers = new HttpHeaders({'Authorization':"Bearer "+user});
    return this.httpClient.put(`${this.baseURL}/update`, formation,{headers: headers})
  }
}
