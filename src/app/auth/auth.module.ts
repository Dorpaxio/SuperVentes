import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {ConnexionComponent} from './connexion/connexion.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ConnexionComponent, InscriptionComponent],
  imports: [
    SharedModule,
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {
}
