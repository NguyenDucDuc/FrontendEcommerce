export interface Response {
  data?: any;
  message?: string;
  status?: number;
}

export interface Params {
  page?: number;
  name?: string;
  fP?: string;
  tP?: string;
  sortBy?: string;
  order?: string;
  cateId?: number;
  shopId?: string;
  pageSize?: number;
}
