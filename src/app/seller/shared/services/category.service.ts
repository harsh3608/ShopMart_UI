import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoryResponse, CategoryReturnResponse } from "../models/Product-models";

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  productBaseServerLink: string = 'https://localhost:7071/api/v1/Category/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ){}

  getCategories(): Observable<CategoryResponse>{
    return this.http.get<CategoryResponse>(this.productBaseServerLink+'GetAllCategories', { headers: this.headers });
  }

  getCategoryById(categoryId:any): Observable<CategoryReturnResponse> {
    return this.http.get<CategoryReturnResponse>(this.productBaseServerLink+'GetCategoryById/'+categoryId, { headers: this.headers })
  }

}