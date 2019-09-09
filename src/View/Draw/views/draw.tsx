import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/index.module.scss';
import { components } from '../../Home';

const { Title } = components;

interface State {}

export default class Home extends Component<{}, State> {
  state = {};

  render() {
    return (
      <div className="container">
        <div className={styles.header}>
          <div className={styles.user}>
            <div className={styles['user-content']}>
              <img className={styles.avatar} src="" alt="" />
              <div>
                <p className={styles.name}>桔小狮</p>
                <span className={styles.userPrice}>可提余额：20.00</span>
              </div>
            </div>
            <p className={styles.strategy}>
              推广攻略 <i></i>
            </p>
          </div>
          <div className={styles.profit}>
            <div className={`${styles['profit-header']} hk-hairline--bottom`}>
              <div className={styles['profit-price']}>
                <i className={styles['profit-icon']}></i>
                <div>
                  <p className={styles['profit-text']}>累计收益</p>
                  <p className={styles['profit-title']}>
                    198.00<i>元</i>
                  </p>
                </div>
              </div>
              <Link to="/profit" className={styles['profit-btn']}>
                查看明细
              </Link>
            </div>
            <div className={styles.static}>
              <div className={styles['static-item']}>
                <p className={styles['static-num']}>56</p>
                <p className={styles['static-text']}>累计邀请</p>
              </div>
              <div className={styles['static-item']}>
                <p className={styles['static-num']}>18</p>
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
            <p>56</p>
            <span>今日收益</span>
          </div>
          <div className={styles['statistics-item']}>
            <p>56</p>
            <span>今日收益</span>
          </div>
          <div className={styles['statistics-item']}>
            <p>56</p>
            <span>今日收益</span>
          </div>
        </div>
        <div className={styles.btn}>邀请好友成为推广人</div>
      </div>
    );
  }
}
