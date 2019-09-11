import axios from '../http';
import qs from 'querystring';

interface ISendCode {
  phone: string;
}

const user = {
  // 手机登录
  loginWithPhone(params: any) {
    return axios.post('/user/loginWithPhone', qs.stringify(params));
  },
  wxUserLogin(params: any) {
    return axios.post('/user/wxUserLogin', qs.stringify(params));
  },
  loginOut() {
    return axios.get('/user/loginOut');
  },
  sendCode(params: ISendCode) {
    return axios.get('/common/sendCode', { params });
  }
};

export default user;
