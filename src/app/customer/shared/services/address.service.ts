import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressAddRequest, AddressListReturnResponse, AddressReturnResponse, DeleteAddressReturnResponse } from '../models/adress-models';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  addressBaseServerLink: string = 'https://localhost:7071/api/v1/Address/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  AddUserAddress(request: AddressAddRequest) :Observable<AddressReturnResponse> {
    return this.http.post<AddressReturnResponse> (this.addressBaseServerLink+ 'AddUserAddress', request, { headers: this.headers })
  }

  UpdateUserAddress(request: AddressAddRequest) :Observable<AddressReturnResponse> {
    return this.http.put<AddressReturnResponse> (this.addressBaseServerLink+ 'UpdateUserAddress', request, { headers: this.headers })
  }

  GetUserAddressById(addressId: any) :Observable<AddressReturnResponse> {
    return this.http.get<AddressReturnResponse> (this.addressBaseServerLink+ 'GetAddressById/' + addressId, { headers: this.headers })
  }

  GetAllUserAddress(userId: any) :Observable<AddressListReturnResponse> {
    return this.http.get<AddressListReturnResponse> (this.addressBaseServerLink+ 'GetAllUserAddresses/' + userId, { headers: this.headers })
  }

  DeleteUserAddressById(addressId: any) :Observable<DeleteAddressReturnResponse> {
    return this.http.delete<DeleteAddressReturnResponse> (this.addressBaseServerLink+ 'DeleteAddressById/' + addressId, { headers: this.headers })
  }
}
