import { combineReducers } from 'redux';
import userReducers from './user';

const reducers = combineReducers({
  user: userReducers
});

export default reducers;
