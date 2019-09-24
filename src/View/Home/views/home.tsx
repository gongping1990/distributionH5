import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '@/request/api';
import wx from '@/utils/wx';
import { ICenter, IOrder } from '../type/home.type';
import styles from '../styles/index.module.scss';
import { Title, TestItem, CourseItem } from '../component';
import phoneIcon from '../../../assets/images/home/icon_phone.png';
import gkIcon from '../../../assets/images/home/icon_gk.png';
import banner from '../../../assets/images/home/banner@2x.png';

interface IWeixin {
  title: string;
  doc: string;
  url: string;
  img: string;
}

interface Props {
  user: {
    nickname: string;
    headimgurl: string;
  };
}
interface State {
  centerData: ICenter;
}

class Home extends Component<Props, State> {
  state = {
    centerData: {
      allBuy: 0, // 邀请用户成功购课数量
      allClick: 0, //邀请好友点开课程链接数量
      allIncome: 0, //累积收益(分)
      allInvite: 0, //累积邀请
      allOrder: 0, //累积订单
      balance: 0, // 账户余额(分)
      blockingAmount: 0, //冻结金额(分)
      headimgurl: '', // 头像
      nickname: '', // 昵称
      orderList: []
    }
  };

  componentWillMount() {
    this.getPromoterCenter();
  }

  bindClickCourseItem = (id: number, type: number) => {
    switch (type) {
      case 1:
        this.createGroup(id);
        break;
    }
  };

  getPromoterCenter() {
    api.distributie.getPromoterCenter().then(({ data }) => {
      this.setState({
        centerData: data.resultData
      });
    });
  }

  createGroup(courseId: number) {
    api.distributie
      .createGroup({
        courseId
      })
      .then(() => {});
  }

  reWexin(params: IWeixin) {
    let { title, doc, url, img } = params;
    let appUrl = encodeURIComponent(window.location.href.split('#')[0]);
    api.wechat
      .share({
        appUrl
      })
      .then(({ data }) => {
        wx.config(data.resultData, [
          'onMenuShareTimeline',
          'onMenuShareAppMessage'
        ]);
        wx.register(() => {
          wx.shareConfig(title, doc, url, img);
        });
      });
  }

  formatPrice(price: number): string {
    return (price / 100).toFixed(2);
  }

  render() {
    let centerData: ICenter = this.state.centerData as ICenter;
    let orderLisr: IOrder[] = centerData.orderList;
    let { formatPrice, bindClickCourseItem } = this;
    return (
      <div className="container">
        <div className={styles.header}>
          <div className={styles.user}>
            <div className={styles['user-content']}>
              <img
                className={styles.avatar}
                src={centerData.headimgurl}
                alt=""
              />
              <div>
                <p className={styles.name}>{centerData.nickname}</p>
                <span className={styles.userPrice}>
                  可提余额：{formatPrice(centerData.balance)}
                </span>
              </div>
            </div>
            <p className={styles.strategy}>
              推广攻略 <i></i>
            </p>
          </div>
          <div className={styles.profit}>
            <div className={`${styles['profit-header']} hk-hairline--bottom`}>
              <div className={styles['profit-price']}>
                <i className={styles['profit-icon']}></i>
                <div>
                  <p className={styles['profit-text']}>累计收益</p>
                  <p className={styles['profit-title']}>
                    {formatPrice(centerData.allIncome)}
                    <i>元</i>
                  </p>
                </div>
              </div>
              <Link to="/profit" className={styles['profit-btn']}>
                查看明细
              </Link>
            </div>
            <div className={styles.static}>
              <div className={styles['static-item']}>
                <p className={styles['static-num']}>{centerData.allInvite}</p>
                <p className={styles['static-text']}>累计邀请</p>
              </div>
              <div className={styles['static-item']}>
                <p className={styles['static-num']}>{centerData.allOrder}</p>
                <p className={styles['static-text']}>累计订单</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <Title>新手任务</Title>
          <div className={styles.test}>
            <TestItem
              icon={phoneIcon}
              title="邀请5位好友点开课程链接"
              msg="奖励"
              price={2}
              total={5}
              process={centerData.allClick}
            ></TestItem>
            <TestItem
              icon={gkIcon}
              title="邀请2位用户成功购课"
              msg="除佣金外，额外奖励"
              price={5}
              total={2}
              process={centerData.allBuy}
            ></TestItem>
          </div>
          <Title>推广课程</Title>
          <div>
            {orderLisr.map((e, i) => {
              return (
                <CourseItem
                  key={i}
                  onClick={bindClickCourseItem}
                  {...e}
                ></CourseItem>
              );
            })}
          </div>
          <div>
            <img className={styles.banner} src={banner} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Home);
