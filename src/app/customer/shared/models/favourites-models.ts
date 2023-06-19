export interface FavouriteProductRequest {
  favouriteId: string
  productId: string
}


export interface FavouriteReturnResponse {
    statusCode: number
    isSuccess: boolean
    response: string
    message: string
}

export interface FavsListResponse {
    statusCode: number
    isSuccess: boolean
    response: FavouriteProduct[]
    message: string
}
  
export interface FavouriteProduct {
    favouriteProductId: string
    favouriteId: string
    productId: string
}