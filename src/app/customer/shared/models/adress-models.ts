export interface AddressAddRequest {
    userId: string
    title: string
    address: string
}

export interface AddressReturnResponse {
    statusCode: number
    isSuccess: boolean
    response: Response
    message: string
}
  
export interface Address {
    addressId: string
    userId: string
    title: string
    address: string
}

export interface AddressListReturnResponse {
    statusCode: number
    isSuccess: boolean
    response: Response[]
    message: string
}

export interface DeleteAddressReturnResponse {
    statusCode: number
    isSuccess: boolean
    response: boolean
    message: string
}
