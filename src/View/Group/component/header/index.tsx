import React from 'react';
import styles from './index.module.scss';

interface Props {}

const Tab: React.FC<Props> = () => {
  return (
    <div className={styles.header}>
      <img className={styles.cover} src="" alt="" />
      <div className={styles.content}>
        <div className={styles.info}>
          <p className={styles.title}>小语轻作文</p>
          <span className={styles.text}>150节正课+150节复习课</span>
        </div>
        <div className={styles.price}>
          <p>
            <i>¥</i>0<span>（团长）</span>
            <s>¥699</s>
          </p>
          <span>
            <i>1269</i>
            人已学习
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tab;
