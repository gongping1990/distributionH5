import React, { Component } from 'react';
import styles from '../styles/index.module.scss';
import img1 from '../../../assets/images/discount/error-icon.png';
import html2canvas from 'html2canvas';

export default class DiscountResult extends Component<{}> {
  state = {
    isShowImg: false,
    shareUrl: '',
    dataInfo: {
      headimgurl: 'https://pub.file.k12.vip/2019/09/10/1171235902187249666.jpg',
      qrUrl: 'https://pub.file.k12.vip/2019/09/10/1171327699295019010.jpg'
    }
  };

  componentDidMount() {
    // this.canvasImg();
  }

  // canvasImg() {
  //   let _self = this;
  //   let content_html:HTMLDivElement = document.getElementById('sharePage');　//要转化的div
  //   console.log(content_html,111)
  //   let width = content_html.clientWidth;
  //   let height = content_html.offsetHeight;
  //   let offsetTop = content_html.offsetTop;
  //   let canvas = document.createElement("canvas");
  //   let context = canvas.getContext("2d");
  //   let scaleBy = Math.ceil(window.devicePixelRatio);
  //
  //   canvas.width = width * scaleBy;
  //   canvas.height = (+height + (+offsetTop)) * scaleBy;
  //   context.scale(scaleBy, scaleBy);
  //   var opts = {
  //     useCORS: true,
  //     allowTaint: false,//允许加载跨域的图片
  //     tainttest: true, //检测每张图片都已经加载完成
  //     scale: scaleBy, // 添加的scale 参数
  //     canvas: canvas, //自定义 canvas
  //     logging: false, //日志开关，发布的时候记得改成false
  //     width: width, //dom 原始宽度
  //     height: height //dom 原始高度
  //   };
  //   html2canvas(content_html, opts).then(function(canvas) {
  //     canvas.setAttribute("crossOrigin", "anonymous");
  //     canvas.style.width = width + "px";
  //     canvas.style.height = height + "px";
  //
  //     _self.state.shareUrl = canvas.toDataURL();
  //
  //     if (_self.state.shareUrl) {
  //       _self.state.isShowImg = true;
  //     }
  //   });
  // };

  render() {
    let { dataInfo, isShowImg, shareUrl } = this.state;

    return (
      <div className="container">
        {isShowImg ? (
          <img className={styles['p-sharePageGsw-shareImg']} src={shareUrl} />
        ) : (
          <div className={styles['p-sharePageGsw']} id="sharePage">
            <div className={styles['p-sharePageGsw-header']}>
              <img
                className={styles['-header-left']}
                src={dataInfo.headimgurl}
              />
              <div className={styles['-header-right']}>
                <p className={styles['-name']}>最美的期待</p>
                <p className={styles['-text']}>听了一个很棒的课程，推荐给你</p>
              </div>
            </div>
            <div className={styles['p-sharePageGsw-content']}>
              <div className={styles['-content-top']}></div>
              <div className={styles['-content-down']}>
                <div className={styles['-content-down-left']}>
                  <div className={styles['-left-one']}>
                    <p className={styles['-price']}>¥199</p>
                    <div className={styles['-btn']}>限时抢报名</div>
                  </div>
                  <div className={styles['-left-two']}>即将恢复原价699元</div>
                  <div className={styles['-left-three']}>
                    150节精品课永久有效
                  </div>
                  <div className={styles['-left-four']}>
                    长按识别二维码立即报名
                  </div>
                </div>
                <div className={styles['-content-down-right']}>
                  <img className={styles['-right-img']} src={dataInfo.qrUrl} />
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
}
