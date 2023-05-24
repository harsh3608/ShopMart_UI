import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddUser, LoginResponse, UserLogin } from '../models/user.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userBaseServerLink: string = 'https://localhost:7071/api/v1/Account/';

  constructor(private http: HttpClient) { }

  loginUser(login:UserLogin): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.userBaseServerLink+'login', login);
  }

  AddUserOrSeller(user:AddUser): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.userBaseServerLink+'register', user);
  }
}
