import { capitalizeText } from "./common";

export const generateOptions = (list: Array<any>) => {
  return list.map((item) => {
    return {
      value: item["id"],
      label: capitalizeText(item["name"]),
    };
  });
};

export const generateShopOptions = (list: Array<any>) => {
  return list.map((item) => {
    return {
      value: item["id"],
      label: capitalizeText(item["shopName"]),
    };
  });
};




