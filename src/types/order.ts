export interface OrderItem {
  name: string
  quantity: number
  price: number
}

export interface CustomerInfo {
  name: string
  address: string
  phone: string
  idPhotoUrl: string
}

export interface OrderDetails {
  orderId: string
  customer: CustomerInfo
  items: OrderItem[]
  total: number
  deliveryFee: number
  deliveryInstructions?: string
  specialRequests?: string
  timestamp: string
}
