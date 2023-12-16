import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
let Token = AsyncStorage.getItem("USER_TOKEN");
const setToken = () => {
  AsyncStorage.getItem("USER_TOKEN").then((value) => {
    Token = value;
  });
};
AsyncStorage.getItem("USER_TOKEN")
  .then((value) => {
    Token = value;
  })
  .catch((error) => {});
const axiosClient = axios.create({
  baseURL: ` http://192.168.43.47:8000/api`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Token}`;
  config.headers = { ...config.headers, "Access-Control-Allow-Origin": "*" };
  return config;
});
export default axiosClient;
export { setToken };
