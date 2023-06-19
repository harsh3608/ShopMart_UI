import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FavouriteProductRequest, FavouriteReturnResponse, FavsListResponse } from '../models/favourites-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  favouriteBaseServerLink: string = 'https://localhost:7071/api/v1/Favourite/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  AddFavProduct(addRequest :FavouriteProductRequest):Observable<FavouriteReturnResponse>{
    return this.http.post<FavouriteReturnResponse>(this.favouriteBaseServerLink+'AddProductsToFav', addRequest,{ headers: this.headers })
  }

  RemoveFavProduct(favouriteId: any, productId: any) :Observable<FavouriteReturnResponse> {
    return this.http.delete<FavouriteReturnResponse> (this.favouriteBaseServerLink + 'RemoveProductsFromFav/' + favouriteId+'/' + productId, { headers: this.headers })
  }

  GetAllFavourites(favouriteId: any) :Observable<FavsListResponse> {
    return this.http.get<FavsListResponse>(this.favouriteBaseServerLink+'GetAllFavourites/' + favouriteId, { headers: this.headers })
  }
  
}
