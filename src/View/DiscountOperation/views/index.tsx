import React, { Component } from 'react';
import api from '@/request/api';
import { formatPrice } from '@/utils';
import styles from '../styles/index.module.scss';

interface IAccount {
  allIncome: number;
  balance: number;
  blockingAmount: number;
}
interface State {
  accountInfo: IAccount;
  price: string;
}

export default class DiscountOperation extends Component<{}, State> {
  state = {
    accountInfo: {
      allIncome: 0,
      balance: 0,
      blockingAmount: 0
    },
    price: '0'
  };

  componentWillMount() {
    this.getDistributorAccountInfo();
  }

  bindClickAll = () => {
    this.setState({
      price: formatPrice(this.state.accountInfo.balance)
    });
  };

  getDistributorAccountInfo() {
    api.distributie.getDistributorAccountInfo().then(({ data }) => {
      this.setState({
        accountInfo: data.resultData
      });
    });
  }

  postWithdraw = () => {
    api.distributie
      .withdraw({
        amount: Number(this.state.price) * 100
      })
      .then(() => {});
  };

  render() {
    let { price } = this.state;
    let { balance } = this.state.accountInfo;
    let priceformat: number = price ? Number(price) : 0;
    return (
      <div className="container">
        <div className={styles['p-discountOperation']}>
          <div className={styles['p-discountOperation-content']}>
            <p>请输入提现金额</p>
            <div className={styles.price}>
              <input
                type="tel"
                value={price}
                onChange={e =>
                  this.setState({
                    price: e.target.value
                  })
                }
              />
            </div>
            <div className={styles.down}>
              <p>可提余额：{formatPrice(balance)}</p>
              <p className={styles['down-left']} onClick={this.bindClickAll}>
                全部提现
              </p>
            </div>
          </div>
          <button
            className={`${styles['p-discountOperation-btn']} ${priceformat <=
              0 && styles.disabled}`}
            disabled={priceformat <= 0}
            onClick={this.postWithdraw}
          >
            提现
          </button>
          <div className={styles['p-discountOperation-tip']}>
            <p>仅支持提现至微信支付账号</p>
            <p>单日最大提现金额为5,000元人民币</p>
          </div>
        </div>
      </div>
    );
  }
}
