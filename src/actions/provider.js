// export const bizNameChanged = (bizName) => {
//   return {
//     type: 'BIZ_NAME_CHANGED',
//     payload: bizName
//   };
// };

// export const taxIdChanged = (taxId) => {
//   return {
//     type: 'TAX_ID_CHANGED',
//     payload: taxId
//   };
// };

// export const photoIdChanged = (photoId) => {
//   return {
//     type: 'PHOTO_ID_CHANGED',
//     payload: photoId
//   };
// };

// export const websiteChanged = (website) => {
//   return {
//     type: 'WEBSITE_CHANGED',
//     payload: website
//   };
// };

// export const yelpChanged = (yelp) => {
//   return {
//     type: 'YELP_CHANGED',
//     payload: yelp
//   };
// };

// export const bizPhoneChanged = (bizPhone) => {
//   return {
//     type: 'BIZ_PHONE_CHANGED',
//     payload: bizPhone
//   };
// };

// export const categoryChanged = (category) => {
//   return {
//     type: 'CATEGORY_CHANGED',
//     payload: category
//   };
// };

// export const userIdChanged = (userId) => {
//   return {
//     type: 'USER_ID_CHANGED',
//     payload: userId
//   };
// };

import { PATH } from '../environment'


export const bizChanged = (biz) => {
  return (dispatch) => {
    dispatch({
      type: 'BIZ_CHANGED',
      payload: biz
    })
  }
}

export const getProviders = () => {
  return (dispatch) => {
  fetch(`http://${PATH}:3000/providers`)
     .then(res => res.json())
     .then(data => {
      dispatch({
        type: 'PROVIDER_FETCH_SUCCESS',
        payload: data.data
      });
     })
    }
}

export const getMyProviders = (userId) => {
  return (dispatch) => {
  fetch(`http://${PATH}:3000/providers?user_id=${userId}`)
     .then(res => res.json())
     .then(data => {
       dispatch({
         type: 'MY_PROVIDER_FETCH_SUCCESS',
         payload: data.data
       })
     })
    }
}