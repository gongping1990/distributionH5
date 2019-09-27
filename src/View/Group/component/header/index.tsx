import React from 'react';
import styles from './index.module.scss';

interface Props {
  alonePrice: number;
  buyCount: number;
  coverphoto: string;
  desc: string;
  groupPrice: number;
  id: string;
  name: string;
}

const Tab: React.FC<Props> = ({
  buyCount,
  alonePrice,
  coverphoto,
  desc,
  groupPrice,
  name
}) => {
  return (
    <div className={styles.header}>
      <img className={styles.cover} src={coverphoto} alt="" />
      <div className={styles.content}>
        <div className={styles.info}>
          <p className={styles.title}>{name}</p>
          <span className={styles.text}>{desc}</span>
        </div>
        <div className={styles.price}>
          <p>
            <i>¥</i>0<span>（团长）</span>
            <s>¥{groupPrice}</s>
          </p>
          <span>
            <i>{buyCount}</i>
            人已学习
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tab;
