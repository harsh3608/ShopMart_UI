import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddProduct, ProductReturnResponse, GetProductsResponse } from '../models/Product-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productBaseServerLink: string = 'https://localhost:7071/api/v1/Product/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }
  addProduct(product:FormData): Observable<ProductReturnResponse>{
    return this.http.post<ProductReturnResponse>(this.productBaseServerLink+'AddProduct', product, { headers: new HttpHeaders().set("Accept", "multipart/form-data") });
  }


  getAllProducts(): Observable<GetProductsResponse> {
    return this.http.get<GetProductsResponse>(this.productBaseServerLink+'GetAllProducts', { headers: this.headers })
  }

  getProductById(productId: any): Observable<ProductReturnResponse> {
    return this.http.get<ProductReturnResponse> (this.productBaseServerLink+'GetProductById/'+ productId, { headers: this.headers })
  }
}
