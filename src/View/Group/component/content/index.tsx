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
  reaminGroupCount,
  onClick
}) => {
  let tiem = new Date().getTime();
  let endDate = new Date(Number(endTime)).getTime();
  let end = tiem >= endDate;
  let error = groupOrderStatus === 20;
  let hasVatural = groupOrders.filter(e => {
    return e.vatural;
  });

  return (
    <div className={styles.content}>
      {!end && groupOrderStatus === 1 && (
        <p className={styles.date}>
          还剩
          <i>{downTime}</i>
          结束
        </p>
      )}
      {(groupOrderStatus === 20 || groupOrderStatus === 10) && (
        <p className={styles.title}>{error ? '拼团失败' : '拼团已满'}</p>
      )}
      {!end && groupOrderStatus === 1 ? (
        <p className={styles.subtitle}>
          仅差
          <i>{reaminGroupCount}人</i>
          ，赶快邀请好友拼团吧
        </p>
      ) : (
        <p className={styles.subtitle}>
          {error
            ? '很遗憾并没有拼团成功，重新开团试试吧~'
            : '拼团已完成，您可以重新开团'}
        </p>
      )}
      <div className={styles.list}>
        <div className={styles.item}>
          <img src={headimgurl} alt="" />
          <i className={styles.tag}>团长</i>
        </div>
        {groupOrders.map((item, i) => {
          return (
            <div className={styles.item} key={i}>
              <img src={item.id ? item.headimgurl : avatarImg} alt="" />
              {item.vatural && <i className={styles.tag1}>匿名</i>}
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
            onClick(1);
          }}
        >
          重新开团
        </div>
      )}
      {hasVatural.length ? (
        <div className={styles.msg}>
          <span>注：匿名用户为系统在拼团截止时自动邀请加入该团的用户，</span>
          <span>并非您所邀请，因此您无法获得匿名用户购课的佣金。</span>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Item;
