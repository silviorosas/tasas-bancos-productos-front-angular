import { Component, OnInit } from '@angular/core';

import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Producto } from '../model/producto'; 
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {


  //creo array global producto
  productos!: Producto[];
  //array para obtener cols dinamicas
  cols!: any[];
  //para crear menu
  items!: MenuItem[];
  //varialbe para usar con el DialogModule en el html
  displaySaveDialog: boolean=false;
  //para formulario del DialogModule o modal vinculado al [(ngModel)]="producto.nombre"
  producto: Producto = {
    id: 0,
    nombre: "",
    descripcion: "",
    precio: ""    
  };
  //creo objeto producto para seleccionar en tabla
  selectedProducto: Producto={
    id: 0,
    nombre: "",
    descripcion: "",
    precio: "" 
  }

  //hago la inyeccion de dependencias en el contructor llamando al service de productp
  constructor(private productoService: ProductoService, private messageService: MessageService,private confirmService:ConfirmationService) { }

  getAll() {
    this.productoService.getAll().subscribe(
      (result: any) => {
        let productos: Producto[] = [];
        for (let i = 0; i < result.length; i++) {
           //casteo el result a producto
          let producto = result[i] as Producto;
          //array local
          productos.push(producto);
        }
        //se igual el array global con el array declarado local
        this.productos = productos;
      },
      error => {
        console.log(error);
      }
    );
  }
/*funcion para menu declarada debajo en this.items
cuando haga click la ventana dialog o modal se muestre*/
  showSaveDialog(editar:boolean){
    if(editar){
      if(this.selectedProducto != null &&  this.selectedProducto.id != 0){
      this.producto = this.selectedProducto;         
      }else{
      this.messageService.add({severity:"warn", summary:"Advertencia!", detail:"Debe seleccionar un producto"});
      return;
    }

    } else{
      this.producto= new Producto();
    }
    this.displaySaveDialog= true;
  }

  /*conectado con button por medio de (click)="save()"  */
  save(){
    this.productoService.save(this.producto).subscribe(
      (result: any) => {
        //casteo el result a producto
        let producto = result as Producto;
        //agrego producto
         this.validarProducto(producto);
       //muestro mensaje de guardado this.validarPersona(persona);
        this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Se guardó el producto correctamente." });
        //cierro la modal
        this.displaySaveDialog = false;

      },
      error => {
        console.log(error);
      }
    );
  }

  delete(){
    if(this.selectedProducto == null || this.selectedProducto.id == 0){
      this.messageService.add({severity:"warn", summary:"Advertencia!", detail:"Debe seleccionar un producto"});
      return;
    }

    this.confirmService.confirm({
      message:"¿Está seguro de eliminar producto?",
      accept: ()=>{
        this.productoService.delete(this.selectedProducto.id).subscribe(
        (result:any)=>{
          this.messageService.add({severity:"success",summary:"Resultado",detail:"Se eliminó producto correctamente"})
          this.deleteObjeto(result.id);
        }  
        )
      }
    })
  }

  //validar delete
  deleteObjeto(id:number){
    let index =this.productos.findIndex((e)=>e.id==id);
    if(index != -1){
      this.productos.splice(index,1);
    }
  }

  //validar actualizacion de productos al editar
  validarProducto(producto:Producto){
    //buscamos en el array el producto que tenga el mismo id que enviamos por parametro
    let index = this.productos.findIndex((e)=>e.id==this.producto.id);
    //si index es distinto de -1 es porque el objeto existe
    if(index != -1){
      //entonces le asignamos el nuevo valor
      this.productos[index]=producto;
    }else{
      //sino existe lo agrega al array
      this.productos.push(producto);
    }
  }

  ngOnInit(): void {
    //llamo al metodo getAll()
    this.getAll();
/*damos valor a las cols.Atributo field (td de table) refiere a los atributos del producto(producto.ts de model)
    y atributo header refiere a la cabecera(th de table) */ 
    this.cols=[
      {field: "id", header: "Id"},
      {field: "nombre", header: "Nombre"},
      {field: "descripcion", header: "Descripción"},
      {field: "precio", header: "Precio"}
      
    ];
    //inicializo array item para MenuItem
  /*para que se vea un dialog al hacer click en Nuevo voy a Overlay-Dialog e impor DialogModule
  en appModule */
    this.items=[
      {
        label:"Nuevo",
        icon:'pi pi-fw pi-plus',
        //creo funcion 
        command:()=> this.showSaveDialog(false)
      },
      {
        label:"Editar",
        icon:'pi pi-fw pi-pencil',
        command:()=> this.showSaveDialog(true)
      },
      {
        label:"Eliminar",
        icon:'pi pi-fw pi-times',
        command:()=> this.delete()
        
      }
    ]
  }

}