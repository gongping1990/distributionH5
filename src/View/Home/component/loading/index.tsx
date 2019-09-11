import React from 'react';
import styles from './index.module.scss';

const Loading: React.FC = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.loader}>
        <div className={styles.outer}></div>
        <div className={styles.middle}></div>
        <div className={styles.inner}></div>
      </div>
    </div>
  );
};

export default Loading;
