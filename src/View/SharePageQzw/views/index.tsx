import React, { Component } from 'react';
import styles from '../styles/index.module.scss';
import html2canvas from 'html2canvas';

export default class SharePageQzw extends Component<{}> {
  state = {
    isShowImg: false,
    shareUrl: '',
    dataInfo: {
      headimgurl: 'https://pub.file.k12.vip/2019/09/10/1171235902187249666.jpg',
      qrUrl: 'https://pub.file.k12.vip/2019/09/10/1171327699295019010.jpg'
    }
  };

  componentDidMount() {
    this.canvasImg();
  }

  canvasImg() {
    let _self = this;
    let content_html: any = document.getElementById('sharePage'); //要转化的di
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

  render() {
    let { dataInfo, isShowImg, shareUrl } = this.state;

    return (
      <div className="container">
        {isShowImg ? (
          <img className={styles['p-shareImg']} src={shareUrl} alt="" />
        ) : (
          <div className={styles['p-sharePageQzw']} id="sharePage">
            <div className={styles['p-sharePageQzw-header']}>
              <img
                className={styles['-header-left']}
                src={dataInfo.headimgurl}
                alt=""
              />
              <div className={styles['-header-right']}>
                <p className={styles['-name']}>最美的期待</p>
                <p className={styles['-text']}>听了一个很棒的课程，推荐给你</p>
              </div>
            </div>
            <div className={styles['p-sharePageQzw-content']}>
              <div className={styles['-content-down']}>
                <div className={styles['-content-down-left']}>
                  <div className={styles['-left-one']}>
                    <p className={styles['-price']}>¥199</p>
                    <div className={styles['-btn']}>限时抢报</div>
                  </div>
                  <div className={styles['-left-two']}>即将恢复原价999元</div>
                  <div className={styles['-left-three']}>
                    300节精品课 永久有效
                  </div>
                </div>
                <div className={styles['-content-down-right']}>
                  <img
                    className={styles['-right-img']}
                    src={dataInfo.qrUrl}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
