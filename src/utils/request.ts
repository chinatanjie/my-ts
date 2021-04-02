import axios, {AxiosResponse} from "axios";
import {message} from "antd";

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};


const axInstance = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 3000
});

axInstance.interceptors.request.use(config => {
  return config;
}, err => {
  message.error({message: '请求超时!'}).then(r => {
  });
  return Promise.reject(err);
});

axInstance.interceptors.response.use(function (response: AxiosResponse<Restful<any>>) {
  // // 对响应数据做点什么
  // if (response?.status != 200) {
  //   message.error({message: response.data.msg}).then(r => {
  //   });
  //   response.data.success = false;
  // }
  return response;
}, function (error: { response: AxiosResponse<Restful<any>> }) {
  // 对响应错误做点什么
  const {response} = error;
  message.error({message: response.headers + response.status + response.status.toString() + ':' + response.data.msg}).then(r => {
  })
  return Promise.reject(error);
})

export interface Restful<T> {
  success: boolean;
  msg: string;
  resultBody: T;
}

export interface GenericResult<T> {
  page: number;
  pageSize: number;
  totalRows: number;
  totalPages: number;
  data: T;
}

export default axInstance