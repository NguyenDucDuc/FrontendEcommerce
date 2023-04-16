export enum STATUS_ACTION {
  DONE = "DONE",
  CANCEL = "CANCEL",
}

export interface ParamsOrderDetail {
  shopId?: string;
  orderId: number;
  customerId?: number;
}
