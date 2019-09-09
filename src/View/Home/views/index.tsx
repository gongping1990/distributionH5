import React, { Component } from 'react';
import styles from '../styles/index.module.scss';
import { Title, TestItem, CourseItem } from '../component';
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
              <button className={styles['profit-btn']}>查看明细</button>
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
          <Title>新手任务</Title>
          <div className={styles.test}>
            <TestItem></TestItem>
            <TestItem></TestItem>
          </div>
          <Title>推广课程</Title>
          <div>
            <CourseItem></CourseItem>
            <CourseItem></CourseItem>
          </div>
          <img className={styles.banner} src="" alt="" />
        </div>
      </div>
    );
  }
}
