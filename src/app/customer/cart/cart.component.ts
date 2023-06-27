import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/user/shared/authorization/auth.service';
import { CartService } from '../shared/services/cart.service';
import { CartProduct, CartProductRequest } from '../shared/models/cart-models';
import { ProductService } from 'src/app/seller/shared/services/product.service';
import { Category, Product } from 'src/app/seller/shared/models/Product-models';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/seller/shared/services/category.service';
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
  totalPrice:number = 0;
  categories: Category[]=[];
  category!: Category;
  AddCartRequest!: CartProductRequest;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private toastr: ToastrService,
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.cartId = this.authService.getCartId();
    this.GetAllCartProductsAndCount(); 
    this.categoryService.getCategories().subscribe(
      (res) => {
        if(res.isSuccess){
          this.categories = res.response;
        };
      }
    );
  }


  GetAllCartProductsAndCount() {
    this.cartService.GetAllCartProducts(this.cartId).subscribe(
      (res) => {
        if(res.isSuccess){
          this.cartCount = res.response.length;
          this.cartProducts = res.response;
          // Create a set to track unique product IDs
          const uniqueProductIds = new Set();
          //to create array of products drom cart products
          for (const cartProduct of this.cartProducts) {
           this.GetProductById(cartProduct.productId).subscribe(res=>{
              this.products.push(res); 
              this.totalPrice += res.price;             
            });  
            //
            if (!uniqueProductIds.has(cartProduct.productId)) {
              uniqueProductIds.add(cartProduct.productId); // Add the product ID to the set
              this.GetProductById(cartProduct.productId).subscribe(res => {
                this.uniqueProducts.push(res);
              });
            }          
          };    
           
        };
      }
    );
  }


  GetCategoryById(categoryId:any): string {
    let name = 'name';
    this.categories.forEach((item)=>{
      if(item.categoryId == categoryId) {
        name =  item.categoryName
      }
    })
    return name;
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
 
  //get qty of product in the cart
  GetQuantity(productId: any): number {
    const count = this.products.filter((product) => product.id === productId).length;
    return count > 1 ? count : 1;
  }

  
 //###################################################################
  GetAllCartProductsCount() {
    this.cartService.GetAllCartProducts(this.cartId).subscribe(
      (res) => {
        if(res.isSuccess){
          this.cartCount = res.response.length;
          this.cartProducts = res.response;
          //////////
          const uniqueProductIds = new Set();
          this.products.length = 0;
          this.totalPrice = 0;
          this.uniqueProducts.length = 0;
          ////////
          for (const cartProduct of this.cartProducts) {
            this.GetProductById(cartProduct.productId).subscribe(res=>{
               this.products.push(res); 
               this.totalPrice += res.price;             
             });  
             //
             if (!uniqueProductIds.has(cartProduct.productId)) {
               uniqueProductIds.add(cartProduct.productId); // Add the product ID to the set
               this.GetProductById(cartProduct.productId).subscribe(res => {
                  this.uniqueProducts.push(res);
               });
             }          
           };
        };
      }
    );
  }

  AddProductToCart(productId: any){
    this.AddCartRequest = {
      cartId: this.cartId,
      productId: productId
    }
    this.cartService.AddCartProduct(this.AddCartRequest).subscribe(
      (res)=> {
        if(res.isSuccess){
          this.toastr.success('Product Added to Cart Successfully!', 'Success!',{
            timeOut: 2000,
          });
          this.GetAllCartProductsCount();
          this.GetQuantity(productId);
        }
      }
    ); 
  }


  RemoveProductFromCart(productId: any){
    this.cartService.RemoveCartProduct(this.cartId, productId).subscribe(
      (res)=> {
        if(res.isSuccess){
          this.toastr.warning('Product removed from shopping Cart !', 'Warning!',{
            timeOut: 2000,
          });
          this.GetAllCartProductsCount();
          this.GetQuantity(productId);
        }
      }
    );
  }

  //To remove the product from the cart, whether it has single or multiple units
  DeleteCartProduct(productId: any){
    this.cartService.DeleteCartProduct(productId).subscribe(
      (res)=>{
        if(res.isSuccess){
          this.toastr.success('Product Deleted from shopping Cart !', 'Success!',{
            timeOut: 2000,
          });
        }else{
          this.toastr.info('Failed while deleting product from cart !', 'Info!',{
            timeOut: 2000,
          });
        }
      }
    );
    this.GetAllCartProductsCount();
  }

  //To Remove all the products from the cart at once
  EmptyShoppingCart(){
    let cartId = this.cartId;
    this.cartService.EmptyCart(cartId).subscribe(
      (res)=>{
        if(res.isSuccess){
          this.toastr.success('Your shopping cart is empty now !', 'Success!',{
            timeOut: 2000,
          });
        }else{
          this.toastr.info('Failed while emoving products from shopping cart !', 'Info!',{
            timeOut: 2000,
          });
        }
      }
    );
    this.GetAllCartProductsCount();
  }





}
