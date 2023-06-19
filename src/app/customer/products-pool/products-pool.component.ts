import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/seller/shared/models/Product-models';
import { ProductService } from 'src/app/seller/shared/services/product.service';
import { FavouritesService } from '../shared/services/favourites.service';
import { AuthService } from 'src/app/user/shared/authorization/auth.service';
import { FavouriteProduct, FavouriteProductRequest } from '../shared/models/favourites-models';

@Component({
  selector: 'app-products-pool',
  templateUrl: './products-pool.component.html',
  styleUrls: ['./products-pool.component.css']
})
export class ProductsPoolComponent implements OnInit{
  products: Product[] = [];
  imageBaseLink: string = "https://localhost:7071/resources/";
  //isFavourite: boolean = false;
  favouriteId: any;
  favProducts: FavouriteProduct[] = [];
  AddFavRequest!: FavouriteProductRequest;

  constructor(
    private productsService: ProductService,
    private favouritesService: FavouritesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.favouriteId = this.authService.getFavouriteId();

    //get all products
    this.productsService.getAllProducts().subscribe(
      (res) => {
        if(res.isSuccess){
          this.products = res.response;
        };
      }
    );
    this.GetAllFavs();
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
          console.log(res.message);
          this.GetAllFavs();
        }
      }
    );
  }


  RemoveFromFavs(productId: any){
    this.favouritesService.RemoveFavProduct(this.favouriteId, productId).subscribe(
      (res)=>{
        if(res.isSuccess){
          console.log(res.message);
          this.GetAllFavs();
        }
      }
    )
  }


}
