import React, { Component } from 'react';
import styles from '../styles/index.module.scss';
import Tab from '../../ProfitDetail/component/tab';

interface State {
  itemList: Object[];
  tabActive: number;
}

export default class CumulativeOrder extends Component<{}, State> {
  state = {
    tabActive: 0,
    tabList: [
      { name: '全部的', id: 0 },
      { name: '已获得', id: 1 },
      { name: '冻结中', id: 2 },
      { name: '已退款', id: 3 }
    ],
    itemList: [
      {
        id: '1',
        name: '小缪咪',
        courseName: '小语轻作文',
        headimgurl:
          'https://pub.file.k12.vip/2019/09/10/1171235902187249666.jpg',
        type: '1',
        price: '30',
        date: '2019-08-20'
      },
      {
        id: '2',
        name: '唐小夕',
        courseName: '每日一首古诗词（升级版）',
        headimgurl:
          'https://pub.file.k12.vip/2019/09/10/1171235976753586178.png',
        type: '2',
        price: '50',
        date: '2019-08-19'
      },
      {
        id: '3',
        name: '娃哈哈',
        courseName: '小语轻作文',
        headimgurl:
          'https://pub.file.k12.vip/2019/09/10/1171236123625529346.jpg',
        type: '3',
        price: '198',
        date: '2019-08-12'
      }
    ],
    typeList: {
      '1': '冻结中',
      '2': '已获得',
      '3': '已退款'
    },
    typeColor: {
      '1': styles['tips-one'],
      '2': styles['tips-two'],
      '3': styles['tips-three']
    }
  };

  clickTabItem = (index: number) => {
    this.setState({
      tabActive: index
    });
  };
  render() {
    let { itemList, typeList, typeColor, tabActive, tabList } = this.state;
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
          {itemList.map(item => {
            return (
              <div className={styles['p-cumulativeOrder-item']} key={item.id}>
                <div className={styles['left-wrap']}>
                  <div className={styles['left-wrap-time']}>{item.date}</div>
                  <div className={styles['left-wrap-user']}>
                    <img
                      className={styles['left-wrap-img']}
                      src={item.headimgurl}
                    />
                    <div>{item.name}</div>
                  </div>
                  <div>{item.courseName}</div>
                </div>
                <div className={styles['right-wrap']}>
                  <p
                    className={`${styles['right-wrap-text']} ${
                      typeColor[item.type]
                    }`}
                  >
                    {typeList[item.type]}
                  </p>
                  <p className={styles['right-wrap-price']}>
                    收益：+{item.price}元
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
