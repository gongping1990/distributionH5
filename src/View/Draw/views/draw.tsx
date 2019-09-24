import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '@/request/api';
import styles from '../styles/index.module.scss';
import { components } from '../../Home';

const { Title } = components;

interface ICenter {
  allIncome: number;
  allInvite: number;
  allOrder: number;
  balance: number;
  blockingAmount: number;
  headimgurl: string;
  nickname: string;
  todayIncome: number;
  todayInvites: number;
  todayOrders: number;
}

interface State {
  centerData: ICenter;
}

export default class Home extends Component<{}, State> {
  state = {
    centerData: {
      allIncome: 0,
      allInvite: 0,
      allOrder: 0,
      balance: 0,
      blockingAmount: 0,
      headimgurl: '',
      nickname: '',
      todayIncome: 0,
      todayInvites: 0,
      todayOrders: 0
    }
  };

  componentWillMount() {
    this.getFranchiseeCenter();
  }

  getFranchiseeCenter() {
    api.distributie.getFranchiseeCenter().then(({ data }) => {
      this.setState({
        centerData: data.resultData
      });
    });
  }

  formtPrice(price: number): string {
    return (price / 100).toFixed(2);
  }

  render() {
    let { formtPrice } = this;
    let {
      headimgurl,
      nickname,
      balance,
      allIncome,
      allInvite,
      allOrder,
      todayIncome,
      todayInvites,
      todayOrders
    } = this.state.centerData;
    return (
      <div className="container">
        <div className={styles.header}>
          <div className={styles.user}>
            <div className={styles['user-content']}>
              <img className={styles.avatar} src={headimgurl} alt="" />
              <div>
                <p className={styles.name}>{nickname}</p>
                <span className={styles.userPrice}>
                  可提余额：{formtPrice(balance)}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.profit}>
            <div className={`${styles['profit-header']} hk-hairline--bottom`}>
              <div className={styles['profit-price']}>
                <i className={styles['profit-icon']}></i>
                <div>
                  <p className={styles['profit-text']}>累计收益</p>
                  <p className={styles['profit-title']}>
                    {formtPrice(allIncome)}
                    <i>元</i>
                  </p>
                </div>
              </div>
              <Link to="/profit" className={styles['profit-btn']}>
                查看明细
              </Link>
            </div>
            <div className={styles.static}>
              <div className={styles['static-item']}>
                <p className={styles['static-num']}>{allInvite}</p>
                <p className={styles['static-text']}>累计邀请</p>
              </div>
              <div className={styles['static-item']}>
                <p className={styles['static-num']}>{allOrder}</p>
                <p className={styles['static-text']}>累计订单</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <Title type={1}>今日统计</Title>
        </div>
        <div className={styles.statistics}>
          <div className={styles['statistics-item']}>
            <p>{todayIncome}</p>
            <span>今日收益</span>
          </div>
          <div className={styles['statistics-item']}>
            <p>{todayInvites}</p>
            <span>今日订单</span>
          </div>
          <div className={styles['statistics-item']}>
            <p>{todayOrders}</p>
            <span>今日邀请</span>
          </div>
        </div>
        <div className={styles.btn}>邀请好友成为推广人</div>
      </div>
    );
  }
}
