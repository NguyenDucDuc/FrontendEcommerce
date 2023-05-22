import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,

  // headers: {
  //   "content-type": "application/json",
  // },
});
axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  async (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (err) => {
    throw err;
  }
);

export const authAxios = () => {
  const newInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  newInstance.interceptors.request.use(
    async (config) => {
      if (localStorage.getItem("accessToken")) {
        config.headers["authorization"] = `Bearer ${localStorage.getItem(
          "accessToken"
        )}`;
      } else {
        console.log("Not find accessToken");
      }
      return config;
    },
    (err) => Promise.reject(err)
  );

  newInstance.interceptors.response.use(
    async (response) => {
      if (response && response.data) {
        return response.data;
      }
      return response;
    },
    (err) => {
      throw err;
    }
  );

  return newInstance;
};
