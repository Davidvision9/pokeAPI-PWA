import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './modules/poke/list/list.component';
import { NotFoundComponent } from './core/errores/not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: ListComponent
  },
  {
    path: '404', component: NotFoundComponent
  },
  { 
    path: '**', component: ListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
