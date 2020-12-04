import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule, NbToastrModule, NbToastrService, NbToggleModule} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {HttpClientModule} from '@angular/common/http';
import { TruncatePipe } from './pipes/truncate.pipe';


@NgModule({
  declarations: [TruncatePipe],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbToastrModule,
    NbCardModule,
    HttpClientModule,
    NbToggleModule,
    NbIconModule,
    NbButtonModule,
  ],
  exports: [
    NbLayoutModule,
    NbEvaIconsModule,
    NbToastrModule,
    NbCardModule,
    HttpClientModule,
    NbToggleModule,
    NbIconModule,
    NbButtonModule,
    TruncatePipe,
  ]
})
export class SharedModule {
}
