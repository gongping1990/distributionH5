import React from 'react';
import styles from './index.module.scss';

interface Props {}

const Course: React.FC<Props> = () => {
  return (
    <div className={styles.course}>
      <img className={styles.cover} src="" alt="" />
      <div className={styles.content}>
        <div className={styles.info}>
          <p className={styles.title}>邀请5位好友点开课程链接</p>
          <span className={styles.msg}>奖励2元</span>
        </div>
        <div className={styles.footer}>
          <p className={styles.yq}>
            <i></i>直接邀请
          </p>
          <button className={styles.subBtn}>开团邀请</button>
          <button className={styles.btn}>海报邀请</button>
        </div>
      </div>
    </div>
  );
};

export default Course;
