import axios from '../http';
import qs from 'querystring';

const wechat = {
  // 手机登录
  getAuthorizeUrl(params: any) {
    return axios.post('/wechat/oauth2/getAuthorizeUrl', qs.stringify(params));
  },
  share(params: any) {
    return axios.get('/wechat/oauth2/share', { params });
  }
};

export default wechat;
