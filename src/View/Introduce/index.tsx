import * as React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
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

let imgArr = [bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11, bg12];

export default class App extends React.Component {
  img1: any;
  img2: any;
  img3: any;

  state = {
    active: 0
  };

  constructor(props: any) {
    super(props);
    this.img1 = React.createRef();
    this.img2 = React.createRef();
    this.img3 = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.initScrollTop();
    }, 3000);
  }

  initScrollTop() {
    let { img1, img2, img3 } = this;
    console.log(this.img1.current.offsetTop);
    // let { scroll, detailNav, img1, img2, img3 } = this.$refs;
    // let navTop = detailNav.offsetTop;
    window.addEventListener('scroll', () => {
      let scroll = this.ScollPostion();
      let scrollTop: number = scroll.top as number;
      let img1Top = img1.current.offsetTop - 57;
      let img2Top = img2.current.offsetTop - 44;
      let img3Top = img3.current.offsetTop - 44;
      console.log(scrollTop, img1Top, img2Top, img3Top);
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
      console.log(active);
      this.setState({
        active
      });
    });
  }

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
    let { active } = this.state;
    return (
      <div className={styles.page}>
        <div className={styles.banner}>
          <img src={bg1} alt="" />
        </div>
        <StickyContainer>
          <div className={styles.content}>
            <div className={styles.nav}>
              <div className={styles['nav-btn-wrap']}>
                <div
                  className={`${styles['nav-btn']} ${styles.jr} ${!active &&
                    styles.active}`}
                ></div>
                <div
                  className={`${styles['nav-btn']} ${styles.qy} ${active ===
                    1 && styles.active}`}
                ></div>
                <div
                  className={`${styles['nav-btn']} ${styles.tg} ${active ===
                    2 && styles.active}`}
                ></div>
              </div>
            </div>
            <img ref={this.img1} src={bg2} alt="" />
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
          </div>
        </StickyContainer>
      </div>
    );
  }
}
