import React, { Component } from 'react';
import styles from './index.module.scss';
import sucessIcon from '@/assets/images/discount/success-icon.png';
import errorIcon from '@/assets/images/discount/error-icon.png';

enum Status {
  SUCCESS,
  ERROR,
  WAIT
}

interface Props {
  onClick(): void;
  status: Status;
  price: string;
}

export default class DiscountResult extends Component<Props> {
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
    let { textStatus, imgStatus, tipStatus } = this.state;
    let { status, price, onClick } = this.props;
    return (
      <div className="container">
        <div className={styles['p-discountResult']}>
          <div className={styles['p-discountResult-content']}>
            {status === Status.WAIT ? (
              <i className={styles.loader}></i>
            ) : (
              <img className={styles.icon} src={imgStatus[status]} alt="" />
            )}

            <p className={styles.text}>{textStatus[status]}</p>
            <p className={styles.num}>¥{price}</p>
            <p className={styles.tip}>{tipStatus[status]}</p>
          </div>
        </div>
        {status !== Status.WAIT && (
          <div
            className={styles['p-discountResult-btn']}
            onClick={() => {
              onClick();
            }}
          >
            确定
          </div>
        )}
      </div>
    );
  }
}
