import { PATH } from '../environment'


export const emailChanged = (email) => {
  return {
    type: 'EMAIL_CHANGED',
    payload: email
  };
};

export const passwordChanged = (password) => {
  return {
    type: 'PASSWORD_CHANGED',
    payload: password
  };
};

export const loginUser = ({email, password}) => {
  return (dispatch) => {
    dispatch({
      type: 'LOAD_SPINNER'
    });
    fetch(`http://${PATH}:3000/users/sign_in.json`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          email,
          password
        }
      })
    }).then((response) => {
      // console.log(response);
      if (response.status === 401) {
        // console.log('AUTHENTICATION ERROR!!');
        alert("Account not found.")
        dispatch({
          type: 'LOGIN_FAILED'
        })
      } else {
        // console.log('SUCCESS!!');
        response.json().then(data => {
          console.log('id found');
          dispatch({
            type: 'LOGIN_USER_SUCCESS',
            payload: data
          });
        });
      }
    });
  }
};

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER_SUCCESS'
  };
};
