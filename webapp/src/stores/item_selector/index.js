import { combineReducers } from 'redux';
import status from './status';
import data from './data';
import idx from './idx';

export default combineReducers({
  status,
  data,
  idx
});