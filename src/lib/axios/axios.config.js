import axios from "axios";
import queryString from "query-string";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,

  // headers: {
  //   "content-type": "application/json",
  // },

  // paramsSerializer: (params) => queryString.stringify(params),
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

export const authAxios = (currentUser) => {
  const newInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    paramsSerializer: (params) => queryString.stringify(params),
  });

  newInstance.interceptors.request.use(
    async (config) => {
      if (currentUser?.accessToken) {
        config.headers["authentication"] = `Bearer ${currentUser.accessToken}`;
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
