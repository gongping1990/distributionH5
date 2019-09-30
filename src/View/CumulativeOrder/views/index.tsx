import React, { Component } from 'react';
import styles from '../styles/index.module.scss';
import Tab from '../../ProfitDetail/component/tab';
import api from '@/request/api';
import { ListView } from 'antd-mobile';
import dayjs from 'dayjs';

interface IList {
  distributionAmount: number;
  id: number;
  incomeStatus: number;
  gmtCreate: string;
  courseName: string;
  thirdHeadimgurl: string;
  thirdNickname: string;
}

interface State {
  itemList: IList[];
  tabActive: number;
  total: number;
  dataSource: any;
  isLoading: boolean;
  page: {
    current: number;
    size: number;
    incomeStatus: number;
  };
}

export default class CumulativeOrder extends Component<{}, State> {
  lv: any = {};
  state = {
    page: {
      current: 1,
      size: 10,
      incomeStatus: 0
    },
    total: 1,
    tabActive: 0,
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1: any, row2: any) => row1 !== row2
    }),
    isLoading: false,
    tabList: [
      { name: '全部的', id: 0 },
      { name: '已获得', id: 10 },
      { name: '冻结中', id: 1 },
      { name: '已退款', id: 5 }
    ],
    itemList: [],
    typeList: {
      '1': '冻结中',
      '10': '已获得',
      '5': '已退款'
    },
    typeColor: {
      '1': styles['tips-one'],
      '10': styles['tips-two'],
      '5': styles['tips-three']
    }
  };

  clickTabItem = (index: number) => {
    console.log(index);
    let incomeStatus = index;
    this.setState(
      {
        tabActive: index,
        itemList: [],
        total: 1,
        page: {
          ...this.state.page,
          current: 1,
          incomeStatus
        }
      },
      () => {
        this.getOrder();
      }
    );
  };

  componentDidMount() {
    document.title = '累计订单';
    this.getOrder();
  }

  getOrder() {
    let { current, size, incomeStatus } = this.state.page;
    if (this.state.itemList.length >= this.state.total) {
      return;
    }

    this.setState({
      isLoading: true
    });
    api.distributie
      .getOrder({
        current,
        size,
        incomeStatus
      })
      .then(({ data }) => {
        let listData = [...this.state.itemList, ...data.resultData.records];
        this.setState({
          itemList: listData,
          isLoading: false,
          page: {
            ...this.state.page,
            current: current + 1
          },
          total: data.resultData.total,
          dataSource: this.state.dataSource.cloneWithRows(listData)
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false
        });
      });
  }

  onEndReached = () => {
    if (this.state.isLoading) {
      return;
    }
    this.getOrder();
  };

  formatPrice(price: number): string {
    return Number(+price / 100).toFixed(2);
  }

  formatTime(price: string): string {
    return dayjs(+price).format('YYYY-MM-DD HH:mm');
  }
  render() {
    let {
      itemList,
      typeList,
      typeColor,
      tabActive,
      tabList,
      isLoading,
      dataSource
    } = this.state;

    const row = (item: any, sectionID: any, rowID: any) => {
      return (
        <div className={styles['p-cumulativeOrder-item']} key={item.id}>
          <div className={styles['left-wrap']}>
            <div className={styles['left-wrap-time']}>
              {this.formatTime(item.gmtCreate)}
            </div>
            <div className={styles['left-wrap-user']}>
              <img
                className={styles['left-wrap-img']}
                src={item.thirdHeadimgurl}
                alt=""
              />
              <div>{item.thirdNickname}</div>
            </div>
            <div className={styles['left-wrap-text']}>{item.courseName}</div>
          </div>
          <div className={styles['right-wrap']}>
            <p
              className={`${styles['right-wrap-text']} ${
                typeColor[item.incomeStatus]
              }`}
            >
              {typeList[item.incomeStatus]}
            </p>
            <p className={styles['right-wrap-price']}>
              收益：+{this.formatPrice(item.distributionAmount)}元
            </p>
          </div>
        </div>
      );
    };

    return (
      <div className="container">
        <div className={styles['p-cumulativeOrder']}>
          <div className={styles['p-cumulativeOrder-tab']}>
            <Tab
              onClick={this.clickTabItem}
              itemList={tabList}
              active={tabActive}
            ></Tab>
          </div>
          {itemList.length ? (
            <ListView
              ref={el => (this.lv = el)}
              dataSource={dataSource}
              renderFooter={() => (
                <div style={{ paddingTop: 10, textAlign: 'center' }}>
                  {isLoading ? 'Loading...' : '已加载全部'}
                </div>
              )}
              renderRow={row}
              className="p-discountRecord-list"
              pageSize={10}
              useBodyScroll
              scrollRenderAheadDistance={500}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
            />
          ) : (
            <div className={styles['p-cumulativeOrder-empty']}>
              <div className={styles.emptyIcon}></div>
              <div className={styles.emptyText}>暂无数据</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
