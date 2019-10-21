import React, { Component } from 'react';
import { Picker, Toast } from 'antd-mobile';
import { Input } from '../component';
import api from '@/request/api';
import { checkPhone } from '@/utils';
import styles from '../styles/index.module.scss';
import areaList, { areaData } from '../../../utils/areas';

interface Props {
  history: any;
}

interface State {}

class Join extends Component<Props, State> {
  state = {
    form: {
      userName: '',
      phone: '',
      code: '',
      occupate: ''
    },
    downTime: 0,
    pickerLabel: [],
    pickerValue: []
  };

  componentDidMount() {
    document.title = '加盟商申请';
  }

  postApplyFranchisee() {
    /**
     * 提交加盟申请
     */

    let { pickerValue, pickerLabel } = this.state;
    api.distributie
      .applyFranchisee({
        ...this.state.form,
        cityId: pickerValue[1],
        city: pickerLabel[1],
        province: pickerLabel[0],
        provinceId: pickerValue[1]
      })
      .then(({ data }) => {
        Toast.hide();
        this.props.history.push('/result');
      })
      .catch(() => {
        setTimeout(() => {
          Toast.hide();
        }, 3000);
      });
  }

  bindClickSubmit = () => {
    let { userName, phone, code, occupate } = this.state.form;
    let { pickerValue } = this.state;
    if (!userName) {
      Toast.info('请填写姓名！');
      return;
    }
    if (!checkPhone(phone)) {
      Toast.info('请填写正确的手机号！');
      return;
    }
    if (!code) {
      Toast.info('请填写验证码！');
      return;
    }
    if (!pickerValue.length) {
      Toast.info('请选择所在城市！');
      return;
    }
    if (!occupate) {
      Toast.info('请填写职业！');
      return;
    }
    Toast.loading('提交中...', 0);
    this.postApplyFranchisee();
  };

  bindClickPickerOk = (v: string[]) => {
    this.setState({
      pickerValue: v,
      pickerLabel: this.getFormatPicker(v)
    });
  };

  bindclickSendCode = () => {
    let { phone } = this.state.form;
    if (!checkPhone(phone)) {
      Toast.info('请填写正确的手机号！');
      return;
    }
    this.sendCode();
  };
  /**
   * @author hujinhui
   * @description 发送验证码
   * @memberof Join
   */
  sendCode() {
    let { phone } = this.state.form;
    api.user
      .sendCode({
        phone
      })
      .then(() => {
        Toast.info('验证码发送成功！');
        this.setState(
          {
            downTime: 60
          },
          () => {
            this.startDownTime();
          }
        );
      });
  }
  /**
   * @author hujinhui
   * @description 开始验证码倒计时
   * @memberof Join
   */
  startDownTime() {
    let { downTime } = this.state;
    if (downTime <= 1) {
      this.setState({
        downTime: 0
      });
    } else {
      setTimeout(() => {
        this.setState({
          downTime: this.state.downTime - 1
        });
        this.startDownTime();
      }, 1000);
    }
  }

  /**
   * @author hujinhui
   * @description 传递给input组件修改form想对应属性值
   * @param event React.ChangeEvent<HTMLInputElement>
   * @param name state.form 里面含有的 key
   * @memberof Join
   */
  onInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: event.target.value
      }
    });
  };

  onClickClose = (name: string) => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: ''
      }
    });
  };
  /**
   * @author hujinhui
   * @description 格式化省市选择器选中的值
   * @param {string[]} v
   * @returns
   * @memberof Join
   */
  getFormatPicker(v: string[]) {
    let province = v[0];
    let city = v[1];
    let formatProvince = areaData[province];
    let formatCity = formatProvince.cities[city];
    return [formatProvince.name, formatCity.name];
  }

  render() {
    let { bindClickPickerOk } = this;
    let { pickerLabel, pickerValue, downTime } = this.state;
    let { userName, phone, code, occupate } = this.state.form;
    return (
      <div className={styles.container}>
        <div className={`${styles.input} hk-hairline--bottom`}>
          <Input
            label="姓名"
            name="userName"
            value={userName}
            placeholder="请输入申请人姓名"
            onChange={this.onInputChange}
            onClose={this.onClickClose}
          ></Input>
        </div>
        <div className={`${styles.input} hk-hairline--bottom`}>
          <Input
            label="手机号"
            name="phone"
            type="phone"
            value={phone}
            placeholder="请输入手机号"
            onChange={this.onInputChange}
            onClose={this.onClickClose}
          ></Input>
        </div>
        <div className={`${styles.input} hk-hairline--bottom`}>
          <Input
            label="验证码"
            name="code"
            value={code}
            placeholder="请输入验证码"
            onChange={this.onInputChange}
          ></Input>
          <button
            disabled={!!downTime}
            className={`${styles.codeBtn}`}
            onClick={this.bindclickSendCode}
          >
            {downTime ? `${downTime}秒后重新获取` : '获取验证码'}
          </button>
        </div>
        <Picker
          title="选择地区"
          extra="请选择(可选)"
          data={areaList}
          value={pickerValue}
          onChange={v => this.setState({ pickerValue: v })}
          onOk={v => {
            bindClickPickerOk(v);
          }}
        >
          <div className={`hk-hairline--bottom ${styles.item}`}>
            <p>所在城市：</p>
            <span className={`${pickerLabel.length ? styles.area : ''}`}>
              {pickerLabel.length ? pickerLabel.join('/') : '请选择'}
            </span>
            <i></i>
          </div>
        </Picker>

        <div className={`${styles.input} hk-hairline--bottom`}>
          <Input
            label="职业"
            name="occupate"
            value={occupate}
            placeholder="请输入申请人职业"
            onChange={this.onInputChange}
            onClose={this.onClickClose}
          ></Input>
          <span className={styles.msg}>如：微商、老师、培训机构负责人等</span>
        </div>
        <div className={styles.btn} onClick={this.bindClickSubmit}>
          成为加盟商
        </div>
      </div>
    );
  }
}

export default Join;
