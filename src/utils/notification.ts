import { endpoint } from "../configs/Api";
import { authAxios } from "../lib/axios/axios.config";

export const getNotification = async () =>
  await authAxios().get(`${endpoint.notification.base}`);

export const createNotification = async (data: any) =>
  authAxios().post(`${endpoint.notification.base}`, data);


