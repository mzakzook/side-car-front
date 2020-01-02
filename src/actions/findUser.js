import { PATH } from '../environment'


export const findUser = (token) => {
  
  return (dispatch) => {
    fetch(`http://${PATH}:3000/find_user?token=${token}`)
      .then(res => res.json())
      .then(data => {
        
        dispatch({
          type: 'FIND_USER_SUCCESS',
          payload: data
        });
      });
  }
};




export const updateUser = (data) => {
  
  return (dispatch) => {

        
        dispatch({
          type: 'FIND_USER_SUCCESS',
          payload: data
        });
      }
};