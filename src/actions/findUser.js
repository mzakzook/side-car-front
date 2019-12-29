export const findUser = (token) => {
  
  return (dispatch) => {
    fetch(`http://localhost:3000/find_user?token=${token}`)
      .then(res => res.json())
      .then(data => {
        
        dispatch({
          type: 'FIND_USER_SUCCESS',
          payload: data
        });
      });
  }
};


