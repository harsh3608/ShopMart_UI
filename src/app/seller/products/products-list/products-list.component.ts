import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Table } from 'primeng/table';
import { ProductService } from '../../shared/services/product.service';
import { Category, Product } from '../../shared/models/Product-models';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit{
  products: Product[] = [];
  imageBaseLink: string = "https://localhost:7071/resources/";
  isLoading: boolean = true;
  loading: boolean = false;
  categories: Category[]=[];

  constructor(
    private title: Title,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Manage Questions');
    this.GetProducts();

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    this.categoryService.getCategories().subscribe(
      (res) => {
        if(res.isSuccess){
          this.categories = res.response;
        };
      }
    );
  }

  GetProducts() {
    this.productService.getAllProducts().subscribe( (res) => {
        if(res.isSuccess){
          this.products = res.response;
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

  clear(table: Table) {
    table.clear();
    const inputElement = document.getElementById('search') as HTMLInputElement;
    inputElement.value = '';
  }

  
}
