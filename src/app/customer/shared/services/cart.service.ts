import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartListResponse, CartProductRequest, CartReturnResponse } from '../models/cart-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartBaseServerLink: string = 'https://localhost:7071/api/v1/Cart/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  AddCartProduct(addRequest :CartProductRequest):Observable<CartReturnResponse>{
    return this.http.post<CartReturnResponse>(this.cartBaseServerLink+'AddProductsToCart', addRequest,{ headers: this.headers })
  }

  RemoveCartProduct(cartId: any, productId: any) :Observable<CartReturnResponse> {
    return this.http.delete<CartReturnResponse> (this.cartBaseServerLink + 'RemoveProductsFromCart/' + cartId+'/' + productId, { headers: this.headers })
  }

  GetAllCartProducts(cartId: any) :Observable<CartListResponse> {
    return this.http.get<CartListResponse>(this.cartBaseServerLink+'GetAllCartProducts/' + cartId, { headers: this.headers })
  }
}
