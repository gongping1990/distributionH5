import React from 'react';
import styles from './index.module.scss';

const Title: React.FC = props => {
  return <div className={styles.title}>{props.children}</div>;
};

export default Title;
