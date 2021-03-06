import React, { Component } from 'react';
import '../styles/index.scss';
import styles from '../styles/index.module.scss';
import { ListView } from 'antd-mobile';
import api from '@/request/api';
import dayjs from 'dayjs';
import qs from 'querystring';

interface IList {
  nickName: string;
  type: number;
  applyTime: string;
  headimgurl: string;
}

interface State {
  itemList: IList[];
  total: number;
  dataSource: any;
  isLoading: boolean;
  page: {
    current: number;
    size: number;
  };
}

interface Props {
  location: any;
}

export default class CumulativeInvitation extends Component<Props, State> {
  lv: any = {};
  state = {
    page: {
      current: 1,
      size: 10
    },
    total: 1,
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1: any, row2: any) => row1 !== row2
    }),
    isLoading: false,
    itemList: []
  };

  componentDidMount() {
    document.title = '累计邀请';
    this.pageBindingRelationship();
  }

  pageBindingRelationship() {
    let { current, size } = this.state.page;

    let paramsUrl = qs.parse(this.props.location.search.replace(/^\?/, ''));
    let promoterId: any = paramsUrl.userId;
    let pullUrl =
      paramsUrl.type === '1'
        ? api.distributie.listByPromoterByFranchisee
        : api.distributie.pageBindingRelationship;

    if (this.state.itemList.length >= this.state.total) {
      return;
    }

    this.setState({
      isLoading: true
    });

    pullUrl({
      current,
      size,
      promoterId
    }).then(
      ({ data }) => {
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
        this.forceUpdate();
      },
      () => {
        this.setState({
          isLoading: false
        });
      }
    );
  }

  formatTime(price: string): string {
    return dayjs(+price).format('YYYY-MM-DD HH:mm');
  }

  onEndReached = () => {
    this.pageBindingRelationship();
  };

  render() {
    let { itemList, dataSource, isLoading } = this.state;

    const row = (item: any, sectionID: any, rowID: any) => {
      return (
        <div className={styles['p-cumulativeInvitation-item']} key={item.id}>
          <div className={styles['left-wrap']}>
            <img
              className={styles['left-wrap-img']}
              src={item.headimgurl}
              alt=""
            />
            <div>{item.nickName}</div>
          </div>
          <div className={styles['right-wrap']}>
            <p className={styles['right-text']}>已绑定</p>
            <p className={styles['right-date']}>
              {this.formatTime(item.applyTime)}
            </p>
          </div>
        </div>
      );
    };

    return (
      <div className="container cumulativeInvitation">
        <div className={styles['p-cumulativeInvitation']}>
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
              className="p-cumulativeInvitation-list"
              pageSize={10}
              useBodyScroll
              scrollRenderAheadDistance={500}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
            />
          ) : (
            <div className={styles['p-cumulativeInvitation-empty']}>
              <div className={styles.emptyIcon}></div>
              <div className={styles.emptyText}>暂无数据</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
