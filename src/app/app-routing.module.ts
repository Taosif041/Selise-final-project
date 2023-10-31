import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MycartComponent } from './mycart/mycart.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
 
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'product',
    component: ProductComponent,
    children: [
      
    ],
  },
  { path: 'mycart', component: MycartComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

