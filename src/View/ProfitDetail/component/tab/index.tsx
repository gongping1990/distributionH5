import React from 'react';
import { Item } from './types';
import styles from './index.module.scss';

interface Props {
  onClick(index: number): void;
  itemList: Item[];
  active: number;
}

const Tab: React.FC<Props> = ({ onClick: clickTabItem, itemList, active }) => {
  return (
    <div className={styles.tab}>
      {itemList.map((e: Item, i) => {
        return (
          <div
            className={`${styles.item} ${e.id === active && styles.active}`}
            key={e.id}
            onClick={() => {
              clickTabItem(e.id);
            }}
          >
            {e.name}
          </div>
        );
      })}
    </div>
  );
};

export default Tab;
