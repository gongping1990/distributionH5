import { UPDATE_USERINFO } from '@/store/action/types';

let user: string | null = window.localStorage.getItem('userInfo');
const initState = user ? JSON.parse(user) : {};

export default function userInfo(state = initState, action: any) {
  switch (action.type) {
    case UPDATE_USERINFO:
      let userInfo = { ...state, ...action.payload };
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
      return userInfo;
    default:
      return state;
  }
}
