import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { map } from 'rxjs/operators';
import * as CONSTANTS from '../constants/general.constant';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Product } from '../models/product.model';
import { ResponsePaginate } from '../models/response-paginate.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private dataService: DataService
  ) { }
  
  /**
   * 
   * @param search 
   * @param page
   * @param limit
   * @returns 
   */
  getProducts(search?: string, page: number = 1, limit: number =1): Observable<ResponsePaginate>{

    let params = new HttpParams();
    if(search && search != ''){
      params = params.append(CONSTANTS.PARAM_SEARCH, search);
    }
    if(page > 1){
      params = params.append(CONSTANTS.PARAM_PAGE, page.toString());
    }
    if(limit){
      params =  params.append(CONSTANTS.PARAM_LIMIT, limit.toString());
    }

    return this.dataService.get(`${CONSTANTS.API}product`, params)
    .pipe(
      map((resp: any) => {
        return resp['body'];
      })
    )
  }

  /**
   * 
   * @param id 
   * @returns 
   */
   getProduct(id: number): Observable<Product>{
    return this.dataService.get(`${CONSTANTS.API}product/${id}`)
    .pipe(
      map((resp: any) => {
        return resp['body'];
      })
    )
  }

}
