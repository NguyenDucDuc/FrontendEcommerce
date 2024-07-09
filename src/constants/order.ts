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

export enum FEE_SHIP {
  NOI_THANH = 25000,
  NGOAI_THANH = 40000
}