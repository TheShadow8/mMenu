import axios from 'axios';

import { ADD_POST, GET_ERRORS, CLEAR_ERRORS, GET_POSTS, GET_POST, POST_LOADING, DELETE_POST } from './types';

// Add Post
export const addPost = (postData, history) => async dispatch => {
  dispatch(clearErrors());
  const formData = new FormData();
  formData.append('name', postData.name);
  formData.append('text', postData.text);
  formData.append('image', postData.image);

  try {
    const res = await axios.post('/api/posts', formData);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    history.push('/menuboard');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
