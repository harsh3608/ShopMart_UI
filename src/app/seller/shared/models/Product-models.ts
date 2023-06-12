export interface AddProduct{
    Name: string
    Description: string
    Price: number
    ProductImage: string
    CategoryId: string
    ImageFile: any
}

export interface AddProductresponse {
    statusCode: number
    isSuccess: boolean
    response: Response
    message: string
  }
  
  export interface Product {
    id: string
    name: string
    description: string
    price: number
    productImage: string
    categoryId: string
    imageFile: string
    category: Category
  }
  

  export interface Category{
    categoryId: string
    categoryName: string
  }

  export interface CategoryResponse {
    statusCode: number
    isSuccess: boolean
    response: Category[]
    message: string
  }