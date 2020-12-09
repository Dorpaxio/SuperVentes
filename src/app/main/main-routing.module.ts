import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main.component';
import {MagasinComponent} from './magasin/magasin.component';
import {AuthGuard} from '../guards/auth.guard';
import {MonPanierComponent} from './mon-panier/mon-panier.component';
import {NouveauProduitComponent} from './magasin/nouveau-produit/nouveau-produit.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: 'magasin', component: MagasinComponent},
      {path: 'nouveau-produit', component: NouveauProduitComponent, canActivate: [AuthGuard]},
      {path: 'mon-panier', component: MonPanierComponent, canActivate: [AuthGuard]}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
