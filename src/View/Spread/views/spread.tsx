import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '@/request/api';
import { formatPrice } from '@/utils';
import styles from '../styles/index.module.scss';
import { components } from '../../Home';
import { connect } from 'react-redux';

const { Title } = components;
enum UserType {
  EXTENSION, //推广人
  FRANCHISEE //加盟商
}

interface Props {
  history: any;
  user: any;
}
interface State {
  centerData: {
    allIncome: number;
    allInvite: number;
    allOrder: number;
    balance: number;
    blockingAmount: number;
    headimgurl: string;
    nickname: string;
    todayIncome: number;
    todayInvites: number;
    todayOrders: number;
    type: number;
  };
}

class Spread extends Component<Props, State> {
  state = {
    centerData: {
      allIncome: 0,
      allInvite: 0,
      allOrder: 0,
      balance: 0,
      blockingAmount: 0,
      headimgurl: '',
      nickname: '',
      todayIncome: 0,
      todayInvites: 0,
      todayOrders: 0,
      type: 0
    }
  };

  componentWillMount() {
    this.getFranchiseeCenter();
  }
  componentDidMount() {
    document.title = '加盟商中心';
  }

  getFranchiseeCenter() {
    api.distributie.getFranchiseeCenter().then(({ data }) => {
      if (data.resultData) {
        if (data.resultData.type === UserType.EXTENSION) {
          this.props.history.replace('/');
        }
        this.setState({
          centerData: data.resultData
        });
      } else {
        this.props.history.push('/promotionDetail');
      }
    });
  }

  toJumpOne = () => {
    this.props.history.push(
      `/cumulativeInvitation?userId=${this.props.user.userId}&type=1`
    );
  };
  toJumpTwo = () => {
    this.props.history.push({
      pathname: `/cumulativeOrder/${this.props.user.userId}`
    });
  };

  toJumpThree = () => {
    localStorage.setItem('isFirst', 'true');
    this.props.history.push({
      pathname: `/inviteFriends`
    });
  };

  render() {
    let {
      nickname,
      headimgurl,
      balance,
      allIncome,
      allInvite,
      allOrder,
      todayIncome,
      todayInvites,
      todayOrders
    } = this.state.centerData;

    let todayIncomeFormat = todayIncome / 100;

    return (
      <div className="container">
        <div className={styles.header}>
          <div className={styles.user}>
            <div className={styles['user-content']}>
              <img className={styles.avatar} src={headimgurl} alt="" />
              <div>
                <p className={styles.name}>{nickname}</p>
                <span className={styles.userPrice}>
                  可提余额：{formatPrice(balance)}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.profit}>
            <div className={`${styles['profit-header']} hk-hairline--bottom`}>
              <div className={styles['profit-price']}>
                <i className={styles['profit-icon']}></i>
                <div>
                  <p className={styles['profit-text']}>累计收益</p>
                  <p className={styles['profit-title']}>
                    {formatPrice(allIncome)}
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
                <p className={styles['static-num']}>{allInvite}</p>
                <p className={styles['static-text']}>累计邀请</p>
              </div>
              <div className={styles['static-item']} onClick={this.toJumpTwo}>
                <p className={styles['static-num']}>{allOrder}</p>
                <p className={styles['static-text']}>累计订单</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <Title type={1}>今日统计</Title>
        </div>
        <div className={styles.statistics}>
          <div className={styles['statistics-item']}>
            <p>{todayIncomeFormat}</p>
            <span>今日收益</span>
          </div>
          <div className={styles['statistics-item']}>
            <p>{todayOrders}</p>
            <span>今日订单</span>
          </div>
          <div className={styles['statistics-item']}>
            <p>{todayInvites}</p>
            <span>今日邀请</span>
          </div>
        </div>
        <div className={styles.btn} onClick={this.toJumpThree}>
          邀请好友成为推广人
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Spread);
