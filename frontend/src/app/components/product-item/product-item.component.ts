import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  priceWithOutDiscount: number = 0;

  @Input() item: Product;
  @Input() showDiscount: boolean = false;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.priceWithOutDiscount = Math.round(this.item.price / 0.5);
  }

}
