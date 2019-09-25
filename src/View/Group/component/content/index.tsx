import React from 'react';
import { IOrder } from '../../type';
import styles from './index.module.scss';
import avatarImg from '../../../../assets/images/group/avatar.png';
interface Props {
  headimgurl: string;
  reaminGroupCount: number;
  downTime: string;
  endTime: string;
  groupOrderStatus: number;
  income: number;
  groupOrders: IOrder[];
  onClick(type: number): void;
}

const Item: React.FC<Props> = ({
  downTime = '',
  headimgurl,
  endTime,
  groupOrderStatus,
  groupOrders = [],
  income,
  onClick
}) => {
  let tiem = new Date().getTime();
  let endDate = new Date(Number(endTime)).getTime();
  let end = tiem >= endDate;
  let error = end && groupOrderStatus === 1;
  return (
    <div className={styles.content}>
      {!end && groupOrderStatus === 1 && (
        <p className={styles.date}>
          还剩
          <i>{downTime}</i>
          结束
        </p>
      )}
      {(end || groupOrderStatus === 10) && (
        <p className={styles.title}>{error ? '拼团失败' : '拼团成功'}</p>
      )}
      {!end && groupOrderStatus === 1 ? (
        <p className={styles.subtitle}>
          仅差
          <i>1人</i>
          ，赶快邀请好友拼团吧
        </p>
      ) : error ? (
        <p className={styles.subtitle}>很遗憾并没有拼团成功，重新开团试试吧~</p>
      ) : (
        <p className={styles.subtitle}>
          恭喜你新赚取了
          <i>{income / 100}</i>
          元收益
        </p>
      )}
      <div className={styles.list}>
        <div className={styles.item}>
          <img src={headimgurl} alt="" />
          <i className={styles.tag}>团长</i>
        </div>
        {groupOrders.map(item => {
          return (
            <div className={styles.item} key={item.id}>
              <img src={item.id ? item.headimgurl : avatarImg} alt="" />
            </div>
          );
        })}
      </div>
      {!end && groupOrderStatus === 1 ? (
        <div
          className={styles.btn}
          onClick={() => {
            onClick(0);
          }}
        >
          邀请好友拼团
        </div>
      ) : error ? (
        <div
          className={styles.btn}
          onClick={() => {
            onClick(1);
          }}
        >
          重新开团
        </div>
      ) : (
        <div
          className={styles.subBtn}
          onClick={() => {
            onClick(2);
          }}
        >
          查看收益
        </div>
      )}
      <div className={styles.msg}>
        <span>注：匿名用户为系统在拼团截止时自动邀请加入该团的用户，</span>
        <span>并非您所邀请，因此您无法获得匿名用户购课的佣金。</span>
      </div>
    </div>
  );
};

export default Item;
