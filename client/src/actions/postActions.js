import axios from 'axios';

import {ADD_POST, GET_ERRORS, CLEAR_ERRORS, GET_POSTS, GET_USER_POSTS, GET_POST, POST_LOADING, GET_COMMENT} from './types';

// Get Posts
export const getPosts = () => async dispatch => {
  try {
    dispatch(setPostLoading());
    const res = await axios.get('/api/posts');

    dispatch({type: GET_POSTS, payload: res.data});
  } catch (err) {
    dispatch({
      type: GET_POSTS,
      payload: null,
    });
  }
};

// Get User Posts
export const getUserPosts = userId => async dispatch => {
  try {
    dispatch(setPostLoading());
    const res = await axios.get(`/api/posts/user/${userId}`);

    dispatch({type: GET_USER_POSTS, payload: res.data});
  } catch (err) {
    dispatch({
      type: GET_USER_POSTS,
      payload: null,
    });
  }
};

// Add Post
export const addPost = (postData, history) => async dispatch => {
  dispatch(clearErrors());
  const formData = new FormData();
  formData.append('name', postData.name);
  formData.append('title', postData.title);
  formData.append('content', postData.content);
  formData.append('image', postData.image);

  try {
    const res = await axios.post('/api/posts', formData);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    history.push('/menuboard');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

//Get Post
export const getPost = postId => async dispatch => {
  try {
    dispatch(setPostLoading());
    const res = await axios.get(`/api/posts/${postId}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_POST,
      payload: null,
    });
  }
};

//Get Comments
export const getComments = postId => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);
    console.log(res.data.comments);
    dispatch({
      type: GET_COMMENT,
      payload: res.data.comments,
    });
  } catch (err) {
    dispatch({
      type: GET_COMMENT,
      payload: null,
    });
  }
};

// Get Comment
export const getComment = (postId, commentId) => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Add Comments
export const addComment = (postId, commentData) => async dispatch => {
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, commentData);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Detele Comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Add like
export const likePost = id => async dispatch => {
  try {
    const res = await axios.post(`/api/posts/like/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Remove like
export const unlikePost = id => async dispatch => {
  try {
    const res = await axios.post(`/api/posts/unlike/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
