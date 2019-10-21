import * as React from 'react';
import { Link } from 'react-router-dom';
import { StickyContainer, Sticky } from 'react-sticky';
import { getQueryString } from '@/utils';
import styles from './index.module.scss';
import bg1 from '@/assets/images/tkr/00.png';
import bg2 from '@/assets/images/tkr/01.png';
import bg3 from '@/assets/images/tkr/02.png';
import bg4 from '@/assets/images/tkr/03.png';
import bg5 from '@/assets/images/tkr/04.png';
import bg6 from '@/assets/images/tkr/05.png';
import bg7 from '@/assets/images/tkr/06.png';
import bg8 from '@/assets/images/tkr/07.png';
import bg9 from '@/assets/images/tkr/08.png';
import bg10 from '@/assets/images/tkr/09.png';
import bg11 from '@/assets/images/tkr/10.png';
import bg12 from '@/assets/images/tkr/11.png';
import api from '@/request/api';
import { IConfig } from '@/View/Home/type/home.type';
import store from '@/store';
import { Toast } from 'antd-mobile';
import qs from 'querystring';

let imgArr = [bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11, bg12];
const state = store.getState();

interface Props {
  history: any;
  match: any;
  location: any;
}

interface State {
  active: number;
  id: number;
  userInfo: any;
  configData: IConfig;
}

export default class App extends React.Component<Props, State> {
  img1: any;
  img2: any;
  img3: any;

  state = {
    active: 0,
    id: 0,
    userInfo: state.user,
    configData: {
      directQrcode: '',
      wechatId: ''
    }
  };

  constructor(props: any) {
    super(props);

    this.img1 = React.createRef();
    this.img2 = React.createRef();
    this.img3 = React.createRef();
  }

  componentDidMount() {
    console.log(qs.parse(this.props.location.search.replace(/^\?/, '')), 11111);
    let id: any = getQueryString('id');
    id &&
      this.setState({
        id: id
      });
    setTimeout(() => {
      this.initScrollTop();
    }, 3000);

    this.getBaseConfig();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollTop);
  }

  getBaseConfig() {
    api.customer.getBaseConfig().then(({ data }) => {
      this.setState({
        configData: data.resultData
      });
    });
  }

  getUserIdentity = () => {
    let userInfo = this.state.userInfo;
    let paramsUrl = qs.parse(this.props.location.search.replace(/^\?/, ''));
    // console.log(userInfo,111)
    api.distributie
      .getUserIdentity({
        userId: userInfo.userId
      })
      .then(({ data }) => {
        switch (+data.resultData.type) {
          case 0:
            this.props.history.push({
              pathname: `/home`
            });
            break;
          case 1:
            Toast.info('你已是加盟商，无法成为推广人');
            break;
          case 10:
            this.props.history.push(
              `/detail?inviteCode=${paramsUrl.inviteCode}`
            );
            break;
        }
      });
  };

  initScrollTop() {
    // let { scroll, detailNav, img1, img2, img3 } = this.$refs;
    // let navTop = detailNav.offsetTop;
    window.addEventListener('scroll', this.onScrollTop);
  }

  onScrollTop = () => {
    let { img1, img2, img3 } = this;
    let scroll = this.ScollPostion();
    let scrollTop: number = scroll.top as number;
    let img1Top = img1.current.offsetTop - 57;
    let img2Top = img2.current.offsetTop - 100;
    let img3Top = img3.current.offsetTop - 100;
    let active = 0;

    if (scrollTop >= img1Top && scrollTop < img2Top) {
      active = 0;
    }
    if (scrollTop >= img2Top && scrollTop < img3Top) {
      active = 1;
    }
    if (scrollTop >= img3Top) {
      active = 2;
    }
    this.setState({
      active
    });
  };

  binClickNavBtn = (type: number) => {
    let { img1, img2, img3 } = this;
    let img1Top = img1.current.offsetTop - 57;
    let img2Top = img2.current.offsetTop - 100;
    let img3Top = img3.current.offsetTop - 100;
    switch (type) {
      case 1:
        window.scrollTo(0, img2Top);
        break;
      case 2:
        window.scrollTo(0, img3Top);
        break;
      default:
        window.scrollTo(0, img1Top);
        break;
    }
  };

  ScollPostion() {
    var t, l, w, h;
    if (document.documentElement && document.documentElement.scrollTop) {
      t = document.documentElement.scrollTop;
      l = document.documentElement.scrollLeft;
      w = document.documentElement.scrollWidth;
      h = document.documentElement.scrollHeight;
    } else if (document.body) {
      t = document.body.scrollTop;
      l = document.body.scrollLeft;
      w = document.body.scrollWidth;
      h = document.body.scrollHeight;
    }
    return {
      top: t,
      left: l,
      width: w,
      height: h
    };
  }

  public render() {
    let { binClickNavBtn } = this;
    let { active, id, configData } = this.state;

    return (
      <div className={styles.page}>
        <div className={styles.banner}>
          <img src={bg1} alt="" />
        </div>
        <StickyContainer>
          <div className={styles.content}>
            <Sticky>
              {({ style }) => (
                <div className={styles.nav} style={{ ...style }}>
                  <div className={styles['nav-btn-wrap']}>
                    <div
                      onClick={() => {
                        binClickNavBtn(0);
                      }}
                      className={`${styles['nav-btn']} ${styles.jr} ${!active &&
                        styles.active}`}
                    ></div>
                    <div
                      onClick={() => {
                        binClickNavBtn(1);
                      }}
                      className={`${styles['nav-btn']} ${styles.qy} ${active ===
                        1 && styles.active}`}
                    ></div>
                    <div
                      onClick={() => {
                        binClickNavBtn(2);
                      }}
                      className={`${styles['nav-btn']} ${styles.tg} ${active ===
                        2 && styles.active}`}
                    ></div>
                  </div>
                </div>
              )}
            </Sticky>
            <div className={styles.img_div}>
              <img ref={this.img1} src={bg2} alt="" />
              <div
                className={styles.img_btn}
                onClick={this.getUserIdentity.bind(this)}
              ></div>
              <img className={styles.img_qr} src={configData.directQrcode} />
              <div className={styles.img_text}>
                <p>群内每日推广培训</p>
                <p> 微信号：{configData.wechatId}</p>
              </div>
            </div>
            <img src={bg3} alt="" />
            <img src={bg4} alt="" />
            <img src={bg5} alt="" />
            <img ref={this.img2} src={bg6} alt="" />
            <img src={bg7} alt="" />
            <img src={bg8} alt="" />
            <img ref={this.img3} src={bg9} alt="" />
            <img src={bg10} alt="" />
            <img src={bg11} alt="" />
            <img src={bg12} alt="" />
            <div
              className={styles.btn}
              onClick={this.getUserIdentity.bind(this)}
            ></div>
          </div>
        </StickyContainer>
      </div>
    );
  }
}
