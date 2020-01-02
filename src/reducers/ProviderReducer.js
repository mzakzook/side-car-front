import { ActionSheetIOS } from "react-native";

// import {
//   BIZ_NAME_CHANGED,
//   TAX_ID_CHANGED,
//   PHOTO_ID_CHANGED,
//   WEBSITE_CHANGED,
//   YELP_CHANGED,
//   CATEGORY_CHANGED,
//   USER_ID_CHANGED,
//   BIZ_CHANGED
// } from '../actions/providerConstants';





const INITIAL_STATE = {
  biz_name: '',
  tax_id: '',
  placeholder_image: '',
  website: '',
  yelp: '',
  biz_phone: '',
  category: '',
  user_id: '',
  id: '',
  providers: [],
  my_providers: [],
  images: []
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case BIZ_NAME_CHANGED:
    //   return { ...state, bizName: action.payload };
    // case TAX_ID_CHANGED:
    //   return { ...state, taxId: action.payload };
    // case PHOTO_ID_CHANGED:
    //   return { ...state, photoId: action.payload };
    // case WEBSITE_CHANGED:
    //   return { ...state, website: action.payload };
    // case YELP_CHANGED:
    //   return { ...state, yelp: action.payload };
    // case CATEGORY_CHANGED:
    //   return { ...state, category: action.payload };
    // case USER_ID_CHANGED:
    //   return { ...state, userId: action.payload };
    case 'BIZ_CHANGED':
      return { ...state, ...action.payload };
    case 'PROVIDER_FETCH_SUCCESS':
      return { ...state, providers: action.payload }; 
    case 'MY_PROVIDER_FETCH_SUCCESS':
      return { ...state, my_providers: action.payload}
    default:
      return state;
  }
};