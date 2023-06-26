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
  addRequest!: AddressAddRequest;
  userId: any;
  openUpdateBox: boolean = false;
  addressUpdateForm!: FormGroup;
  updateRequest!: Address;
  currentAddress!: Address;
  currentIndex: number = 0;
  

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

    // this.addressUpdateForm = new FormGroup({
    //   addressId: new FormControl(''),
    //   userId: new FormControl(''),
    //   title: new FormControl(''),
    //   address: new FormControl('',[Validators.required, Validators.minLength(30)]),
    // })
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
      this.addRequest = this.addressForm.value;
      this.addressService.AddUserAddress(this.addRequest).subscribe({
        next: (res) => {
          if (res.isSuccess == true) {
            this.toastr.success(res.message, 'Success!', {
              timeOut: 2000,
            });
            this.GetAlluserAddresses();
          } else {
            this.toastr.error(res.message, 'Failure', {
              timeOut: 2000,
            });
          };
        }
      });
    };
    
    this.ToggleAddBox();
  }

  ToggleAddBox() {
    this.openAddBox = !this.openAddBox;
  }

  ToggleUpdateBox() {
    this.openUpdateBox = !this.openUpdateBox;
  }

  RemoveAddress(addressId: any) {
    this.addressService.DeleteUserAddressById(addressId).subscribe({
      next: (res) => {
        if (res.isSuccess == true) {
          this.toastr.success(res.message, 'Success!', {
            timeOut: 2000,
          });
          this.GetAlluserAddresses();
        } else {
          this.toastr.error(res.message, 'Failure', {
            timeOut: 2000,
          });
        };
      }
    });
    
  }

  GetAddressById(addressId: any, index: number) {
    this.addressService.GetUserAddressById(addressId).subscribe(
      (res) => {
        if(res.isSuccess) {
          this.currentAddress = res.response;
          this.currentIndex == index;
          
          this.addressUpdateForm = new FormGroup({
            addressId: new FormControl(res.response.addressId),
            userId: new FormControl(res.response.userId),
            title: new FormControl(res.response.title),
            address: new FormControl(res.response.address,[Validators.required, Validators.minLength(30)]),
          });

          this.ToggleUpdateBox();
        }
      }
    )
  }

  UpdateAddress() {
    console.log(this.addressUpdateForm.value);
  }


  isCurrentAddress(address: Address): boolean {
    return this.currentAddress && address.addressId === this.currentAddress.addressId;
  }












  get address(): FormControl {
    return this.addressForm.get("address") as FormControl;
  }

}



