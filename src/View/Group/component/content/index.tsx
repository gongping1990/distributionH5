import React from 'react';
import styles from './index.module.scss';
import avatarImg from '../../../../assets/images/group/avatar.png';
interface Props {}

const Item: React.FC<Props> = () => {
  return (
    <div className={styles.content}>
      {/* <p className={styles.date}>
        还剩
        <i>23 : 59 : 56</i>
        结束
      </p> */}
      <p className={styles.title}>拼团成功</p>
      <p className={styles.subtitle}>
        仅差
        <i>1人</i>
        ，赶快邀请好友拼团吧
      </p>
      <div className={styles.list}>
        <div className={styles.item}>
          <img src={avatarImg} alt="" />
          <i className={styles.tag}>团长</i>
        </div>
        <div className={styles.item}>
          <img src={avatarImg} alt="" />
        </div>
      </div>
      <div className={styles.subBtn}>查看收益</div>
      {/* <div className={styles.btn}>邀请好友拼团</div> */}
      <div className={styles.msg}>
        <span>注：匿名用户为系统在拼团截止时自动邀请加入该团的用户，</span>
        <span>并非您所邀请，因此您无法获得匿名用户购课的佣金。</span>
      </div>
    </div>
  );
};

export default Item;
