import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Picker, List } from 'antd-mobile';
import { Input } from '../component';
import styles from '../styles/index.module.scss';
import { components } from '../../Home';
import areaList from '../../../utils/areas';

const { Title } = components;

interface State {}

class Join extends Component<{}, State> {
  state = {
    name: '',
    phone: '',
    code: '',
    city: '',
    zhiye: '',
    pickerValue: []
  };

  onInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    this.setState({
      [name]: event.target.value
    });
  };

  onClickClose = (name: string) => {
    this.setState({
      [name]: ''
    });
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={`${styles.input} hk-hairline--bottom`}>
          <Input
            label="姓名"
            name="name"
            value={this.state.name}
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
            value={this.state.phone}
            placeholder="请输入手机号"
            onChange={this.onInputChange}
            onClose={this.onClickClose}
          ></Input>
        </div>
        <div className={`${styles.input} hk-hairline--bottom`}>
          <Input
            label="验证码"
            name="code"
            value={this.state.code}
            placeholder="请输入验证码"
            onChange={this.onInputChange}
          ></Input>
          <button className={styles.codeBtn}>获取验证码</button>
        </div>
        <Picker
          title="选择地区"
          extra="请选择(可选)"
          data={areaList}
          value={this.state.pickerValue}
          onChange={v => this.setState({ pickerValue: v })}
          onOk={v => this.setState({ pickerValue: v })}
        >
          <div className={`hk-hairline--bottom ${styles.item}`}>
            <p>所在城市：</p>
            <span>请选择</span>
            <i></i>
          </div>
        </Picker>

        <div className={`${styles.input} hk-hairline--bottom`}>
          <Input
            label="职业"
            name="zhiye"
            value={this.state.zhiye}
            placeholder="请输入申请人职业"
            onChange={this.onInputChange}
            onClose={this.onClickClose}
          ></Input>
          <span className={styles.msg}>如：微商、老师、培训机构负责人等</span>
        </div>
        <div className={styles.btn}>成为加盟商</div>
      </div>
    );
  }
}

export default Join;
