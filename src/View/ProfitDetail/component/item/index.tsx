import React from 'react';
import styles from './index.module.scss';

interface Props {
  date: string;
  title: string;
  price: string;
}

const Item: React.FC<Props> = ({ date, title, price }) => {
  return (
    <div className={styles.item}>
      <p className={styles.date}>{date}</p>
      <p className={styles.name}>{title}</p>
      <p className={styles.price}>{price}</p>
    </div>
  );
};

export default Item;
