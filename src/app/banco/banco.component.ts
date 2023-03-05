import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html',
  styleUrls: ['./banco.component.css'],
  styles: [`
  :host ::ng-deep .p-cell-editing {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
  }
`]
})
export class BancoComponent implements OnInit {

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
   bancos:any=[]; 
   //para guardar productos  
   datos: any = []
 

  constructor(private fb: FormBuilder, public messageService: MessageService,private adminService: ProductoService) { }

  
  ngOnInit(): void { 
    this.traerBancos()

    this.formFilter = this.fb.group({
      nombre: [""],   
      tasa:[""],       
      });
  }

  //para boton  buscar
  initFormFilter(): void {
    this.formFilter = this.fb.group({
      nombre: [""],   
      tasa:[""],    
    }
      , { validator: [] });
  }
 
  public isLoading: boolean = false;
  searchUsers(): void {
    if (this.formFilter.invalid) return ;
   this.getBanksFilter();
   
  }

  //traer maestros con parametros para boton buscar  
  getBanksFilter(){
    console.log("formFilter",this.formFilter.value)
    let params: any = {      
      nombre: this.formFilter.get('nombre')?.value,
      //tasa: this.formFilter.get('tasa')?.value,         
    };
    console.log("parametros para ver:",params)
    this.adminService.getBancosFilter(params)
    .subscribe(
      (res:any) =>{         
        this.datos=res          
        console.log("getMaestros",res)       
      })
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
      this.datos.push(value);           
      this.formSubmitted = false;
      this.formFilter.reset()
      console.log(this.datos);
     }
     this.idContador++;  
  
  }

  traerBancos(){
    this.adminService.getAllBancos().subscribe( 
    (res:any)=>{
    this.datos= res
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
      .subscribe((respuesta: any) => {
        console.log(respuesta);
      },error=>{console.log(error)})
  }
  

  cancelarEdicion(datos: any, index: number){
    this.datos[index] = this.resguardo[datos.id];
    delete this.resguardo[datos.id];
  }

  eliminar(id: number){
    let indice = this.datos.indexOf(id)
    this.datos.splice(indice, 1); 
    this.eliminarBancos(id);
   
   
  }
  
  eliminarBancos(id:number){
    this.adminService.EliminarBancos(id)
    .subscribe((respuesta: any)=>{
      console.log(respuesta )
    } )
  }

//****************************************************************
 
 

}

