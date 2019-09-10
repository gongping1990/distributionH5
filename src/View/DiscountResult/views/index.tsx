import React, { Component } from 'react';
import styles from '../styles/index.module.scss';
import sucessIcon from '../../../assets/images/discount/success-icon.png';
import errorIcon from '../../../assets/images/discount/error-icon.png';

export default class DiscountResult extends Component<{}> {
  state = {
    dataInfo: '',
    type: 2,
    textStatus: {
      '0': '提现成功',
      '1': '提现失败',
      '2': '处理中'
    },
    imgStatus: {
      '0': sucessIcon,
      '1': errorIcon,
      '2': errorIcon
    },
    tipStatus: {
      '0': '提现将在30分钟内到账，请至微信支付查看',
      '1': '提现失败原因：由第三方平台返回',
      '2': '提现申请正在处理中，请稍后'
    }
  };

  render() {
    let { textStatus, type, imgStatus, tipStatus } = this.state;

    return (
      <div className="container">
        <div className={styles['p-discountResult']}>
          <div className={styles['p-discountResult-content']}>
            <img className={styles.icon} src={imgStatus[type]} />
            <p className={styles.text}>{textStatus[type]}</p>
            <p className={styles.num}>¥20</p>
            <p className={styles.tip}>{tipStatus[type]}</p>
          </div>
        </div>
        <div className={styles['p-discountResult-btn']}>确定</div>
      </div>
    );
  }
}
