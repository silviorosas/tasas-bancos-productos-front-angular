import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Producto } from '../model/producto';
import { Tasa } from '../model/tasa';
//import { Persona } from 'src/model/persona';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  //creo variable para la peticion hacia el back java
  baseUrl:string = "http://localhost:8081/api/v1";
  urlBanco:string = "http://localhost:8081/api/v2";
  urlTasa:string = "http://localhost:8081/api/v3";
//por medio de inyeccion de dependencia con http client llamo a mi back
  constructor(private http:HttpClient) { }
//hacemos la peticion al back para obtener all
  getAll(){
    return this.http.get(this.baseUrl + "/all");
  }

  getAllBancos(){
    return this.http.get(this.urlBanco + "/all");
  }

  getAllTasas(){
    return this.http.get(this.urlTasa + "/all");
  }

//se conecta con el metodo de persona.component.ts y al html
save(producto: Producto): Observable<any>{
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  return this.http.post(this.baseUrl + "/save", JSON.stringify(producto), {headers: headers});
}


delete(id:number): Observable<any>{
  return this.http.delete(this.baseUrl + "/delete/"+id);
}

// para bancos 
EliminarBancos(id:number){
  return this.http.delete(this.urlBanco + "/delete/"+id);
   }

   nuevoBanco(datos:any){
    return this.http.post(`${this.urlBanco}/save`, datos);
    }

     
  
    ActualizarBancos(datos:any){
      return this.http.post(`${this.urlBanco}/save`, datos);
      }

      getBancos(tipo: string | Number){
        return this.http.get(`${this.urlBanco}/all${tipo}`);
      }
  
//para tasas



nuevaTasa(datos:any){
  return this.http.post(`${this.urlTasa}/save`, datos);
  }

  

  ActualizarTasa(datos:any){
    return this.http.post(`${this.urlTasa}/save`, datos);
    }  
    
    
    eliminarTasas(id:Number){
      return this.http.delete(`${this.urlTasa}/delete/${id}`);
         }
      
      
   deleteTasas(datos:any): Observable<any>{
    return this.http.get(this.urlTasa + "/delete/"+datos);
   }

  // para boton buscar banco por nombre
  getBancosFilter(params: any) {
    console.log('ingresaaqui',params);
      const parametros = new HttpParams()     
      .set('nombre', params.nombre)
     // .set('tasa', params.tasa)
     const urlEndPoint = `${this.urlBanco}/`;
    return this.http.get<any>(urlEndPoint,{params: parametros })   
  }

   // para boton buscar productos
   getProductosFilter(params: any) {
    console.log('ingresaaqui',params);
      const parametros = new HttpParams()     
      .set('nombre', params.nombre)
      const urlEndPoint = `${this.baseUrl}/`;
    return this.http.get<any>(urlEndPoint,{params: parametros })   
  }

}