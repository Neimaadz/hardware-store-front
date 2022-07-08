import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, ProductType } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }


  getProductTypes(): Observable<ProductType[]>{
    return this.http
      .get<ProductType[]>(
        `${this.apiURL}/productTypes`
      );
  }

  getProducts(): Observable<Product[]>{
    return this.http
      .get<Product[]>(
        `${this.apiURL}/products`
      );
  }
  deleteProduct(id: number): Observable<void> {
    return this.http
      .delete<void>(
        `${this.apiURL}/product/${id}`,
      )
      // .pipe(
      //     catchError(this.handleError)
      // );
  }
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http
      .put<Product>(
        `${this.apiURL}/product/${id}`, product
      )
      // .pipe(
      //     catchError(this.handleError)
      // );
  }
  
  createProduct(product: Product): Observable<void> {
    return this.http
      .post<void>(
        `${this.apiURL}/product`, product
      )
      // .pipe(
      //     catchError(this.handleError)
      // );
  }

}
