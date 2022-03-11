import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from './empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private baseURL = "http://localhost:8080/api/v1/empleados";

  constructor(private httpClient:HttpClient) { }
//metodo que obtiene los empleados
  getListEmpleados():Observable<Empleado[]>{
    return this.httpClient.get<Empleado[]>(`${this.baseURL}`);
  }

  registrarEmpleado(empleado:Empleado):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,empleado);
  }

  actualizarEmpleado(id:number,empleado:Empleado):Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,empleado);
  }

  getEmpleadoPorId(id:number):Observable<Object>{
    return this.httpClient.get(`${this.baseURL}/${id}`);
  }

  eliminarEmpleado(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  
  
}