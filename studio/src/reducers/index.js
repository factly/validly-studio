import { combineReducers } from 'redux';
import settings from './settings';
import sidebar from './sidebar';
import validly from './validly';
import metafacts from './metafacts';
export default combineReducers({
  metafacts,
  settings,
  sidebar,
  validly,
});
