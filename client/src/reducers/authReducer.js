import {SET_CURRENT_USER, GET_CURRENT_USER_PROFILE, GET_OTHER_USER_PROFILE, IS_REGISTED, EDIT_PROFILE} from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
  profile: {},
  otherProfile: {},
  isRegisted: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case GET_CURRENT_USER_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case GET_OTHER_USER_PROFILE:
      return {
        ...state,
        otherProfile: action.payload,
      };
    case IS_REGISTED:
      return {
        ...state,
        isRegisted: action.payload,
      };
    case EDIT_PROFILE: {
      return {
        ...state,
        profile: action.payload,
      };
    }
    default:
      return state;
  }
}
