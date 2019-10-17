import React, { Component } from 'react';
import api from '@/request/api';
import { Result } from '../component';
import { formatPrice } from '@/utils';
import styles from '../styles/index.module.scss';

enum Status {
  SUCCESS,
  ERROR,
  WAIT
}
interface IAccount {
  allIncome: number;
  balance: number;
  blockingAmount: number;
}
interface State {
  accountInfo: IAccount;
  price: string;
  status: Status;
  showResult: boolean;
}

export default class DiscountOperation extends Component<{}, State> {
  state = {
    accountInfo: {
      allIncome: 0,
      balance: 0,
      blockingAmount: 0
    },
    price: '',
    status: 0,
    showResult: false
  };

  componentWillMount() {
    document.title = '提现';
    this.getDistributorAccountInfo();
  }

  bindClickAll = () => {
    this.setState({
      price: formatPrice(this.state.accountInfo.balance)
    });
  };

  bindClickBtn = () => {
    this.setState({
      showResult: false
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
    this.setState({
      showResult: true
    });
    api.distributie
      .withdraw({
        amount: Number(this.state.price) * 100
      })
      .then(() => {
        this.setState({
          status: Status.SUCCESS
        });
      })
      .catch(() => {
        this.setState({
          status: Status.ERROR
        });
      });
  };

  render() {
    let { price, status, showResult } = this.state;
    let { balance } = this.state.accountInfo;
    let priceformat: number = price ? Number(price) : 0;
    let actualPrice = Number(price) * 100;
    return (
      <div className="container">
        {showResult && (
          <div className={styles.result}>
            <Result
              price={price}
              status={status}
              onClick={this.bindClickBtn}
            ></Result>
          </div>
        )}
        <div className={styles['p-discountOperation']}>
          <div className={styles['p-discountOperation-content']}>
            <p>请输入提现金额</p>
            <div className={styles.price}>
              <input
                type="number"
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
            className={`${styles['p-discountOperation-btn']} ${(priceformat <=
              10 ||
              actualPrice > Number(balance) ||
              priceformat > 1000) &&
              styles.disabled}`}
            disabled={
              priceformat <= 10 ||
              actualPrice > Number(balance) ||
              priceformat > 1000
            }
            onClick={this.postWithdraw}
          >
            提现
          </button>
          <div className={styles['p-discountOperation-tip']}>
            <p>
              仅支持提现至微信支付账号 <br />
              1.每天只能提现1次 <br />
              2.单日最小提现金额为10元 <br /> 3.最大单日提现金额为1,000元
            </p>
          </div>
        </div>
      </div>
    );
  }
}
