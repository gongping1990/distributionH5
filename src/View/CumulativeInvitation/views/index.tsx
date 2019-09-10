import React, { Component } from 'react';
import styles from '../styles/index.module.scss';

interface State {
  itemList: Object[];
}

export default class CumulativeInvitation extends Component<{}, State> {
  state = {
    itemList: [
      {
        id: '1',
        name: '小缪咪',
        headimgurl:
          'https://pub.file.k12.vip/2019/09/10/1171235902187249666.jpg',
        type: true,
        date: '2019-08-20'
      },
      {
        id: '2',
        name: '唐小夕',
        headimgurl:
          'https://pub.file.k12.vip/2019/09/10/1171235976753586178.png',
        type: false,
        date: '2019-08-19'
      },
      {
        id: '3',
        name: '娃哈哈',
        headimgurl:
          'https://pub.file.k12.vip/2019/09/10/1171236123625529346.jpg',
        type: false,
        date: '2019-08-12'
      }
    ]
  };

  render() {
    let { itemList } = this.state;
    return (
      <div className="container">
        <div className={styles['p-cumulativeInvitation']}>
          {itemList.map(item => {
            return (
              <div
                className={styles['p-cumulativeInvitation-item']}
                key={item.id}
              >
                <div className={styles['left-wrap']}>
                  <img
                    className={styles['left-wrap-img']}
                    src={item.headimgurl}
                  />
                  <div>{item.name}</div>
                </div>
                <div className={styles['right-wrap']}>
                  <p className={styles['right-text']}>
                    {item.type ? '已绑定' : '未绑定'}
                  </p>
                  <p className={styles['right-date']}>{item.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
