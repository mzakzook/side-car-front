import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import NewUserReducer from './NewUserReducer';


export default combineReducers({
  auth: AuthReducer,
  newUser: NewUserReducer
});