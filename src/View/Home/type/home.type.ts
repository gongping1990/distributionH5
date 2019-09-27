export interface ICenter {
  allBuy: number; // 邀请用户成功购课数量
  allClick: number; //邀请好友点开课程链接数量
  allIncome: number; //累积收益(分)
  allInvite: number; //累积邀请
  allOrder: number; //累积订单
  balance: number; // 账户余额(分)
  blockingAmount: number; //冻结金额(分)
  headimgurl: string; // 头像
  nickname: string; // 昵称
  orderList: IOrder[]; // 推广课程
}

export interface IOrder {
  aloneEarnPrice: number; // 单独购可赚金额
  alonePrice: number; // 单独购买价格
  courseId: number; // 课程Id
  courseName: string; // 课程名称
  coverphoto: string; //横版封面
  describe: string; //课程描述
  discernCode: string; //课程标识
  groupEarnPrice: number; //团购可赚金额
  groupPrice: number; // 组团购买价格
  orderUrl: string; //购买地址
  playbillQrUrl: string; //海报二维码地址
  system: number; //项目,可用值:0,1,2,3,4,5,6,7,8,9,10
  verticalCover: string; //竖版封面
  directQrcode: number;
  groupOrderInfo: any;
}

export interface IConfig {
  directQrcode: string;
  id: number;
  reviewQrcode: string;
  subQrcode: string;
  wechatId: string;
}
