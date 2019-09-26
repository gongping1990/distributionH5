import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '@/request/api';

import { ICenter, IOrder, IConfig } from '../type/home.type';
import styles from '../styles/index.module.scss';
import { Title, TestItem, CourseItem, Mask } from '../component';
import phoneIcon from '../../../assets/images/home/icon_phone.png';
import gkIcon from '../../../assets/images/home/icon_gk.png';
import banner from '../../../assets/images/home/banner@2x.png';
import store from '@/store';

const getUserInfo = store.getState().user;

enum UserType {
  EXTENSION, //推广人
  FRANCHISEE //加盟商
}
interface Props {
  user: {
    nickname: string;
    headimgurl: string;
    useId: string;
  };
  history: any;
}
interface State {
  centerData: ICenter;
  configData: IConfig;
  showMask: boolean;
  step: number;
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
      useId: '', // 昵称
      orderList: []
    },
    configData: {
      directQrcode: '',
      id: 0,
      reviewQrcode: '',
      subQrcode: '',
      wechatId: ''
    },
    step: 0,
    showMask: false
  };

  componentWillMount() {
    document.title = '推广中心';
    this.getPromoterCenter();
  }

  bindClickCourseItem = (id: number, type: number) => {
    switch (type) {
      case 1:
        this.createGroup(id);
        break;
    }
  };

  bindClickTest = () => {
    window.scrollTo(0, 400);
    this.setState({
      showMask: true
    });
  };

  onClickMask = () => {
    let { step } = this.state;
    if (!step) {
      this.setState({
        step: 1
      });
    } else {
      this.setState({
        step: 0,
        showMask: false
      });
    }
  };

  getPromoterCenter() {
    api.distributie.getPromoterCenter().then(({ data }) => {
      if (data.resultData) {
        // if (data.resultData.type == UserType.FRANCHISEE) {
        //   this.props.history.replace('/spread')
        // }
        this.setState({
          centerData: data.resultData
        });
      } else {
        this.props.history.replace('/detail');
      }
    });
  }

  getBaseConfig() {
    api.customer.editBaseConfig().then(({ data }) => {
      this.setState({
        configData: data.resultData
      });
    });
  }

  createGroup(courseId: number) {
    api.distributie
      .createGroup({
        courseId
      })
      .then(({ data }) => {
        this.props.history.push(
          `/group?id=${data.resultData.orderId}&type=${data.resultData.bizSystem}&courseId=${data.resultData.courseId}`
        );
      });
  }

  toJumpOne = () => {
    this.props.history.push({
      pathname: `/cumulativeInvitation/${getUserInfo.userId}`
    });
  };
  toJumpTwo = () => {
    this.props.history.push({
      pathname: `/cumulativeOrder/${getUserInfo.userId}`
    });
  };

  formatPrice(price: number): string {
    return (price / 100).toFixed(2);
  }

  render() {
    let centerData: ICenter = this.state.centerData as ICenter;
    let orderLisr: IOrder[] = centerData.orderList;
    let { subQrcode } = this.state.configData;
    let { showMask, step } = this.state;
    let { formatPrice, bindClickCourseItem, bindClickTest } = this;
    return (
      <div className="container">
        {showMask && <Mask onClick={this.onClickMask} show={step == 1}></Mask>}

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
              <div className={styles['static-item']} onClick={this.toJumpOne}>
                <p className={styles['static-num']}>{centerData.allInvite}</p>
                <p className={styles['static-text']}>累计邀请</p>
              </div>
              <div className={styles['static-item']} onClick={this.toJumpTwo}>
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
              index={0}
              process={centerData.allClick}
              onClick={bindClickTest}
            ></TestItem>
            <TestItem
              icon={gkIcon}
              title="邀请2位用户成功购课"
              msg="除佣金外，额外奖励"
              price={5}
              total={2}
              index={1}
              process={centerData.allBuy}
              onClick={bindClickTest}
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
                  showMask={!i && showMask && !step}
                ></CourseItem>
              );
            })}
          </div>
          <div className={styles.qrcodeWrap}>
            <img className={styles.qrcode} src={subQrcode} alt="" />
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
