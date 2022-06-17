import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalComponent } from './external.component';

@NgModule({
  declarations: [
    ExternalComponent
  ],
  exports: [
    ExternalComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class ExternalModule { }
