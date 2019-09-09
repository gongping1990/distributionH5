import React, { Component } from 'react';
import styles from '../styles/index.module.scss';

interface State {
  itemList: Object[];
  typeList: any;
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
    }
  };

  render() {
    let { itemList, typeList } = this.state;
    return (
      <div className="container">
        <div className={styles['p-discountRecord']}>
          {itemList.map(item => {
            let type: string = item.type;
            return (
              <div className={styles['p-discountRecord-item']} key={item.id}>
                <div>
                  <p>余额提现</p>
                  <p>{item.date}</p>
                </div>
                <div>{typeList[type]}</div>
                <div>+{item.price}元</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
