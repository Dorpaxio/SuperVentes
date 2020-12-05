import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {SharedModule} from '../shared/shared.module';
import {MagasinModule} from './magasin/magasin.module';
import { MonPanierComponent } from './mon-panier/mon-panier.component';


@NgModule({
  declarations: [MainComponent, MonPanierComponent],
  imports: [
    SharedModule,
    CommonModule,
    MainRoutingModule,
    MagasinModule
  ]
})
export class MainModule {
}
