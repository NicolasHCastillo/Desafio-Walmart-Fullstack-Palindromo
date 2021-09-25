import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestCompComponent } from './test-comp/test-comp.component';



@NgModule({
  declarations: [TestCompComponent],
  exports: [TestCompComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
