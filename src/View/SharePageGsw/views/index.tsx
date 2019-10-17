import React, { Component } from 'react';
import styles from '../styles/index.module.scss';
import html2canvas from 'html2canvas';
import qs from 'querystring';
import api from '@/request/api';
import bgImg from '../../../assets/images/share/img.png';
interface Props {
  location: any;
}

interface State {
  dataInfo: {
    nickName: string;
    headimgurl: string;
    playbillQrUrl: string;
    ptPrice: string;
    ddgPrice: string;
  };
}

export default class DiscountResult extends Component<Props, State> {
  state = {
    isShowImg: false,
    shareUrl: '',
    dataInfo: {
      nickName: '',
      headimgurl: '',
      playbillQrUrl: '',
      ptPrice: '',
      ddgPrice: ''
    }
  };

  componentDidMount() {
    document.title = '分享海报';
    this.getBaseConfig();
    if (localStorage.isFirst === 'true') {
      window.location.reload();
      localStorage.isFirst = 'false';
    }
  }

  getBaseConfig() {
    let search = this.props.location.search.replace(/^\?/, '');
    let query = qs.parse(search);
    let params = {
      courseId: query.id,
      system: query.mode,
      userId: query.userId
    } as any;

    api.distributie.getPlaybill(params).then(({ data }) => {
      this.setState({
        dataInfo: data.resultData
      });
    });
  }

  canvasImg() {
    let _self = this;
    let content_html: any = document.getElementById('sharePage'); //要转化的div
    let width = content_html.clientWidth;
    let height = content_html.offsetHeight;
    let offsetTop = content_html.offsetTop;
    let canvas = document.createElement('canvas');
    let context: any = canvas.getContext('2d');
    let scaleBy = Math.ceil(window.devicePixelRatio);

    canvas.width = width * scaleBy;
    canvas.height = (+height + +offsetTop) * scaleBy;
    context.scale(scaleBy, scaleBy);
    var opts = {
      useCORS: true,
      allowTaint: false, //允许加载跨域的图片
      tainttest: true, //检测每张图片都已经加载完成
      scale: scaleBy, // 添加的scale 参数
      canvas: canvas, //自定义 canvas
      logging: false, //日志开关，发布的时候记得改成false
      width: width, //dom 原始宽度
      height: height //dom 原始高度
    };
    html2canvas(content_html, opts).then(function(canvas) {
      canvas.setAttribute('crossOrigin', 'anonymous');
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      _self.state.shareUrl = canvas.toDataURL();

      if (_self.state.shareUrl) {
        _self.state.isShowImg = true;
        _self.forceUpdate();
      }
    });
  }

  formatPrice(price: string): string {
    return Number(+price / 100).toFixed(0);
  }

  render() {
    let { dataInfo, isShowImg, shareUrl } = this.state;

    return (
      <div className="container">
        {isShowImg ? (
          <img className={styles['p-shareImg']} src={shareUrl} alt="" />
        ) : (
          <div className={styles['p-sharePageGsw']} id="sharePage">
            <div className={styles['p-sharePageGsw-header']}>
              <img
                className={styles['-header-left']}
                src={dataInfo.headimgurl}
                alt=""
              />
              <div className={styles['-header-right']}>
                <p className={styles['-name']}>{dataInfo.nickName}</p>
                <p className={styles['-text']}>听了一个很棒的课程，推荐给你</p>
              </div>
            </div>
            <div className={styles['p-sharePageGsw-content']}>
              <img className={styles['-content-top']} src={bgImg} alt="" />
              <div className={styles['-content-down']}>
                <div className={styles['-content-down-left']}>
                  <div className={styles['-left-one']}>
                    <p className={styles['-price']}>
                      ¥{this.formatPrice(dataInfo.ddgPrice)}
                    </p>
                    <div className={styles['-btn']}>限时抢报</div>
                  </div>
                  <div className={styles['-left-two']}>
                    即将恢复原价{this.formatPrice(dataInfo.ptPrice)}元
                  </div>
                  <div className={styles['-left-three']}>
                    150节精品课永久有效
                  </div>
                  <div className={styles['-left-four']}>
                    长按识别二维码立即报名
                  </div>
                </div>
                <div className={styles['-content-down-right']}>
                  <img
                    className={styles['-right-img']}
                    src={dataInfo.playbillQrUrl}
                    onLoad={this.canvasImg.bind(this)}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className={styles['p-sharePageGsw-footer']}>
              <p>1、长按上方图片保存至手机相册</p>
              <p>2、将图片发送给好友或发送到朋友圈</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  componentWillUnmount() {}
}
