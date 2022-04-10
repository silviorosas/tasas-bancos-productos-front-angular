import { Component, OnInit } from '@angular/core';

import { MenuItem, MessageService } from 'primeng/api';
import { Producto } from '../model/producto'; 
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {


  //creo array producto
  productos!: Producto[];
  cols!: any[];
  items!: MenuItem[];
  displaySaveDialog: boolean=false;
  producto: Producto = {
    id: 0,
    nombre: "",
    descripcion: "",
    precio: ""
    
  };

  //hago la inyeccion de dependencias en el contructor llamando al service de persona
  constructor(private productoService: ProductoService, private messageService: MessageService) { }

  getAll() {
    this.productoService.getAll().subscribe(
      (result: any) => {
        let productos: Producto[] = [];
        for (let i = 0; i < result.length; i++) {
          let producto = result[i] as Producto;
          productos.push(producto);
        }
        this.productos = productos;
      },
      error => {
        console.log(error);
      }
    );
  }
/*menu*/
  showSaveDialog(){
    this.displaySaveDialog= true;
  }

  /*button*/
  save(){
    this.productoService.save(this.producto).subscribe(
      (result: any) => {
        let producto = result as Producto;
        this.productos.push(producto);
       // this.validarPersona(persona);
        this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Se guardó el producto correctamente." });
         this.displaySaveDialog = false;

      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.getAll();
    this.cols=[
      {field: "id", header: "Id"},
      {field: "nombre", header: "Nombre"},
      {field: "descripcion", header: "Descripción"},
      {field: "precio", header: "Precio"}
      
    ];
    /*menu*/
    this.items=[
      {
        label:"Nuevo",
        icon:'pi pi-fw pi-plus',
        command:()=> this.showSaveDialog()
      },
      {
        label:"Editar",
        icon:'pi pi-fw pi-pencil'
      }
    ]
  }

}