import { combineReducers } from 'redux';
import settings from './settings';
import sidebar from './sidebar';
import validly from './validly';
import metafacts from './metafacts';
import metafactsValidly from './metafactsvalidly';
export default combineReducers({
  metafactsValidly,
  metafacts,
  settings,
  sidebar,
  validly,
});
