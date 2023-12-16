import axios from "axios";
import router from "../router";
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  headers:{
    "Access-Control-Allow-Origin":"*"
  }
});
axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("TOKEN")}`;
  config.headers  = {...config.headers, "Access-Control-Allow-Origin": "*"};
  return config;
});
axiosClient.interceptors.response.use((response) => {
  return response;

  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      localStorage.removeItem("TOKEN");
      router.navigate("/login");
      window.location.reload();
    }
    throw error;
  }
);
export default axiosClient;
