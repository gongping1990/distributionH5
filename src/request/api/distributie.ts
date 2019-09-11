import axios from '../http';
import qs from 'querystring';

interface IIncome {
  current: number;
  size: number;
  incomeStatus: number;
}

const distributie = {
  applyPromoter(params: any) {
    return axios.post('/distributie/applyPromoter', qs.stringify(params));
  },
  getDistributorAccountInfo() {
    return axios.get('/distributorAccount/getDistributorAccountInfo');
  },
  getDistributorAccountIncome(params: IIncome) {
    return axios.get('/distributorAccount/getDistributorAccountIncome', {
      params
    });
  }
};

export default distributie;
