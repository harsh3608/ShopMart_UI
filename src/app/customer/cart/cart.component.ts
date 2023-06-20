import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/user/shared/authorization/auth.service';
import { CartService } from '../shared/services/cart.service';
import { CartProduct } from '../shared/models/cart-models';
import { ProductService } from 'src/app/seller/shared/services/product.service';
import { Product } from 'src/app/seller/shared/models/Product-models';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
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
  products: Product[]=[];
  imageBaseLink: string = "https://localhost:7071/resources/";
  uniqueProducts: Product[]=[];

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private toastr: ToastrService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.cartId = this.authService.getCartId();
    this.GetAllCartProductsAndCount();
    this.GetUniqueProducts();
  }


  GetAllCartProductsAndCount() {
    this.cartService.GetAllCartProducts(this.cartId).subscribe(
      (res) => {
        if(res.isSuccess){
          this.cartCount = res.response.length;
          this.cartProducts = res.response;
          //to create array of products drom cart products
          for (const cartProduct of this.cartProducts) {
           this.GetProductById(cartProduct.productId).subscribe(res=>{
              this.products.push(res);               
            });            
          }    
           
        };
      }
    );
  }



  
  //To get whole product from product id
  GetProductById(productId: any): Observable<Product> {
    return this.productService.getProductById(productId).pipe(
      map((res) => {
        if (res.isSuccess) {
          return res.response;
        }
        throw new Error('Failed to retrieve product');
      })
    );
  }

  GetUniqueProducts() {

    console.log(this.products);
    for(const product of this.products){
      console.log(product);
    }
    
    


    // this.uniqueProducts = this.products.filter((product, index) => uniqueIds.indexOf(product.id) === index);
    
    //console.log(this.uniqueProducts);
  }

  //get qty of product in the cart
  GetQuantity(item: any): number {
    const count = this.products.filter((product) => product.name === item.name).length;
    return count > 1 ? count : 1;
  }

}
