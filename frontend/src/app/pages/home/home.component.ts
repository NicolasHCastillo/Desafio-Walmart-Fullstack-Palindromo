import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { checkIsNumber, checkPalindrome } from '../../utils/helpers';
import { Paginate } from '../../models/paginate.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentPage: number = 1;
  limitPerPage: number = 12;

  loadingData: boolean = true;
  searchIsPalindrome: boolean = false;

  searchValue: string = '';
  oneProduct: boolean = false;
  total: number = 0;

  data: Product[] = [];
  paginate: Paginate = null;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts(search?: string){
    try {
      const { data, paginator } = await this.productService.getProducts(search, this.currentPage, this.limitPerPage).toPromise();
      this.currentPage = 1;
      this.data = data;
      this.paginate = paginator;
      this.total = paginator.total;
      this.oneProduct = false;
      if(search){
        this.setSearchValue(search);
      }
    } catch (error) {
      this.showErrorMessage(error);
    }
  }

  async getProduct(id: number){
    try {
      const response = await this.productService.getProduct(id).toPromise();
      this.currentPage = 1;
      this.data = response?.id ? [response] : [];
      this.paginate = null;
      this.total = this.data.length;
      this.oneProduct = true;
      this.setSearchValue(id);
    } catch (error) {
      this.showErrorMessage(error);
    }
  }

  showErrorMessage(error){
    const { error: { msg }, message  } = error;
    this.toastr.error( msg ?? message );
  }

  setSearchValue(event: string | number){
    this.searchValue = event.toString();
    this.searchIsPalindrome = checkPalindrome(event.toString());
  }

  getSearch(event: string){
    if(checkIsNumber(event)){
      this.getProduct(Number(event));
    }else{
      if(!event.length){
        this.resetSearch(false);
      }
      this.getProducts(event);
    }
  }

  goPage(event: number){
    this.currentPage = event;
    this.getProducts(this.searchValue);
  }

  resetSearch(getProducts: boolean = true){
    this.searchValue = '';
    this.searchIsPalindrome = false;
    if(getProducts){
      this.getProducts();
    } 
  }
}
