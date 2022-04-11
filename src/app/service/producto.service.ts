import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Producto } from '../model/producto';
//import { Persona } from 'src/model/persona';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  //creo variable para la peticion hacia el back java
  baseUrl:string = "http://localhost:8080/api/v1";
//por medio de inyeccion de dependencia con http client llamo a mi back
  constructor(private http:HttpClient) { }
//hacemos la peticion al back para obtener all
  getAll() : Observable<any>{
    return this.http.get(this.baseUrl + "/all");
  }
//se conecta con el metodo de persona.component.ts y al html
save(producto: Producto): Observable<any>{
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  return this.http.post(this.baseUrl + "/save", JSON.stringify(producto), {headers: headers});
}

delete(id:number): Observable<any>{
  return this.http.get(this.baseUrl + "/delete/"+id);
}
}