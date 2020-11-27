import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MagasinRoutingModule } from './magasin-routing.module';
import { MagasinComponent } from './magasin.component';
import {SharedModule} from '../../shared/shared.module';
import { ListeProduitComponent } from './liste-produit/liste-produit.component';


@NgModule({
  declarations: [MagasinComponent, ListeProduitComponent],
  imports: [
    SharedModule,
    CommonModule,
    MagasinRoutingModule
  ]
})
export class MagasinModule { }
