import React, { Component } from 'react';
import styles from '../styles/index.module.scss';
import img1 from '../../../assets/images/friends/btn.png';
import img2 from '../../../assets/images/friends/jiantou.png';
import store from '@/store';
import { reWexin } from '@/utils';

const state = store.getState();
interface Props {
  history: any;
}

interface State {
  isShowMask: boolean;
  userInfo: any;
}

export default class PromotionDetail extends Component<Props, State> {
  state = {
    isShowMask: false,
    userInfo: state.user
  };

  componentDidMount() {
    document.title = '邀请好友';
    this.reWexin();
  }

  changeMask = (data: boolean) => {
    this.setState({
      isShowMask: data
    });

    // this.props.history.push(`/introduce?inviteCode=123`);
  };

  reWexin() {
    let { userInfo } = this.state;

    reWexin({
      title: '推广人招募',
      doc: '乐小狮大语文推广行动，分享课程赚现金，快来加入我们吧！',
      url: `${window.location.origin}/introduce?inviteCode=${userInfo.inviteCode}`,
      img: ''
    });
  }

  render() {
    let { isShowMask } = this.state;
    return (
      <div className="container">
        <div className={styles['p-inviteFriends']}>
          <div
            className={styles['p-inviteFriends-btn']}
            onClick={() => {
              this.changeMask(true);
            }}
          >
            <img className={styles.btn_img} src={img1} />
          </div>
          {isShowMask ? (
            <div
              className={styles['p-inviteFriends-mask']}
              onClick={() => {
                this.changeMask(false);
              }}
            >
              <div className={styles.mask_bg}>
                <img className={styles.mask_icon} src={img2} />
                <p className={styles.mask_p}>1.点击右上角分享按钮</p>
                <p className={styles.mask_p}>2.发送给朋友或分享到朋友圈</p>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}
