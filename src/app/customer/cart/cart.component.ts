import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/user/shared/authorization/auth.service';
import { CartService } from '../shared/services/cart.service';
import { CartProduct } from '../shared/models/cart-models';
import { ProductService } from 'src/app/seller/shared/services/product.service';
import { Product } from 'src/app/seller/shared/models/Product-models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartCount:number = 0;
  cartId:any;
  cartProducts: CartProduct[]=[];
  product!: Product;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private toastr: ToastrService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.cartId = this.authService.getCartId();
    this.GetAllCartProductsAndCount();
  }


  GetAllCartProductsAndCount() {
    this.cartService.GetAllCartProducts(this.cartId).subscribe(
      (res) => {
        if(res.isSuccess){
          this.cartCount = res.response.length;
          this.cartProducts = res.response;
          

          console.log(this.cartCount);
        };
      }
    );
  }


  getProductById(productId: any) {
    this.productService.getProductById(productId).subscribe(
      (res) => {
        if(res.isSuccess){
          this.product = res.response;
        }
      }
    )
  }




}
