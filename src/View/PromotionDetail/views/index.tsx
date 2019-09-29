import React, { Component } from 'react';
import styles from '../styles/index.module.scss';
import img1 from '../../../assets/images/promotion/detail_01.png';
import img2 from '../../../assets/images/promotion/detail_02.png';
import img3 from '../../../assets/images/promotion/detail_03.png';
import img4 from '../../../assets/images/promotion/detail_04.png';
import img5 from '../../../assets/images/promotion/detail_05.png';
import img6 from '../../../assets/images/promotion/detail_06.png';
import img7 from '../../../assets/images/promotion/detail_07.png';
import img8 from '../../../assets/images/promotion/detail_08.png';

interface Props {
  history: any;
}

interface State {
  itemList: any[];
}

export default class PromotionDetail extends Component<Props, State> {
  state = {
    itemList: [
      {
        id: 1,
        img: img1
      },
      {
        id: 2,
        img: img2
      },
      {
        id: 3,
        img: img3
      },
      {
        id: 4,
        img: img4
      },
      {
        id: 5,
        img: img5
      },
      {
        id: 6,
        img: img6
      },
      {
        id: 7,
        img: img7
      },
      {
        id: 8,
        img: img8
      }
    ]
  };

  componentDidMount() {
    document.title = '加盟商详情页';
  }

  toJump = () => {
    this.props.history.push({
      pathname: `/join`
    });
  };

  render() {
    let { itemList } = this.state;

    return (
      <div className="container">
        <div className={styles['p-promotionDetail']}>
          {itemList.map(item => {
            return (
              <img
                className={styles['-item-img']}
                key={item.id}
                src={item.img}
              />
            );
          })}
          <div className={styles['p-promotionDetail-footer']}>
            <div className={styles['-footer-btn']} onClick={this.toJump}>
              立即申请加入
            </div>
          </div>
        </div>
      </div>
    );
  }
}
