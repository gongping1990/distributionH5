import React, { Component } from 'react';
import { ListView } from 'antd-mobile';
import styles from '../styles/index.module.scss';
// import api from '@/request/api';

interface IList {
  amount: number;
  id: number;
  withdrawStatus: number;
  gmtCreate: string;
}

interface State {
  itemList: IList[];
  typeList: object;
  total: number;
  dataSource: any;
}

export default class DiscountRecord extends Component<{}, State> {
  lv: any = {};
  state = {
    page: {
      current: 1,
      size: 10
    },
    total: 0,
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
    // let { current, size } = this.state.page;
    // let { itemList, isLoading } = this.state;
    // isLoading = true
    // api.distributie
    //   .getWithdrawRecord({
    //     current,
    //     size
    //   })
    //   .then(({ data }) => {
    //
    //     if (current > 1) {
    //       this.setState({
    //         itemList: itemList.cloneWithRows(itemList.concat(data.resultData.records))
    //       });
    //     } else {
    //       this.setState({
    //         itemList: itemList.cloneWithRows(data.resultData.records)
    //       });
    //     }
    //
    //     this.setState({
    //       total: data.resultData.total
    //     });
    //     isLoading = false
    //   },()=>{
    //     isLoading = false
    //   });
    let array = [
      {
        amount: 120,
        withdrawStatus: 1,
        gmtCreate: '2019/9/23 18:23',
        id: 98855252
      },
      {
        amount: 110,
        withdrawStatus: 1,
        gmtCreate: '2019/9/23 18:23',
        id: 123456
      },
      {
        amount: 1900,
        withdrawStatus: 1,
        gmtCreate: '2019/9/13 17:23',
        id: 96589
      },
      {
        amount: 121,
        withdrawStatus: 1,
        gmtCreate: '2019/9/29 19:23',
        id: 123456
      },
      {
        amount: 32,
        withdrawStatus: 1,
        gmtCreate: '2019/5/23 13:23',
        id: 1212121
      },
      {
        amount: 100,
        withdrawStatus: 1,
        gmtCreate: '2019/09/03 12:23',
        id: 123456
      },
      {
        amount: 100,
        withdrawStatus: 1,
        gmtCreate: '2019/9/23 11:23',
        id: 123456121212
      },
      {
        amount: 121,
        withdrawStatus: 1,
        gmtCreate: '2019/9/23 18:23',
        id: 123456121
      },
      {
        amount: 100,
        withdrawStatus: 2,
        gmtCreate: '2019/9/23 18:23',
        id: 1234565
      },
      {
        amount: 43,
        withdrawStatus: 2,
        gmtCreate: '2019/9/23 18:23',
        id: 1234564
      },
      {
        amount: 12,
        withdrawStatus: 2,
        gmtCreate: '2019/9/23 18:23',
        id: 1234563
      },
      {
        amount: 100,
        withdrawStatus: 2,
        gmtCreate: '2019/9/23 18:23',
        id: 1234561
      },
      {
        amount: 44,
        withdrawStatus: 2,
        gmtCreate: '2019/7/23 18:23',
        id: 1234562
      }
    ];

    this.setState({
      itemList: array,
      dataSource: this.state.dataSource.cloneWithRows(array)
    });
  }

  onEndReached = () => {
    console.log('加载更多');
    let { page, total } = this.state;
    if (page.current < Math.ceil(total / page.size)) {
      page.current++;
      this.getWithdrawRecord();
    }
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
