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



export const firstNameChanged = (firstName) => {
  return {
    type: FIRST_NAME_CHANGED,
    payload: firstName
  };
};

export const lastNameChanged = (lastName) => {
  return {
    type: LAST_NAME_CHANGED,
    payload: lastName
  };
};

export const avatarChanged = (avatar) => {
  return {
    type: AVATAR_CHANGED,
    payload: avatar
  };
};

export const cellNumberChanged = (cellNumber) => {
  return {
    type: CELL_NUMBER_CHANGED,
    payload: cellNumber
  };
};

export const emailChanged = (email) => {
  return {
    type: EMAIL_CHANGED,
    payload: email
  };
};

export const passwordChanged = (password) => {
  return {
    type: PASSWORD_CHANGED,
    payload: password
  };
};



export const createNewUser = ({ firstName, lastName, email, password }) => {
  return (dispatch) => {
    dispatch({
      type: LOAD_SPINNER
    });
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          cell_number: cellNumber,
          avatar: avatar
        }
      })
    }).then((response) => {
      // console.log(response);
      if (response.status === 200) {
        response.json().then(data => {
          console.log(data);
          dispatch({
            type: USER_CREATED_SUCCESS,
            payload: data
          });
        });   
      } else {
        // console.log('SUCCESS!!');
        dispatch({
          type: USER_CREATED_FAILED
        })
      }
    });
  }
};