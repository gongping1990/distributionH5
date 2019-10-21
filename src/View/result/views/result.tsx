import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '@/request/api';
import styles from '../styles/index.module.scss';

import successIcon from '@/assets/images/result/success.png';
import errorIcon from '@/assets/images/result/error.png';

enum EStatus {
  WAIT,
  SUCCESS,
  ERROR
}

interface State {
  resultData: {
    status: EStatus;
    reviewQrcode: string;
    subQrcode: string;
  };
}

class Join extends Component<{}, State> {
  state = {
    resultData: {
      reviewQrcode: '',
      subQrcode: '',
      status: EStatus.WAIT
    }
  };

  componentWillMount() {
    document.title = '加盟审核';
    this.getReviewResultById();
  }

  getReviewResultById() {
    api.customer.getReviewResultById().then(({ data }) => {
      this.setState({
        resultData: data.resultData
      });
    });
  }

  render() {
    let { resultData } = this.state;
    return (
      <div className={styles.container}>
        {resultData.status === EStatus.WAIT ? (
          <i className={styles.loader}></i>
        ) : (
          <img
            className={styles.icon}
            src={
              resultData.status === EStatus.SUCCESS ? successIcon : errorIcon
            }
            alt=""
          />
        )}

        <p className={styles.title}>
          {resultData.status === EStatus.SUCCESS
            ? '恭喜你成为【乐小狮福利社】加盟商'
            : resultData.status === EStatus.WAIT
            ? '申请提交成功请耐心等待管理员审核！'
            : '很遗憾，审核未通过'}
        </p>
        <div className={styles.text}>
          <span>
            {resultData.status === EStatus.SUCCESS
              ? '赶快去邀请好友赚现金吧~'
              : resultData.status === EStatus.WAIT
              ? '请关扫码注下方公众号'
              : '如有疑问，请联系下方客服微信'}
          </span>
          {resultData.status === EStatus.WAIT ? (
            <span>审核结果会在第一时间推送通知您</span>
          ) : null}
        </div>
        {resultData.status === EStatus.SUCCESS ? (
          <Link className={styles.btn} to="/">
            进入加盟商中心
          </Link>
        ) : (
          <div className={styles.qrcode}>
            <img src={resultData.reviewQrcode} alt="" />
          </div>
        )}
      </div>
    );
  }
}

export default Join;
