import axios from '../http';
import qs from 'querystring';

const user = {
  // 手机登录
  loginWithPhone(params: any) {
    return axios.post('/sch/user/loginWithPhone', qs.stringify(params));
  },
  wxUserLogin(params: any) {
    return axios.post('/sch/user/wxUserLogin', qs.stringify(params));
  },
  loginOut() {
    return axios.get('/sch/user/loginOut');
  }
};

export default user;
