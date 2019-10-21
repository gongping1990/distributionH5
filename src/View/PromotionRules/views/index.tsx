import React, { Component } from 'react';
import styles from '../styles/index.module.scss';
import img1 from '../../../assets/images/promotion/tggz-img1.png';
import img2 from '../../../assets/images/promotion/tggz-img2.png';
import api from '@/request/api';

interface State {
  imgUrl: any;
  itemList: any[];
}

export default class PromotionRules extends Component<{}, State> {
  state = {
    imgUrl: '',
    itemList: [
      {
        id: 1,
        name: '收益说明',
        text: '推广人的推广收益为推广课程下单金额的20%',
        img: ''
      },
      {
        id: 2,
        name: '如何进入推广中心',
        text: '在【乐小狮福利社】公众号，点击菜单栏【推广人】进入推广中心',
        img: img1
      },
      {
        id: 3,
        name: '如何提现',
        text: '点击申请提现按钮，根据流程操作',
        img: img2
      }
    ]
  };

  componentDidMount() {
    document.title = '推广规则';
    this.getInfo();
  }

  getInfo() {
    api.customer.getBaseConfig().then(({ data }) => {
      this.setState({
        imgUrl: data.resultData.directQrcode
      });
    });
  }

  render() {
    let { imgUrl, itemList } = this.state;

    return (
      <div className="container">
        <div className={styles['p-promotionRules']}>
          <div className={styles['p-promotionRules-top']}>
            <p className={styles['-top-title']}>扫描下方二维码</p>
            <p className={styles['-top-small']}>
              添加推广指导老师，获取推广指导
            </p>
            <img className={styles['-top-img']} src={imgUrl} alt="" />
          </div>
          <div className={styles['p-promotionRules-down']}>
            <div className={styles['-down-title']}>推广规则</div>
            {itemList.map(item => {
              return (
                <div className={styles['-down-item']} key={item.id}>
                  <div className={styles['-down-item-title']}>{item.name}</div>
                  <div className={styles['-down-item-text']}>{item.text}</div>
                  {item.img ? (
                    <img
                      className={styles['-down-item-img']}
                      src={item.img}
                      alt=""
                    />
                  ) : (
                    ''
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
