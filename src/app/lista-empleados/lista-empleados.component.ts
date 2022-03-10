import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../empleado.service';
import {Empleado} from './../empleado';


@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {

  empleados:Empleado[];
  constructor(private empleadoServicio:EmpleadoService) { }

  ngOnInit(): void {
    this.getEmpleados();
    /*
    //ejemplo para enviar a la tabla 
    this.empleados= [{
      "id":1,
      "nombre":"Pett",
      "apellido":"Lop",
      "email":"pet@gmail.com"
    }];*/

  }

  private getEmpleados(){
    this.empleadoServicio.getListEmpleados().subscribe(dato=>{
      this.empleados=dato;
    })
  }

}