import axios from '../http';

const customer = {
  getBaseConfig() {
    // 获取客服基础信息
    return axios.get('/customer/getBaseConfig');
  },
  getReviewResultById() {
    // 加盟商审核结果
    return axios.get('/customer/getReviewResultById');
  }
};

export default customer;
