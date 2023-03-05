import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Banco } from '../model/banco';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-tasas',
  templateUrl: './tasas.component.html',
  styleUrls: ['./tasas.component.css'],
  styles: [`
  :host ::ng-deep .p-cell-editing {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
  }
`]
})
export class TasasComponent implements OnInit {
    //Defino esta propiedad para saber si el formulario se envió:
    public formSubmitted = false;
    //Defino formulario como una propiedad y valido que los campos son requeridos:
    public formFilter = this.fb.group({
       
      nombre: ['', [Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)]],
      tasa: ['', [Validators.required, Validators.pattern(/^[0-9]+([,][0-9]+)?$/)]]
        
    });
 
    idContador: number = 0;
    resguardo: { [s: string]: any; } = {};
    public disable: boolean = false;
    //se encuentra en html
    bancos:any=[]; 
    //para guardar bancos
    datos: any = []
  
 
   constructor(private fb: FormBuilder, public messageService: MessageService,private adminService: ProductoService) { }
 
   
   ngOnInit(): void { 
     this.traerBancos()
 
     this.formFilter = this.fb.group({
       nombre: [""],   
       tasa:[],       
       });
   }
 
  
   
   crearBancos() {
     this.formFilter.get('id')?.setValue(this.idContador);
     this.formSubmitted = true;
     if (this.formFilter.valid) {
       this.adminService.nuevoBanco(this.formFilter.value).subscribe(
         res=>{console.log(res)},
         error=>{console.log(error)}
       )
       const value = this.formFilter.value;
       this.bancos.push(value);
       this.formSubmitted = false;
       this.formFilter.reset()    
       console.log(this.bancos);
      }
      this.idContador++;  
     
   }
 
   traerBancos(){
     this.adminService.getAllBancos().subscribe( 
     (res:any)=>{
     this.bancos= res
     console.log(res)},
     error=>{console.log(error)}
   )
     
   }
   resguardoInfo(datos:any){
     this.resguardo[datos.id] = { ...datos };
   }
 
   guardarCambios(datos:any){
     if(datos.nombre == null){
       delete this.resguardo[datos.id];    
     }
     console.log(this.datos);
     this.actualizarBancos(datos);
   }
   actualizarBancos(datos: any) {
     this.adminService.ActualizarBancos(datos)
       .subscribe((respuesta: any ) => {
         console.log(respuesta);
       },error=>{console.log(error)})
   }
   
 
   cancelarEdicion(datos: any, index: number){
     this.datos[index] = this.resguardo[datos.id];
     delete this.resguardo[datos.id];
   }
 
   eliminar(id: number){
     let indice = this.bancos.indexOf(id)
     this.bancos.splice(indice, 1); 
     this.eliminarBancos(id);   
    
   }
   
   eliminarBancos(id:number){
     this.adminService.EliminarBancos(id)
     .subscribe((respuesta: any)=>{
       console.log(respuesta)
     } )
   }
 
 //****************************************************************
  
  
 
 }
 
 