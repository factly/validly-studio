import { combineReducers } from 'redux';
import settings from './settings';
import sidebar from './sidebar';
import validly from './validly';
export default combineReducers({
  settings,
  sidebar,
  validly,
});
