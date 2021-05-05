import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ActionTypes } from "../store";
import { store } from "../store/store";

const incrementNetworkReqCount = () => {
  store.dispatch({
    type: ActionTypes.SET_LOADING,
    payload: true,
  });

  let networkReqCount = store.getState().networkReqCount;
  networkReqCount = networkReqCount + 1;
  store.dispatch({
    type: ActionTypes.SET_NETWORK_REQ_COUNT,
    payload: networkReqCount,
  });
};

const decrementNetworkReqCount = () => {
  let networkReqCount = store.getState().networkReqCount;
  networkReqCount = networkReqCount - 1;
  store.dispatch({
    type: ActionTypes.SET_NETWORK_REQ_COUNT,
    payload: networkReqCount,
  });

  if (networkReqCount === 0) {
    store.dispatch({
      type: ActionTypes.SET_LOADING,
      payload: false,
    });
  }
};

axios.interceptors.request.use(
  function (config) {
    incrementNetworkReqCount();
    return config;
  },
  function (error) {
    decrementNetworkReqCount();
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    decrementNetworkReqCount();
    return response;
  },
  function (error) {
    decrementNetworkReqCount();
    return Promise.reject(error);
  }
);
export type Response<T> = Promise<AxiosResponse<T>>;

export interface AxiosApiProviderInterface {
  get(path: string, config: AxiosRequestConfig): Response<any>;
  post(path: string, data: any, config: AxiosRequestConfig): Response<any>;
}

export abstract class ApiProvider implements AxiosApiProviderInterface {
  static axiosInstance = axios;
  private _domain: string;
  constructor(customDomain: string = "") {
    if (customDomain === "") {
      this._domain = "https://api.github.com";
      return;
    }

    this._domain = customDomain;
  }

  public get(path: string, queryStringParameters: Object = {}): Response<any> {
    const response = axios.get(`${this._domain}${path}`, {
      params: queryStringParameters,
    });
    return response;
  }

  public post(path: string, data = null, config = {}): Response<any> {
    return axios.post(this._domain + path, data, config);
  }
}