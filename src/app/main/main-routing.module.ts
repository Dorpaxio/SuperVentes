import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main.component';
import {MagasinComponent} from './magasin/magasin.component';
import {AuthGuard} from '../guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: 'magasin', component: MagasinComponent},
      {path: 'mon-panier', component: MagasinComponent, canActivate: [AuthGuard]}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
