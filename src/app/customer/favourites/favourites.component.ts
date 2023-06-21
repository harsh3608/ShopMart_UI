import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/seller/shared/services/category.service';
import { AuthService } from 'src/app/user/shared/authorization/auth.service';
import { FavouritesService } from '../shared/services/favourites.service';
import { FavouriteProduct, FavouriteProductRequest } from '../shared/models/favourites-models';
import { ProductService } from 'src/app/seller/shared/services/product.service';
import { Category, Product } from 'src/app/seller/shared/models/Product-models';
import { Observable, map } from 'rxjs';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit{
  favCount:number = 0;
  cartCount:number = 0;
  favouriteProducts: FavouriteProduct[]=[];
  imageBaseLink: string = "https://localhost:7071/resources/";
  favouriteId: any;
  AddFavRequest!: FavouriteProductRequest;
  categories: Category[]=[];
  products: Product[]=[];
  cartId:any;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private favouritesService: FavouritesService,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartId = this.authService.getCartId();
    this.favouriteId = this.authService.getFavouriteId();

    this.cartService.GetAllCartProducts(this.cartId).subscribe((res)=> {this.cartCount = res.response.length})

    this.categoryService.getCategories().subscribe(
      (res) => {
        if(res.isSuccess){
          this.categories = res.response;
        };
      }
    );
    this.GetAllFavs();
    
  }



  


  RemoveFromFavs(productId: any){
    this.products.length = 0;
    this.favCount = 0;
    this.favouritesService.RemoveFavProduct(this.favouriteId, productId).subscribe(
      (res)=>{
        if(res.isSuccess){
          // let elementToFind = 
          // this.favouriteProducts.splice(this.favouriteProducts.indexOf(elementToFind), 1);
          
          this.GetAllFavs();
        }
      }
    );
    
  }

  GetAllFavs() {
    //get all favs
    this.favouritesService.GetAllFavourites(this.favouriteId).subscribe(
      (res) => {
        if(res.isSuccess){
          this.favouriteProducts = res.response;
          this.favCount = res.response.length;

          for (const favProduct of this.favouriteProducts) {
            this.GetProductById(favProduct.productId).subscribe(res=>{
              this.products.push(res);            
            });  
         
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

}
