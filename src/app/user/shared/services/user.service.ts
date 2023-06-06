import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddUser, ReturnResponse, UserLogin } from '../models/user.models';
import { Observable } from 'rxjs';
import { ChangePassword, ForgotPassword, OtpReturnResponse, ResetPassword } from '../models/passwords.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userBaseServerLink: string = 'https://localhost:7071/api/v1/Account/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  loginUser(login:UserLogin): Observable<ReturnResponse>{
    return this.http.post<ReturnResponse>(this.userBaseServerLink+'login', login, { headers: this.headers });
  }

  AddUserOrSeller(user:AddUser): Observable<ReturnResponse>{
    return this.http.post<ReturnResponse>(this.userBaseServerLink+'register', user, { headers: this.headers });
  }

  ChangePassword(model:ChangePassword): Observable<OtpReturnResponse> {
    return this.http.post<OtpReturnResponse>(this.userBaseServerLink+'Change-Password', model, { headers: this.headers });
  }

  ForgotPassword(model:ForgotPassword): Observable<OtpReturnResponse> {
    return this.http.post<OtpReturnResponse>(this.userBaseServerLink+'Forgot-Password', model, { headers: this.headers });
  }

  ResetPassword(model:ResetPassword): Observable<OtpReturnResponse> {
    return this.http.post<OtpReturnResponse>(this.userBaseServerLink+'Reset-Password', model, { headers: this.headers });
  }

}
