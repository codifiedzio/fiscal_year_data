import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableComponent} from './table/table.component';

const routes: Routes = [
  {path:'',component:TableComponent}
];
@NgModule({
  imports: [ RouterModule.forRoot(
    routes,
    { enableTracing: true, useHash:true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
