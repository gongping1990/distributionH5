import React, { Component } from 'react';
import styles from '../styles/index.module.scss';
import { ListView } from 'antd-mobile';

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
  promoterId: any;
}

interface Props {
  match: any;
}

export default class CumulativeInvitation extends Component<Props, State> {
  lv: any = {};
  state = {
    page: {
      current: 1,
      size: 10
    },
    total: 0,
    promoterId: '',
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1: any, row2: any) => row1 !== row2
    }),
    isLoading: false,
    itemList: []
  };

  componentDidMount() {
    this.pageBindingRelationship();
    console.log(this.props.match.params.id, 1111);
  }

  pageBindingRelationship() {
    let { current, size } = this.state.page;
    let { itemList, isLoading, promoterId } = this.state;
    // isLoading = true
    // api.distributie
    //   .getWithdrawRecord({
    //     current,
    //     size,
    //     promoterId
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
    let array: any = [];

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
      this.pageBindingRelationship();
    }
  };

  render() {
    let { itemList, dataSource, isLoading } = this.state;

    const row = (item: any, sectionID: any, rowID: any) => {
      return (
        <div className={styles['p-cumulativeInvitation-item']} key={item.id}>
          <div className={styles['left-wrap']}>
            <img className={styles['left-wrap-img']} src={item.headimgurl} />
            <div>{item.nickName}</div>
          </div>
          <div className={styles['right-wrap']}>
            <p className={styles['right-text']}>
              {item.type ? '已绑定' : '未绑定'}
            </p>
            <p className={styles['right-date']}>{item.applyTime}</p>
          </div>
        </div>
      );
    };

    return (
      <div className="container">
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
