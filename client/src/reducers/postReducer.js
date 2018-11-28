import { ADD_POST, GET_POSTS, GET_POST, GET_USER_POSTS, DELETE_POST, POST_LOADING } from '../actions/types';

const initialState = {
  posts: [],
  userPosts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    // case GET_COMMENT:
    //   return {
    //     ...state,
    //     comment: action.payload,
    //     loading: false
    //   };
    default:
      return state;
  }
}
