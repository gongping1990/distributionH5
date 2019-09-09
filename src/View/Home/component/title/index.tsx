import React from 'react';
import styles from './index.module.scss';

interface Props {
  type?: number;
}

const Title: React.FC<Props> = ({ children, type = 0 }) => {
  return (
    <div className={`${styles.title} ${type && styles.tg}`}>{children}</div>
  );
};

export default Title;
