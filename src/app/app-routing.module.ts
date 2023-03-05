import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BancoComponent } from './banco/banco.component';
import { ProductoDosComponent } from './producto-dos/producto-dos.component';
import { ProductoComponent } from './producto/producto.component';
import { TasasComponent } from './tasas/tasas.component';

const routes: Routes = [
  { path: '', component: ProductoComponent},
  { path: 'tasas', component: TasasComponent},
  { path: 'bancos', component: BancoComponent},
  { path: 'prod', component: ProductoDosComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
