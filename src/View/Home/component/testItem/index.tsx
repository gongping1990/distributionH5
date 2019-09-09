import React from 'react';
import styles from './index.module.scss';

interface Props {}

const Test: React.FC<Props> = () => {
  return (
    <div className={styles.test}>
      <img className={styles.icon} src="" alt="" />
      <div className={styles.text}>
        <p className={styles.title}>邀请5位好友点开课程链接</p>
        <span className={styles.msg}>奖励2元</span>
      </div>
      <div className={styles.right}>
        <button className={styles.btn}>去邀请</button>
        <span className={styles.progress}>完成4/5</span>
      </div>
    </div>
  );
};

export default Test;
