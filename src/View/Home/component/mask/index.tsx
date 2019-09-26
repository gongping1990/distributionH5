import React from 'react';
import styles from './index.module.scss';

interface Props {
  onClick(): void;
  show: boolean;
}

const Title: React.FC<Props> = ({ onClick, show }) => {
  return (
    <div
      className={`${styles.mask} ${show && styles.show}`}
      onClick={() => {
        onClick();
      }}
    >
      {show && (
        <div className={styles.maskContent}>
          <i></i>
          <p>
            1.点击右上角分享按钮
            <br />
            2.发送给朋友或分享到朋友圈
          </p>
          <p>
            严禁发送到任何小语轻作文、
            <br />
            每日一首古诗词的微信群。
          </p>
          <span>（如有发现将永久取消推广资格）</span>
        </div>
      )}
    </div>
  );
};

export default Title;
