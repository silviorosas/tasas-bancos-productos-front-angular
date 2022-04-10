import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Producto } from '../model/producto';
//import { Persona } from 'src/model/persona';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  baseUrl:string = "http://localhost:8080/api/v1";

  constructor(private http:HttpClient) { }

  getAll() : Observable<any>{
    return this.http.get(this.baseUrl + "/all");
  }
//se conecta con el metodo de persona.component.ts y al html
save(producto: Producto): Observable<any>{
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  return this.http.post(this.baseUrl +"/save", JSON.stringify(producto), {headers: headers});
}
}