import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbToastrModule,
  NbToggleModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbToastrModule.forRoot({preventDuplicates: true}),
    NbCardModule,
    HttpClientModule,
    NbToggleModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbFormFieldModule,
  ],
  exports: [
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    HttpClientModule,
    NbToggleModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbFormFieldModule
  ]
})
export class SharedModule {
}
