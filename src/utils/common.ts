import { endpoint } from "../configs/Api";
import { ParamsOrderDetail } from "../constants/order";
import { authAxios } from "../lib/axios/axios.config";

export const flatten = (ob: any) => {
  let result: any = {};
  for (const i in ob) {
    if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
      const temp = flatten(ob[i]);
      for (const j in temp) {
        result[j] = temp[j];
      }
    } else {
      result[i] = ob[i];
    }
  }
  return result;
};

export const formatDateString = (date: string) => {
  return date.split("T")[0];
};

export const getOrderDetail = async (params: ParamsOrderDetail) => {
  try {
    const res = await authAxios().get(endpoint.order.getDetail, {
      params: params,
    });
    return res;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const formatCurrency = (currency: number) =>
  `${new Intl.NumberFormat().format(currency)} VNĐ`;

export const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
  
