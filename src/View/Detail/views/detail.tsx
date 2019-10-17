import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import { Input } from '../component';
import { Toast } from 'antd-mobile';
import api from '@/request/api';
import { checkPhone, getQueryString } from '@/utils';
import styles from '../styles/index.module.scss';

interface Props {
  history: any;
}

export default class Introduce extends Component<Props> {
  state = {
    phone: '',
    code: '',
    downTime: 0
  };

  componentDidMount() {
    document.title = '推广人招募 ';
  }

  onInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    this.setState({
      [name]: event.target.value
    });
  };

  onClickClose = (name: string) => {
    this.setState({
      [name]: ''
    });
  };

  bindclickSendCode = () => {
    let { phone } = this.state;
    if (!checkPhone(phone)) {
      Toast.info('请填写正确的手机号！');
      return;
    }
    this.sendCode();
  };

  getapplyPromoter() {
    let { code, phone } = this.state;
    let franchiseeId = getQueryString('id');
    let params: any = {
      code,
      phone
    };
    if (!checkPhone(phone)) {
      Toast.info('请填写正确的手机号！');
      return;
    }
    if (!code) {
      Toast.info('请填写验证码！');
      return;
    }
    franchiseeId && (params.franchiseeId = franchiseeId);
    api.distributie.applyPromoter(params).then(() => {
      Toast.info('注册成功！');
      setTimeout(() => {
        this.props.history.push('/');
      }, 2000);
    });
  }

  startDownTime() {
    let { downTime } = this.state;
    if (downTime <= 1) {
      this.setState({
        downTime: 0
      });
    } else {
      setTimeout(() => {
        this.setState({
          downTime: this.state.downTime - 1
        });
        this.startDownTime();
      }, 1000);
    }
  }

  sendCode() {
    let { phone } = this.state;
    api.user
      .sendCode({
        phone
      })
      .then(() => {
        Toast.info('验证码发送成功！', 1);
        this.setState(
          {
            downTime: 60
          },
          () => {
            this.startDownTime();
          }
        );
      });
  }

  render() {
    let { downTime } = this.state;
    return (
      <div className={styles.introduce}>
        <div className={styles.popup}>
          <div className={`hk-hairline--bottom ${styles.input}`}>
            <i className={styles['icon-phone']}></i>
            <Input
              name="phone"
              type="phone"
              value={this.state.phone}
              placeholder="请输入手机号"
              onChange={this.onInputChange}
              onClose={this.onClickClose}
            ></Input>
          </div>
          <div className={`hk-hairline--bottom ${styles.input}`}>
            <i className={styles['icon-code']}></i>
            <Input
              name="code"
              type="text"
              value={this.state.code}
              placeholder="请输入验证码"
              onChange={this.onInputChange}
            ></Input>
            <button
              disabled={!!downTime}
              className={`${styles.codeBtn} ${downTime ? styles.disable : ''}`}
              onClick={this.bindclickSendCode}
            >
              {downTime ? `${downTime}s` : '获取验证码'}
            </button>
          </div>
          <div
            className={styles.btn}
            onClick={() => {
              this.getapplyPromoter();
            }}
          >
            成为推广人
          </div>
        </div>
      </div>
    );
  }
}
