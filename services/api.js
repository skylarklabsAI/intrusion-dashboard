import axios from "axios";
import TokenService from "./tokenService";

const baseURL = "http://3.111.32.94:8002";
const loginEndpoint = "/auth/accounts/login/";
const refreshEndpoint = "/auth/token/refresh/";
const registerEndpoint = "/auth/accounts/register/";
const loginPagePath = "/login";

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    console.log(originalConfig.url);
    if (
      originalConfig.url !== loginEndpoint &&
      originalConfig.url !== registerEndpoint &&
      err.response
    ) {
      // Access Token was expired
      if (
        err.response.status === 401 &&
        originalConfig.url === refreshEndpoint
      ) {
        return Promise.reject(err);
      }
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          console.log("refreshing tokens");
          const rs = await instance.post(refreshEndpoint, {
            refresh: TokenService.getLocalRefreshToken(),
          });
          const { access } = rs.data;
          console.log(access);
          TokenService.updateLocalAccessToken(access);
          console.log(originalConfig);
          return instance(originalConfig);
        } catch (_error) {
          console.log("error block");
          // TokenService.removeUser();
          // window.location.pathname = loginPagePath;
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;
