import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/seller/shared/models/Product-models';
import { ProductService } from 'src/app/seller/shared/services/product.service';
import { FavouritesService } from '../shared/services/favourites.service';
import { AuthService } from 'src/app/user/shared/authorization/auth.service';
import { FavouriteProduct, FavouriteProductRequest } from '../shared/models/favourites-models';
import { CartProductRequest } from '../shared/models/cart-models';
import { CartService } from '../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-pool',
  templateUrl: './products-pool.component.html',
  styleUrls: ['./products-pool.component.css']
})
export class ProductsPoolComponent implements OnInit{
  products: Product[] = [];
  imageBaseLink: string = "https://localhost:7071/resources/";
  favouriteId: any;
  favProducts: FavouriteProduct[] = [];
  AddFavRequest!: FavouriteProductRequest;
  CartId: any;
  AddCartRequest!: CartProductRequest;
  cartCount: number = 0;
  @Output() cartCountChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private productsService: ProductService,
    private favouritesService: FavouritesService,
    private authService: AuthService,
    private cartService: CartService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.favouriteId = this.authService.getFavouriteId();
    this.CartId = this.authService.getCartId();

    //get all products
    this.productsService.getAllProducts().subscribe(
      (res) => {
        if(res.isSuccess){
          this.products = res.response;
        };
      }
    );
    this.GetAllFavs();
    this.GetAllCartProductsCount();
  }

  GetAllFavs() {
    //get all favs
    this.favouritesService.GetAllFavourites(this.favouriteId).subscribe(
      (res) => {
        if(res.isSuccess){
          this.favProducts = res.response;
        };
      }
    );
  }

  GetAllCartProductsCount() {
    this.cartService.GetAllCartProducts(this.CartId).subscribe(
      (res) => {
        if(res.isSuccess){
          this.cartCount = res.response.length;
          this.cartCountChange.emit(this.cartCount);
          console.log(this.cartCount);
        }
      }
    )
  }

  isFavourite(id: any): boolean {
    return this.favProducts.some((item) => item.productId === id);
  }


  AddToFavs(productId: any){
    this.AddFavRequest = {
      favouriteId : this.favouriteId,
      productId: productId
    }; 
    this.favouritesService.AddFavProduct(this.AddFavRequest).subscribe(
      (res)=> {
        if(res.isSuccess){
          this.GetAllFavs();
        }
      }
    );
  }


  RemoveFromFavs(productId: any){
    this.favouritesService.RemoveFavProduct(this.favouriteId, productId).subscribe(
      (res)=>{
        if(res.isSuccess){
          this.GetAllFavs();
        }
      }
    )
  }

  AddProductToCart(productId: any){
    this.AddCartRequest = {
      cartId: this.CartId,
      productId: productId
    }
    this.cartService.AddCartProduct(this.AddCartRequest).subscribe(
      (res)=> {
        if(res.isSuccess){
          this.toastr.success('Product Added to Cart Successfully!', 'Success!',{
            timeOut: 2000,
          });
        }
      }
    );
    this.GetAllCartProductsCount();
  }


}
