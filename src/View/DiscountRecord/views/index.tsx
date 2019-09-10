import React, { Component } from 'react';
import styles from '../styles/index.module.scss';
interface IList {
  [index: string]: any;
}

interface State {
  itemList: Object[];
  typeList: IList;
}

export default class DiscountRecord extends Component<{}, State> {
  state = {
    itemList: [
      {
        id: '1',
        type: '1',
        price: '200',
        date: '2019-08-20'
      },
      {
        id: '2',
        type: '3',
        price: '10',
        date: '2019-08-19'
      },
      {
        id: '3',
        type: '2',
        price: '5',
        date: '2019-08-12'
      }
    ],
    typeList: {
      '1': '提现成功',
      '2': '处理中',
      '3': '提现失败'
    },
    typeColor: {
      '1': styles['tips-one'],
      '2': styles['tips-two'],
      '3': styles['tips-three']
    }
  };

  render() {
    let { itemList, typeList, typeColor } = this.state;
    return (
      <div className="container">
        <div className={styles['p-discountRecord']}>
          {itemList.map(item => {
            return (
              <div className={styles['p-discountRecord-item']} key={item.id}>
                <div>
                  <p className={styles['left-text']}>余额提现</p>
                  <p className={styles['left-date']}>{item.date}</p>
                </div>
                <div
                  className={`${styles['tips-all']} ${typeColor[item.type]}`}
                >
                  {typeList[item.type]}
                </div>
                <div className={styles.price}>+{item.price}元</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
