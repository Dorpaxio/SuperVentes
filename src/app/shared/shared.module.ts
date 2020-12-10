import {NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule, NbPopoverModule, NbSelectModule, NbSpinnerModule,
  NbToastrModule,
  NbToggleModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {HttpClientModule} from '@angular/common/http';
import {TruncatePipe} from './pipes/truncate.pipe';
import {MontantTotalPipe} from './pipes/montant-total.pipe';
import {FormsModule} from '@angular/forms';
import {ArrowIconPipe} from './pipes/arrow-icon.pipe';


@NgModule({
  declarations: [TruncatePipe, MontantTotalPipe, ArrowIconPipe],
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
    NbPopoverModule,
    NbSpinnerModule,
    NbSelectModule,
    FormsModule
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
    NbPopoverModule,
    NbSpinnerModule,
    MontantTotalPipe,
    NbSelectModule,
    FormsModule,
    ArrowIconPipe
  ],
  providers: [MontantTotalPipe, CurrencyPipe]
})
export class SharedModule {
}
