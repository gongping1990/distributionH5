/* eslint-disable */
//微信公众平台相关组件以及方法
//针对微信JS-SDK扩展
//基于微信JS-SDK——1.4.0
class WechatExt {
  constructor() {
    //debug——修改为true可开启微信调试模式
    this.debug = false;
    //consoleDebug——命令行调试打印
    this.consoleDebug = true;
    this.isReady = false;
    this.registerData = {};
    this.apiList = [];
    this.ignorePaths = [];
  }

  //检查是否需要单独配置微信
  //需在对象初始化时配置忽略列表（RouteName）
  ignore(path) {
    const ignore = `,${this.ignorePaths.join(',')},`;
    const singal = ~ignore.indexOf(`,${path},`) ? true : false;
    if (singal) {
      console.log('wx子组件单独配置');
    }
    return singal;
  }

  //微信初始化配置数据
  config(params, apiList) {
    this.registerData = {
      appId: params.appid,
      timestamp: params.timestamp,
      nonceStr: params.noncestr,
      signature: params.signature
    };
    this.apiList = apiList;
  }

  //微信开始注册
  register(ready, error) {
    console.log('wechat register start!');
    const data = {
      debug: this.debug,
      ...this.registerData,
      jsApiList: this.apiList
    };
    if (window.wx) {
      // eslint-disable-next-line no-undef
      wx.config(data);
      //微信注册完毕事件
      // eslint-disable-next-line no-undef
      wx.ready(() => {
        this.isReady = true;
        console.log('wechat jssdk ready!');
        ready && ready();
      });
      //微信注册失败事件
      // eslint-disable-next-line no-undef
      wx.error(res => {
        console.log('wechat jssdk register error!');
        console.log(res);
        error && error(res);
      });
    }
  }

  //配置微信录音
  // 开始录音
  startRecordConfig(success, error) {
    if (!this.isReady) {
      console.log('wechat is not ready');
      return;
    }
    if (!window.wx) {
      console.log('wechat js-sdk inspect error');
      return;
    }

    // eslint-disable-next-line no-undef
    wx.startRecord({
      success: function(res) {
        success && success(res);
      },
      fail: function(res) {
        error && error(res);
      }
    });
  }

  // 结束录音
  stopRecordConfig(success, error) {
    if (!this.isReady) {
      console.log('wechat is not ready');
      return;
    }
    if (!window.wx) {
      console.log('wechat js-sdk inspect error');
      return;
    }

    // eslint-disable-next-line no-undef
    wx.stopRecord({
      success: function(res) {
        success && success(res);
      },
      fail: function(res) {
        error && error(res);
      }
    });
  }

  // 录音时间超过一分钟没有停止的时候会执行 complete 回调
  onVoiceRecordEndConfig(success) {
    if (!this.isReady) {
      console.log('wechat is not ready');
      return;
    }
    if (!window.wx) {
      console.log('wechat js-sdk inspect error');
      return;
    }

    // eslint-disable-next-line no-undef
    wx.onVoiceRecordEnd({
      complete: function(res) {
        success(res);
      }
    });
  }

  // 播放录音
  playVoiceConfig(params) {
    if (!this.isReady) {
      console.log('wechat is not ready');
      return;
    }
    if (!window.wx) {
      console.log('wechat js-sdk inspect error');
      return;
    }

    // eslint-disable-next-line no-undef
    wx.playVoice({
      localId: params // 需要播放的音频的本地ID，由stopRecord接口获得
    });
  }

  // 暂停
  pauseVoiceConfig(params) {
    if (!this.isReady) {
      console.log('wechat is not ready');
      return;
    }
    if (!window.wx) {
      console.log('wechat js-sdk inspect error');
      return;
    }

    // eslint-disable-next-line no-undef
    wx.pauseVoice({
      localId: params // 需要播放的音频的本地ID，由stopRecord接口获得
    });
  }

  // 停止播放
  stopVoiceConfig(params) {
    if (!this.isReady) {
      console.log('wechat is not ready');
      return;
    }
    if (!window.wx) {
      console.log('wechat js-sdk inspect error');
      return;
    }

    // eslint-disable-next-line no-undef
    wx.stopVoice({
      localId: params // 需要播放的音频的本地ID，由stopRecord接口获得
    });
  }

  // 播放录音完毕
  onVoicePlayEndConfig(success) {
    if (!this.isReady) {
      console.log('wechat is not ready');
      return;
    }
    if (!window.wx) {
      console.log('wechat js-sdk inspect error');
      return;
    }

    // eslint-disable-next-line no-undef
    wx.onVoicePlayEnd({
      success: function(res) {
        success(res);
      }
    });
  }

  // 上传录音
  uploadVoiceConfig(data, success, error) {
    if (!this.isReady) {
      console.log('wechat is not ready');
      return;
    }
    if (!window.wx) {
      console.log('wechat js-sdk inspect error');
      return;
    }

    // eslint-disable-next-line no-undef
    wx.uploadVoice({
      localId: data, // 需要上传的音频的本地ID，由stopRecord接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: function(res) {
        success && success(res);
      },
      fail: function(res) {
        error && error(res);
      }
    });
  }

  //配置微信分享
  shareConfig(title, desc, link, imgUrl, success) {
    console.log({
      title,
      desc,
      link,
      imgUrl
    });
    if (!this.isReady) {
      console.log('wechat is not ready');
      return;
    }
    if (!window.wx) {
      console.log('wechat js-sdk inspect error');
      return;
    }

    // alert(link)

    // 新api，以下老api废弃后取消即可
    // eslint-disable-next-line no-undef
    wx.onMenuShareAppMessage({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      success: () => {
        // alert('share friends success!');
        // alert(desc)
        if (
          desc !=
          '【每日一首古诗诗词】每天5-8分钟，听故事学古诗词，75天学透75首古诗词。'
        ) {
          success && success();
        }
      },
      cancel: function() {
        // alert('已取消');
      },
      fail: function() {
        // alert(JSON.stringify(res));
      }
    });
    // eslint-disable-next-line no-undef
    // wx.onMenuShareAppMessage({
    //   title: title,
    //   desc: desc,
    //   link: link,
    //   imgUrl: imgUrl,
    //   success: () => {
    //     // alert('share friends success!');
    //   },
    //   cancel: function() {
    //     // alert('已取消');
    //   },
    //   fail: function() {
    //     // alert(JSON.stringify(res));
    //   }
    // });

    //新api，以下老api废弃后取消即可
    // wx.updateTimelineShareData(
    // 	{
    // 		title: title,
    // 		link: link,
    // 		imgUrl: imgUrl
    // 	},
    // 	res => {
    // 		console.log('share timeline success!');
    // 	}
    // );
    // eslint-disable-next-line no-undef
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl,
      success: () => {
        success && success();
        console.log('share timeline success!');
      }
    });
  }

  //微信支付
  //支付数据（注意校对对应key是否正确）
  //success 支付成功回调
  //error 支付失败，0——支付失败；1——用户取消支付
  startPay(data, success, error) {
    if (!window.wx) {
      console.log('wechat js-sdk inspect error');
      return;
    }
    if (!this.isReady) {
      console.log('wechat is not ready');
      alert('微信支付准备失败，请刷新页面重试');
      return;
    }
    // eslint-disable-next-line no-undef
    wx.chooseWXPay({
      timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
      package: data.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
      signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: data.paySign, // 支付签名
      success: () => {
        console.log('pay success');
        success && success();
      },
      fail: () => {
        console.log('pay error');
        error && error(0);
      },
      cancel: () => {
        console.log('cancel pay');
        error && error(1);
      }
    });
  }
}

export default new WechatExt();
