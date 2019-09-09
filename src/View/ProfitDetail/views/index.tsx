import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Tab from '../component/tab';
import { Item } from '../component/tab/types';
import styles from '../styles/index.module.scss';

interface State {
  itemList: Item[];
  tabActive: number;
}

export default class index extends Component<{}, State> {
  state = {
    itemList: [
      { name: '全部', id: 0 },
      { name: '已获得', id: 1 },
      { name: '冻结中', id: 2 },
      { name: '已退款', id: 3 }
    ],
    tabActive: 0
  };

  clickTabItem = (index: number) => {
    this.setState({
      tabActive: index
    });
  };

  render() {
    let { clickTabItem } = this;
    let { itemList, tabActive } = this.state;
    return (
      <div className="container">
        <div className={styles.header}>
          <Link className={styles.link} to="/">
            提现记录
          </Link>
          {/* 提现金额 */}
          <div className={styles.price}>
            <div className={styles['price-item']}>
              <p className={styles['price-title']}>58.00</p>
              <span className={styles['price-text']}>可提余额(元）</span>
            </div>
            <div className={styles['price-item']}>
              <p className={styles['price-title']}>40.00</p>
              <span className={styles['price-text']}>冻结余额(元）</span>
            </div>
          </div>
          {/* 提现金额 end */}
          <div className={styles.cumulative}>
            <span>累计收益：198.00元</span>
            <button className={styles['cumulative-btn']}>提现</button>
          </div>
          <div className={styles.tabs}>
            <Tab
              onClick={clickTabItem}
              itemList={itemList}
              active={tabActive}
            ></Tab>
          </div>
        </div>
      </div>
    );
  }
}
