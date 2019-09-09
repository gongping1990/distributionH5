import React from 'react';
import styles from './index.module.scss';

interface Props {
  onClick(index: number): void;
  date: string;
  title?: string;
}

const Item: React.FC<Props> = ({ onClick: clickTabItem, date, title }) => {
  return (
    <div className={styles.item}>
      <p className={styles.title}></p>
    </div>
  );
};

export default Item;
