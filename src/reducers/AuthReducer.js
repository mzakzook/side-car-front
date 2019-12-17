const INITIAL_STATE = {
  email: '',
  password: '',
  auth_token: '',
  errorFlag: false,
  spinner: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'EMAIL_CHANGED':
      return { ...state, email: action.payload };
    case 'PASSWORD_CHANGED':
      return { ...state, password: action.payload };
    case 'LOGIN_FAILED':
      return { ...state, errorFlag: true, password: '', spinner: false };
    case 'LOGIN_USER_SUCCESS':
      return { ...state, ...action.payload };
    case 'LOAD_SPINNER':
      return { ...state, spinner: true };
    case 'LOGOUT_USER_SUCCESS':
      return INITIAL_STATE;
    default:
      return state;
  }
};