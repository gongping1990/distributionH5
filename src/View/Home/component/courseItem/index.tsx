import React from 'react';
import { IOrder } from '../../type/home.type';
import styles from './index.module.scss';

interface Props {
  onClick(id: number, type: number): void;
}

const Course: React.FC<Props & IOrder> = ({
  verticalCover,
  courseName,
  courseId,
  aloneEarnPrice,
  onClick
}) => {
  return (
    <div className={styles.course}>
      <div className={styles.cover}>
        <img src={verticalCover} alt="" />
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <p className={styles.title}>{courseName}</p>
          <span className={styles.msg}>
            预计可赚最多<i>{aloneEarnPrice}元</i>
          </span>
        </div>
        <div className={styles.footer}>
          <p
            className={styles.yq}
            onClick={() => {
              onClick(courseId, 0);
            }}
          >
            <i></i>直接邀请
          </p>
          <button
            className={styles.subBtn}
            onClick={() => {
              onClick(courseId, 1);
            }}
          >
            开团邀请
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              onClick(courseId, 2);
            }}
          >
            海报邀请
          </button>
        </div>
      </div>
    </div>
  );
};

export default Course;
