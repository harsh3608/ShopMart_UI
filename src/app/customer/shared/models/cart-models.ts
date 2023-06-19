export interface CartProductRequest {
    cartId: string
    productId: string
}

export interface CartReturnResponse {
    statusCode: number
    isSuccess: boolean
    response: string
    message: string
}

export interface CartListResponse {
    statusCode: number
    isSuccess: boolean
    response: CartProduct[]
    message: string
}
  
export interface CartProduct {
    cartProductId: string
    cartId: string
    productId: string
}