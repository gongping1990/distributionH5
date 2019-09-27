import React from 'react';
import { IOrder } from '../../type/home.type';
import styles from './index.module.scss';

interface Props {
  onClick(id: number, type: number, mode: any): void;
  showMask: boolean;
}

const Course: React.FC<Props & IOrder> = ({
  verticalCover,
  courseName,
  courseId,
  aloneEarnPrice,
  onClick,
  system,
  discernCode,
  showMask = false
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
        <div className={`${styles.footer} ${showMask && styles.mask}`}>
          {showMask && (
            <div className={styles['mask-content']}>
              <p>点击这里，即可邀请好友，赚取收益</p>
              <i></i>
            </div>
          )}
          <p
            className={styles.yq}
            onClick={() => {
              onClick(courseId, 0, discernCode);
            }}
          >
            <i></i>直接邀请
          </p>
          <button
            className={styles.subBtn}
            onClick={() => {
              onClick(courseId, 1, discernCode);
            }}
          >
            开团邀请
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              onClick(courseId, 2, discernCode);
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
