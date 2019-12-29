import {
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  AVATAR_CHANGED,
  CELL_NUMBER_CHANGED,
  USER_CREATED_FAILED,
  USER_CREATED_SUCCESS,
  LOAD_SPINNER
} from '../actions/userConstants';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  avatar: '',
  cellNumber: '',
  auth_token: '',
  errorFlag: false,
  spinner: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FIRST_NAME_CHANGED:
      return { ...state, firstName: action.payload };
    case LAST_NAME_CHANGED:
      return { ...state, lastName: action.payload };
    case AVATAR_CHANGED:
      return { ...state, avatar: action.payload };
    case CELL_NUMBER_CHANGED:
      return { ...state, cellNumber: action.payload };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case USER_CREATED_FAILED:
      return { ...state, errorFlag: true, password: '', spinner: false };
    case USER_CREATED_SUCCESS:
      return { ...state, ...action.payload, spinner: false };
    case LOAD_SPINNER:
      return { ...state, spinner: true };
    default:
      return state;
  }
};