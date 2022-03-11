import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoService } from '../empleado.service';
import {Empleado} from './../empleado';


@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {

  empleados:Empleado[];
  constructor(private empleadoServicio:EmpleadoService,private router:Router) { }

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

  actualizarEmpleado(id:number){
    this.router.navigate(['actualizar-empleado',id]);
  }

  eliminarEmpleado(id:number){
    this.empleadoServicio.eliminarEmpleado(id).subscribe(dato=>{
      console.log(dato);
      this.getEmpleados();

    });
  }

  private getEmpleados(){
    this.empleadoServicio.getListEmpleados().subscribe(dato=>{
      this.empleados=dato;
    });
  }

}