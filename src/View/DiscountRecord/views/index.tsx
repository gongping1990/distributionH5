import React, { Component } from 'react';
import { ListView } from 'antd-mobile';
import styles from '../styles/index.module.scss';
import api from '@/request/api';

interface IList {
  amount: number;
  id: number;
  withdrawStatus: number;
  gmtCreate: string;
}

interface State {
  page: {
    current: number;
    size: number;
  };
  itemList: IList[];
  typeList: object;
  total: number;
  dataSource: any;
  isLoading: boolean;
}

export default class DiscountRecord extends Component<{}, State> {
  lv: any = {};
  state = {
    page: {
      current: 1,
      size: 10
    },
    total: 1,
    itemList: [],
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1: any, row2: any) => row1 !== row2
    }),
    isLoading: false,
    typeList: {
      '1': '处理中',
      '2': '提现成功',
      '3': '提现失败'
    },
    typeColor: {
      '1': styles['tips-two'],
      '2': styles['tips-one'],
      '3': styles['tips-three']
    }
  };

  componentDidMount() {
    this.getWithdrawRecord();
  }

  getWithdrawRecord() {
    let { current, size } = this.state.page;
    let { itemList, isLoading, page } = this.state;
    this.setState({
      isLoading: true
    });
    api.distributie
      .getWithdrawRecord({
        current,
        size
      })
      .then(
        ({ data }) => {
          let list = [...this.state.itemList, ...data.resultData.records];

          this.setState({
            page: { ...page, current: current + 1 },
            itemList: list,
            dataSource: this.state.dataSource.cloneWithRows(list),
            total: data.resultData.total,
            isLoading: false
          });
        },
        () => {
          this.setState({
            isLoading: false
          });
        }
      );
  }

  onEndReached = () => {
    let { total, itemList } = this.state;
    if (itemList.length >= total) return;
    this.getWithdrawRecord();
  };

  formatPrice(price: number): string {
    return Number(+price / 100).toFixed(2);
  }

  render() {
    let { itemList, typeList, typeColor, isLoading, dataSource } = this.state;

    const row = (item: any, sectionID: any, rowID: any) => {
      return (
        <div className={styles['p-discountRecord-item']}>
          <div>
            <p className={styles['left-text']}>余额提现</p>
            <p className={styles['left-date']}>{item.gmtCreate}</p>
          </div>
          <div
            className={`${styles['tips-all']} ${
              typeColor[item.withdrawStatus]
            }`}
          >
            {typeList[item.withdrawStatus]}
          </div>
          <div className={styles.price}>+{this.formatPrice(item.amount)}元</div>
        </div>
      );
    };
    return (
      <div className="container">
        <div className={styles['p-discountRecord']}>
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
            <div className={styles['p-discountRecord-empty']}>
              <div className={styles.emptyIcon}></div>
              <div className={styles.emptyText}>你还没有提现记录</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
