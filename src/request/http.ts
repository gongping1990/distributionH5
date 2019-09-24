import { Toast } from 'antd-mobile';
import axios from 'axios';
import { baseUrl } from './base';
import { isWeiXin, delUrlQuery } from '@/utils';
import api from './api';

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = (msg: string | object) => {
  Toast.info(msg);
};

/**
 * 显示登录页
 * 清楚用户本地缓存信息，并显示登录弹框
 */
const toLogin = () => {
  console.log(111);
  if (isWeiXin()) {
    api.wechat
      .getAuthorizeUrl({
        redirectURI: delUrlQuery('code')
      })
      .then(({ data }) => {
        window.location = data.resultData;
      })
      .catch(err => {
        console.log(err);
      });
  }
};

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status: number, err: object) => {
  // 状态码判断
  switch (status) {
    case 200:
      break;
    // 401: 未登录状态，跳转登录页
    case 401:
    case 402:
      toLogin();
      break;
    // 404请求不存在
    case 404:
      tip('请求的资源不存在');
      break;
    case 500:
      tip('网络连接异常');
      break;
    default:
      tip(err);
    // console.log(other);
  }
};

// 创建axios实例
var instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  timeout: 10000
});

// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */

instance.interceptors.request.use(config => {
  return config;
});

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    // 服务器请求成功，自定义code异常处理
    errorHandle(res.data.code, res.data.msg);
    return res.data.code === 200
      ? Promise.resolve(res)
      : Promise.reject(res.data.msg);
  },
  // 请求失败
  error => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    }
  }
);

export default instance;
