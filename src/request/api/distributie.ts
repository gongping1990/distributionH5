import axios from '../http';
import qs from 'querystring';
import { IIncome, IApplyFranchisee } from './distributie.type';

const distributie = {
  applyPromoter(params: any) {
    // 加盟商申请
    return axios.post('/distributie/applyPromoter', qs.stringify(params));
  },
  applyFranchisee(params: IApplyFranchisee) {
    return axios.post(
      '/distributie/applyFranchisee',
      qs.stringify(params as any)
    );
  },
  getDistributorAccountInfo() {
    return axios.get('/distributorAccount/getDistributorAccountInfo');
  },
  getDistributorAccountIncome(params: IIncome) {
    return axios.get('/distributorAccount/getDistributorAccountIncome', {
      params
    });
  },
  getPromoterCenter() {
    return axios.get('/discenter/getPromoterCenter');
  },
  getFranchiseeCenter() {
    return axios.get('/discenter/getFranchiseeCenter');
  },
  withdraw(params: { amount: number }) {
    return axios.post('/distributorAccount/withdraw', qs.stringify(params));
  },
  createGroup(params: { courseId: number }) {
    return axios.get('/distributionOrder/createGroup', { params });
  },
  getWithdrawRecord(params: { current: number; size: number }) {
    return axios.get('/distributorAccount/getWithdrawRecord', { params });
  }
};

export default distributie;
