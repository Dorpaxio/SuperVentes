import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule, NbPopoverModule,
  NbToastrModule,
  NbToggleModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {HttpClientModule} from '@angular/common/http';
import { TruncatePipe } from './pipes/truncate.pipe';


@NgModule({
  declarations: [TruncatePipe],
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
    NbPopoverModule
  ],
  exports: [
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    HttpClientModule,
    NbToggleModule,
    NbIconModule,
    NbButtonModule,
    TruncatePipe,
    NbInputModule,
    NbFormFieldModule,
    NbPopoverModule
  ]
})
export class SharedModule {
}
