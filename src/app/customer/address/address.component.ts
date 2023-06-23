import { Component, OnInit } from '@angular/core';
import { Address, AddressAddRequest } from '../shared/models/adress-models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/user/shared/authorization/auth.service';
import { AddressService } from '../shared/services/address.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit{
  openAddBox:boolean = false;
  addresses: Address[] = [];
  addressForm!: FormGroup;
  request!: AddressAddRequest;
  userId: any;

  constructor(
    private authService: AuthService,
    private addressService: AddressService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.GetAlluserAddresses();

    this.addressForm = new FormGroup({
      userId: new FormControl(this.userId),
      title: new FormControl('title'),
      address: new FormControl('',[Validators.required, Validators.minLength(30)]),
    });
  }

  GetAlluserAddresses() {
    this.addressService.GetAllUserAddress(this.userId).subscribe(
      (res)=> {
        if(res.isSuccess){
          this.addresses = res.response;
        }
      }
    );
  }


  submitRequest(){
    this.addressForm.markAllAsTouched();
    if (this.addressForm.valid) {
      this.request = this.addressForm.value;
      this.addressService.AddUserAddress(this.request).subscribe({
        next: (res) => {
          if (res.isSuccess == true) {
            this.toastr.success(res.message, 'Success!', {
              timeOut: 2000,
            });
            
          } else {
            this.toastr.error(res.message, 'Failure', {
              timeOut: 2000,
            });
            //console.log(res);
          }
        }
      })
    }
  }

  ToggleAddBox() {
    this.openAddBox = !this.openAddBox;
  }





  get address(): FormControl {
    return this.addressForm.get("address") as FormControl;
  }

}
