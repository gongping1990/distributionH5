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
  state = {};

  render() {
    return (
      <div className={styles.container}>
        <i className={styles.loader}></i>
        <p className={styles.title}>申请提交成功请耐心等待管理员审核！</p>
        <div className={styles.text}>
          <span>请关扫码注下方公众号</span>
          <span>审核结果会在第一时间推送通知您</span>
        </div>
        <div className={styles.btn}>成为加盟商</div>
      </div>
    );
  }
}

export default Join;
