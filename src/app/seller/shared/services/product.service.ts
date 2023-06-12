import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddProduct, AddProductresponse } from '../models/Product-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productBaseServerLink: string = 'https://localhost:7071/api/v1/Product/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }
  addProduct(product:any): Observable<AddProductresponse>{
    return this.http.post<AddProductresponse>(this.productBaseServerLink+'AddProduct', product, { headers: this.headers });
  }

}
