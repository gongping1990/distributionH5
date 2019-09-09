import React from 'react';
import styles from './index.module.scss';

interface Props {
  icon: string;
  title: string;
  msg: string;
  process: number;
  total: number;
}

const Test: React.FC<Props> = ({ icon, title, msg, process, total }) => {
  return (
    <div className={styles.test}>
      <img className={styles.icon} src={icon} alt="" />
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        <span className={styles.msg}>{msg}</span>
      </div>
      <div className={styles.right}>
        <button className={styles.btn}>去邀请</button>
        <span className={styles.progress}>{`完成${process}/${total}`}</span>
      </div>
    </div>
  );
};

export default Test;
