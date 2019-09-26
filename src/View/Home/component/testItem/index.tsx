import React from 'react';
import styles from './index.module.scss';

interface Props {
  icon: string;
  title: string;
  msg: string;
  process: number;
  total: number;
  price: number;
  onClick(): void;
  index: number;
}

const Test: React.FC<Props> = ({
  icon,
  title,
  msg,
  process,
  total,
  price,
  onClick
}) => {
  return (
    <div className={styles.test}>
      <img className={styles.icon} src={icon} alt="" />
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        <span className={styles.msg}>
          {msg}
          <i>{price}元</i>
        </span>
      </div>
      <div className={styles.right}>
        <button
          className={`${styles.btn} ${total === process && styles.disabled}`}
          disabled={total === process}
          onClick={() => {
            onClick();
          }}
        >
          {total === process ? '已完成' : '去邀请'}
        </button>
        <span className={styles.progress}>
          完成<i>{process}</i>/{total}
        </span>
      </div>
    </div>
  );
};

export default Test;
