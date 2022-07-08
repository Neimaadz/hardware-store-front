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
      .get<ProductType[]>(`${this.apiURL}/productTypes`);
  }

  getProducts(): Observable<Product[]>{
    return this.http
      .get<Product[]>(`${this.apiURL}/products`);
  }
  deleteProduct(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiURL}/product/${id}`)
      // .pipe(
      //     catchError(this.handleError)
      // );
  }
  updateProduct(id: number, product: Product, imageFile: File): Observable<Product> {
    const formData: FormData = new FormData();
    Object.entries(product).forEach(([key, value]) => formData.append(key, value) );
    if (imageFile){
      formData.append("image", imageFile)
    }

    return this.http
      .put<Product>(`${this.apiURL}/product/${id}`, formData)
      // .pipe(
      //     catchError(this.handleError)
      // );
  }
  
  createProduct(product: Product, imageFile: File): Observable<void> {
    const formData: FormData = new FormData();
    Object.entries(product).forEach(([key, value]) => formData.append(key, value) );
    if (imageFile){
      formData.append("image", imageFile)
    }

    return this.http
      .post<void>(`${this.apiURL}/product`, formData)
      // .pipe(
      //     catchError(this.handleError)
      // );
  }

}
