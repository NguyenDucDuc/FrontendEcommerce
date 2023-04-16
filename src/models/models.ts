export interface Product {
  id?: number;
  name?: string;
  sku?: string;
  rate?: number;
  price?: number;
  isActive?: boolean;
  desc?: string;
  image?: string;
  unitInStock?: number;
  unitOnOrder?: number;
  shopId?: number;
  categoryId?: number;
  attributeGroupId?: number;
  createdAt?: string;
  updatedAt?: string;
  attributes?: Array<Attribute>;
}

export interface Attribute {
  id?: number;
  value: string | number;
  productId?: number;
  attributeId: number;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  backendType: string;
  frontendInput: string;
}

export interface AttributeGroup {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductDataResponse {
  listProduct?: Array<Product>;
  amountPage?: number;
  amountProduct: number;
}

export interface UserInfo {
  id?: number;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  isActive?: boolean;
}

export interface Order {
  id?: number
  userId?: number
  firstName?: string
  lastName?: string
  isActive?: boolean
  avatar?: string
  status?: string
  payment?: string
  shipAddress?: string
  updatedAt?: string
}


export interface DataTypeOrder {
  id: number;
  userId?: number;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  isActive?: boolean;
  shipAddress: string;
  status: string;
  payment: string;
  updatedAt: string;
}

export interface DataTypeOrderDetail {
  id: number;
  productName?: string;
  shopName?: string;
  quantity?: number;
  unitPrice?: number;
  discount?: number;
  productId?: number;
  orderId?: number;
  order?: DataTypeOrder;
}
