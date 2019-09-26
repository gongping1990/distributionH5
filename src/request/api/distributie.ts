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
  createGroup(params: { courseId: any }) {
    return axios.get('/distributionOrder/createGroup', { params });
  },
  getGroupOrderDetails(params: { courseId: string; id: string }) {
    return axios.get('/distributionOrder/getGroupOrderDetails', { params });
  },
  getInviteCode() {
    return axios.get('/discenter/getInviteCode');
  },
  getWithdrawRecord(params: { current: number; size: number }) {
    return axios.get('/distributorAccount/getWithdrawRecord', { params });
  },
  pageBindingRelationship(params: {
    current: number;
    size: number;
    promoterId: string;
  }) {
    return axios.get('/distributie/pageBindingRelationship', { params });
  }
};

export default distributie;
