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

  submitAddForm() {
    debugger;
    console.log(this.addProductForm.value);
    this.isLoading = true;
    setTimeout(() => {
      this.addProductForm.markAllAsTouched();
    if (this.addProductForm.valid) {
      this.addProductRequest = this.addProductForm.value;
      this.productService.addProduct(this.addProductRequest).subscribe({
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
    }, 1500);
  }


  onFileSelected(files: FileList | null) {
    // if (files && files.length > 0) {
    //   this.imageFile = files.item(0);
    // }

    if (files && files.length > 0) {
      const file = files.item(0);
      this.addProductForm.patchValue({ ImageFile: file });
    }
    
  }

  get Name(): FormControl {
    return this.addProductForm.get("Name") as FormControl;
  }
  get Description(): FormControl {
    return this.addProductForm.get("Description") as FormControl;
  }

  get Price(): FormControl {
    return this.addProductForm.get("Price") as FormControl;
  }

  get ProductImage(): FormControl {
    return this.addProductForm.get("ProductImage") as FormControl;
  }

  get CategoryId(): FormControl {
    return this.addProductForm.get("CategoryId") as FormControl;
  }

  get ImageFile(): FormControl {
    return this.addProductForm.get("ImageFile") as FormControl;
  }


}
