export enum STATUS_ACTION {
  DONE = "DONE",
  CANCEL = "CANCEL",
}

export interface ParamsOrderDetail {
  shopId?: string;
  orderId: number;
  customerId?: number;
  userId?: number;
}

export enum PAYMENT {
  OFFLINE = "Thanh toán khi nhận hàng",
  ONLINE = "Thanh toán online",
}
