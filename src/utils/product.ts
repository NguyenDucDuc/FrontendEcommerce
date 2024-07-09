import { message } from "antd";
import { endpoint } from "../configs/Api";
import { axiosClient } from "../lib/axios/axios.config";
import { Params, Response } from "../models/http";
import { flatten } from "./common";

export const getAllProduct = async (params: Params) => {
  try {
    const res: Response = await axiosClient.get(endpoint.product.search, {
      params: params,
    });
    return res;
  } catch (error) {
    console.log(error);
    message.error("Đã có lỗi xảy ra !!");
  }
};

export const extractData = (
  listObj: Array<any> = [],
  fieldsName: Array<string>
) => {
  return listObj.reduce((list, obj) => {
    obj = flatten(obj);
    const newObj = fieldsName.reduce((objTemp: any, item) => {
      objTemp[item] = obj[item];
      return objTemp;
    }, {});
    list.push(newObj);
    return list;
  }, []);
};

export const extractData2 = (
  listObj: Array<any> = [],
  fieldsName: Array<string>
) => {
  return listObj.reduce((list, obj) => {
    const newObj = fieldsName.reduce((objTemp: any, item) => {
      objTemp[item] = obj[item];
      return objTemp;
    }, {});
    console.log({newObj});
    
    list.push(newObj);
    return list;
  }, []);
};
