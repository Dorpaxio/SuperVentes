import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbCardModule, NbIconModule, NbLayoutModule, NbToastrModule, NbToastrService, NbToggleModule} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbToastrModule,
    NbCardModule,
    HttpClientModule,
    NbToggleModule,
    NbIconModule,
  ],
  exports: [
    NbLayoutModule,
    NbEvaIconsModule,
    NbToastrModule,
    NbCardModule,
    HttpClientModule,
    NbToggleModule,
    NbIconModule,
  ]
})
export class SharedModule {
}
