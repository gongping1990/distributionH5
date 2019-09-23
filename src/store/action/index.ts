import { UPDATE_USERINFO } from './types';

export function updateUserInfo(payload: object) {
  return {
    type: UPDATE_USERINFO,
    payload
  };
}
