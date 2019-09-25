export interface IOrder {
  headimgurl: string;
  id: string;
  nickName: string;
  userId: string;
  vatural: boolean;
}

export interface ICourse {
  alonePrice: number;
  buyCount: number;
  coverphoto: string;
  desc: string;
  groupPrice: number;
  id: string;
  name: string;
}

export interface IWeixin {
  title: string;
  doc: string;
  url: string;
  img: string;
}
