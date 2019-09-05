import React, { Component } from 'react';
import styles from '../styles/index.module.scss';

interface State {}

export default class index extends Component<{}, State> {
  state = {};

  render() {
    return <div className={styles.container}></div>;
  }
}
