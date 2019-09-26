import React from 'react';
import styles from './index.module.scss';

enum Status {
  UNDEFINED, //(0,"未知"),
  BOLCKING = 1, //(1,"冻结中"),
  REFUNED = 5, // (5,"已退款"),
  FINISH = 10 // (10,"已完成"),
}
interface Props {
  date: string;
  title: string;
  price: string;
  type: number;
}

const Item: React.FC<Props> = ({ date, title, price, type }) => {
  return (
    <div
      className={`${styles.item} ${type === Status.REFUNED && styles.disabled}`}
    >
      <p className={styles.date}>{date}</p>
      <p className={styles.name}>{title}</p>
      <p
        className={`${styles.price} ${type === Status.FINISH &&
          styles.success}`}
      >
        {type === Status.BOLCKING ? (
          <i className={styles.icon}></i>
        ) : type === Status.FINISH ? (
          '+'
        ) : (
          ''
        )}
        {price}
      </p>
    </div>
  );
};

export default Item;
