import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListView } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import Tab from '../component/tab';
import Item from '../component/item';
import { Item as ItemType } from '../component/tab/types';
import api from '@/request/api';
import styles from '../styles/index.module.scss';

interface State {
  itemList: ItemType[];
  tabActive: number;
  accountInfo: {
    allIncome: string;
    balance: string;
    blockingAmount: string;
  };
  page: {
    current: number;
    size: number;
    incomeStatus: number;
    total: number;
  };
  listData: any[];
  dataSource: any;
}

enum EStatus {
  /**
   * UNDEFINED(0,"未知")
   * BOLCKING(1,"冻结中")
   * REFUNED(5,"已退款")
   * FINISH(10,"已完成")
   */
  UNDEFINED,
  BOLCKING,
  REFUNED = 5,
  FINISH = 10
}

export default class ProfitDetail extends Component<{}, State> {
  rData = {};
  lv: any = {};
  state = {
    itemList: [
      { name: '全部的', id: 0 },
      { name: '已获得', id: 1 },
      { name: '冻结中', id: 2 },
      { name: '已退款', id: 3 }
    ],
    tabActive: 0,
    accountInfo: {
      allIncome: '0',
      balance: '0',
      blockingAmount: '0'
    },
    page: {
      current: 1,
      size: 10,
      incomeStatus: EStatus.UNDEFINED,
      total: 0
    },
    listData: [],
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1: any, row2: any) => row1 !== row2
    })
  };

  componentDidMount() {
    this.getDistributorAccountInfo();
    this.getDistributorAccountIncome();
  }

  clickTabItem = (index: number) => {
    let incomeStatus: EStatus = EStatus.UNDEFINED;
    switch (index) {
      case 1:
        incomeStatus = EStatus.FINISH;
        break;
      case 2:
        incomeStatus = EStatus.BOLCKING;
        break;
      case 3:
        incomeStatus = EStatus.REFUNED;
    }
    this.setState(
      {
        tabActive: index,
        listData: [],
        page: {
          ...this.state.page,
          current: 1,
          incomeStatus
        }
      },
      () => {
        this.getDistributorAccountIncome();
      }
    );
  };

  getDistributorAccountInfo() {
    api.distributie.getDistributorAccountInfo().then(({ data }) => {
      this.setState({
        accountInfo: data.resultData
      });
    });
  }

  getDistributorAccountIncome() {
    let { current, size, incomeStatus } = this.state.page;
    api.distributie
      .getDistributorAccountIncome({
        current,
        size,
        incomeStatus
      })
      .then(({ data }) => {
        let listData = [...this.state.listData, ...data.resultData.records];
        this.setState({
          listData,
          page: {
            ...this.state.page,
            current: current + 1,
            total: data.resultData
          },
          dataSource: this.state.dataSource.cloneWithRows(listData)
        });
      });
  }

  onEndReached = () => {
    this.getDistributorAccountIncome();
  };

  formatPrice(price: string) {
    return Number(price).toFixed(2);
  }

  render() {
    let { clickTabItem, formatPrice } = this;
    let { itemList, tabActive, accountInfo } = this.state;

    const row = (rowData: any, sectionID: any, rowID: any) => {
      return (
        <div className="hk-hairline--bottom">
          <Item title="完成新手任务" date="2019-08-28" price="+20.00元"></Item>
        </div>
      );
    };

    return (
      <div className="container">
        <div className={styles.header}>
          <Link className={styles.link} to="/discountRecord">
            提现记录
            <i></i>
          </Link>
          {/* 提现金额 */}
          <div className={styles.price}>
            <div className={styles['price-item']}>
              <p className={styles['price-title']}>
                {formatPrice(accountInfo.balance)}
              </p>
              <span className={styles['price-text']}>可提余额(元）</span>
            </div>
            <div className={styles['price-item']}>
              <p className={styles['price-title']}>
                {formatPrice(accountInfo.blockingAmount)}
                <i className={styles.icon}></i>
              </p>
              <span className={styles['price-text']}>冻结余额(元）</span>
            </div>
          </div>
          {/* 提现金额 end */}
          <div className={styles.cumulative}>
            <span>累计收益：{formatPrice(accountInfo.allIncome)}元</span>
            <Link className={styles['cumulative-btn']} to="/withdraw">
              提现
            </Link>
          </div>
        </div>
        <StickyContainer>
          <Sticky>
            {({ style }) => (
              <div
                className={styles.tabs}
                style={{
                  ...style,
                  zIndex: 100
                }}
              >
                <Tab
                  onClick={clickTabItem}
                  itemList={itemList}
                  active={tabActive}
                ></Tab>
              </div>
            )}
          </Sticky>
          <div className={styles.content}>
            {!this.state.listData.length && (
              <div className={styles.empty}>
                <i className={styles.emptyIcon}></i>
                <span>暂无数据</span>
              </div>
            )}
            <ListView
              ref={el => (this.lv = el)}
              dataSource={this.state.dataSource}
              renderRow={row}
              className="am-list"
              pageSize={4}
              useBodyScroll
              onScroll={() => {
                console.log('scroll');
              }}
              scrollRenderAheadDistance={500}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
            />
          </div>
        </StickyContainer>
      </div>
    );
  }
}
