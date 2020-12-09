import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MagasinRoutingModule} from './magasin-routing.module';
import {MagasinComponent} from './magasin.component';
import {SharedModule} from '../../shared/shared.module';
import {ListeProduitComponent} from './liste-produit/liste-produit.component';
import {NouveauProduitComponent} from './nouveau-produit/nouveau-produit.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [MagasinComponent, ListeProduitComponent, NouveauProduitComponent],
  imports: [
    SharedModule,
    CommonModule,
    MagasinRoutingModule,
    ReactiveFormsModule
  ]
})
export class MagasinModule {
}
