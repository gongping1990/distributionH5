import React, { Component } from 'react';
import Header from '../component/header';
import Content from '../component/content';
import styles from '../styles/index.module.scss';

interface State {}

export default class Group extends Component<{}, State> {
  state = {};

  render() {
    return (
      <div className="container">
        <Header></Header>
        <div className={styles.content}>
          <p className={styles.title}>开团邀请说明</p>
          <p className={styles.subtitle}>
            该功能是指，您可以通过开团的方式邀请用户购买课程，成
            团后可获得相应的收益，而不是购买此课程
          </p>
          <Content></Content>
          <p className={styles.title}>开团邀请流程</p>
          <div className={styles.step}>
            <div className={styles.item}>
              <p>
                <i>1</i>
                开团
              </p>
            </div>
            <div className={styles.item}>
              <p>
                <i>2</i>
                邀请好友
              </p>
            </div>
            <div className={styles.item}>
              <p>
                <i>3</i>
                满员拼团成功
              </p>
              <span>(不满自动退款)</span>
            </div>
            <div className={styles.item}>
              <p>
                <i>4</i>
                获得收益
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
