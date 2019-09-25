import React, { Component } from 'react';
import { ListView } from 'antd-mobile';
import styles from '../styles/index.module.scss';
import api from '@/request/api';

interface IList {
  amount: number;
  id: number;
  withdrawStatus: number;
  gmtCreate: number;
}

interface State {
  itemList: IList[];
  typeList: object;
  total: number;
}

export default class DiscountRecord extends Component<{}, State> {
  state = {
    page: {
      current: 1,
      size: 10
    },
    total: 0,
    itemList: [],
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
    let { itemList } = this.state;
    api.distributie
      .getWithdrawRecord({
        current,
        size
      })
      .then(({ data }) => {
        if (current > 1) {
          this.setState({
            itemList: itemList.concat(data.resultData.records)
          });
        } else {
          this.setState({
            itemList: data.resultData.records
          });
        }

        this.setState({
          total: data.resultData.total
        });
      });
  }

  onEndReached() {
    console.log('加载更多');
    let { page, total } = this.state;
    if (page.current < Math.ceil(total / page.size)) {
      page.current++;
      this.getWithdrawRecord();
    }
  }

  formatPrice(price: number): string {
    return Number(+price / 100).toFixed(2);
  }

  render() {
    let { itemList, typeList, typeColor, isLoading } = this.state;

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
              dataSource={itemList}
              renderFooter={() => (
                <div className={styles['item-footer']}>
                  {isLoading ? 'Loading...' : '已加载全部'}
                </div>
              )}
              renderRow={row}
              className="p-discountRecord-list"
              pageSize={10}
              useBodyScroll
              onScroll={() => {
                console.log('scroll');
              }}
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
