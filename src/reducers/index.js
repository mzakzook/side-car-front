import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import NewUserReducer from './NewUserReducer';
import ProviderReducer from './ProviderReducer';


export default combineReducers({
  auth: AuthReducer,
  newUser: NewUserReducer,
  provider: ProviderReducer
});