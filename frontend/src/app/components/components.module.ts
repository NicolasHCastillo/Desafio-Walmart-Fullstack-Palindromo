import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { RibbonCornerComponent } from './ribbon-corner/ribbon-corner.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import { TitleComponent } from './title/title.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    ProductListComponent, 
    ProductItemComponent,
    RibbonCornerComponent,
    HeaderComponent,
    PaginatorComponent,
    TitleComponent
  ],
  exports: [
    ProductListComponent, 
    ProductItemComponent,
    RibbonCornerComponent,
    HeaderComponent,
    PaginatorComponent,
    TitleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule
  ]
})
export class ComponentsModule { }
