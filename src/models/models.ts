export interface Product {
  id: number;
  name: string;
  sku: string;
  rate: number;
  price: string;
  isActive: boolean;
  desc: string;
  image: string;
  unitInStock: number;
  unitOnOrder: number;
  shopId: number;
  categoryId: number;
  attributeGroupId: number;
  createdAt: string;
  updatedAt: string;
  attributes: Array<Attribute>;
}

interface Attribute {
  id: number;
  value: string | number;
  productId: number;
  attributeId: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  backendType: string;
  frontendInput: string;
}
