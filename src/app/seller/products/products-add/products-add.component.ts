import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddProduct, Category, Product } from '../../shared/models/Product-models';
import { ProductService } from '../../shared/services/product.service';
import { CategoryService } from '../../shared/services/category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css']
})
export class ProductsAddComponent implements OnInit{
  isLoading: boolean = false;
  addProductForm!: FormGroup;
  addProductRequest!: AddProduct;
  imageFile: File | null = null;
  categories: Category[] = [];
  Name!: string;
  Description!: string;
  Price!: number;
  CategoryId!: string;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe((res)=>{this.categories = res.response});

    this.addProductForm = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Description: new FormControl('', [Validators.required]),
      Price: new FormControl(0.0, [Validators.required]),
      ProductImage: new FormControl('product image'),
      CategoryId: new FormControl('', [Validators.required]),
      ImageFile: new FormControl(this.imageFile),
    })
  }

  onFileChanged(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      //this.labelImport.nativeElement.innerText = file.name;
      this.addProductForm.patchValue({
        ImageFile: file,
        
      });
      this.imageFile = file;
    }
  }

  convertFormDataToObject(formData: FormData): { [key: string]: any } {
    const object: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    return object;
  }

  submitAddForm() {
    debugger;
    if (this.imageFile) {
      const formData = new FormData();
      formData.append('Name', this.Name);
      formData.append('Description', this.Description);
      formData.append('Price', (this.Price).toString());
      formData.append('CategoryId', this.CategoryId);
      formData.append('ImageFile', this.imageFile);

      this.productService.addProduct(formData)
      .subscribe({
        next: (res)=>{
          if(res.isSuccess){
            
              this.toastr.success(res.message, 'Success!',{
                timeOut: 2000,
              });
              this.isLoading = false;
              this.router.navigate(['/shop-home']);
          
          } else if(!res.isSuccess){
            this.isLoading = false;
            this.toastr.error(res.message, 'Failure!',{
              timeOut: 2000,
            });
            
          }
        }
      })
    }
  }

  
}
