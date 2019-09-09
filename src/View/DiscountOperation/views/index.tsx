import React, { Component } from 'react';
import styles from '../styles/index.module.scss';

export default class DiscountOperation extends Component<{}> {
  state = {
    dataInfo: ''
  };

  submitDiscount() {
    // this.props.history.push("/discountResult", {
    //   type: 1
    // });
  }

  render() {
    return (
      <div className="container">
        <div className={styles['p-discountOperation']}>
          <div className={styles['p-discountOperation-content']}>
            <p>请输入提现金额</p>
            <p className={styles.price}>20</p>
            <div className={styles.down}>
              <p>可提余额：58.00</p>
              <p className={styles['down-left']}>全部提现</p>
            </div>
          </div>
          <div
            className={styles['p-discountOperation-btn']}
            onClick={this.submitDiscount}
          >
            提现
          </div>
          <div className={styles['p-discountOperation-tip']}>
            <p>仅支持提现至微信支付账号</p>
            <p>单日最大提现金额为5,000元人民币</p>
          </div>
        </div>
      </div>
    );
  }
}
