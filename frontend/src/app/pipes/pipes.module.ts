import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from './currency.pipe';
import { SafePipe } from './safe.pipe';
import { ExternalHrefPipe } from './external-href.pipe';

@NgModule({
  declarations: [
    CurrencyPipe,
    SafePipe,
    ExternalHrefPipe
  ],
  exports:[
    CurrencyPipe,
    SafePipe,
    ExternalHrefPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
