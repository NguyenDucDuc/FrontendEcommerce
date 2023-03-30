export const generateOptions = (list: Array<any>) => {
  return list.map((item) => {
    return {
      value: item["id"],
      label: item["name"],
    };
  });
};




