import axios from '../http';
import qs from 'querystring';
import router from '../../router';

const user = {
  // 手机登录
  loginWithPhone(params) {
    return axios.post('/sch/user/loginWithPhone', qs.stringify(params));
  },
  // 密码登录
  loginWithPassword(data) {
    return axios.post('/sch/user/loginWithPassword', qs.stringify(data));
  },
  // 修改密码
  changePassword(params) {
    return axios.post('/sch/user/changePassword', qs.stringify(params));
  },
  wxUserLogin(params) {
    return axios.post('/sch/user/wxUserLogin', qs.stringify(params));
  },
  loginOut() {
    return axios.get('/sch/user/loginOut');
  },
  operate(params) {
    if (router.history.current.query.pageKey) {
      params.pageKey = router.history.current.query.pageKey;
    }

    return axios.post('/sch/wxSubscribeKfMsg/operate', qs.stringify(params));
  }
};

export default user;
