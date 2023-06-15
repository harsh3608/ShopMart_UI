import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/seller/shared/models/Product-models';
import { ProductService } from 'src/app/seller/shared/services/product.service';

@Component({
  selector: 'app-products-pool',
  templateUrl: './products-pool.component.html',
  styleUrls: ['./products-pool.component.css']
})
export class ProductsPoolComponent implements OnInit{
  products: Product[] = [];
  imageBaseLink: string = "https://localhost:7071/resources/";
  isFavourite: boolean = false;

  constructor(
    private productsService: ProductService
  ) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(
      (res) => {
        if(res.isSuccess){
          this.products = res.response
        }
      }
    )
  }
}
