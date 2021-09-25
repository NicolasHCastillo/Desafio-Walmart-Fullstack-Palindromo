import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [HomeComponent, PagesComponent],
  exports:[
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule
  ]
})
export class PagesModule { }
