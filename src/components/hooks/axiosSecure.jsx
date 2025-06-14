import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

// creating axios secure instance
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/",
});

// access token
let accessToken = null;

// get access token
export let setAccessToken = (token) => {
  accessToken = token;
//   console.log(accessToken)
};

// implementing axios interceptor
axiosSecure.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default axiosSecure;
