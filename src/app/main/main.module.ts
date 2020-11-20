import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {SharedModule} from '../shared/shared.module';
import {MagasinModule} from './magasin/magasin.module';


@NgModule({
  declarations: [MainComponent],
  imports: [
    SharedModule,
    CommonModule,
    MainRoutingModule,
    MagasinModule
  ]
})
export class MainModule {
}
