import axios from 'axios';
import {GET_ERRORS, SET_CURRENT_USER, IS_REGISTED, EDIT_PROFILE} from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = userData => dispatch => {
  const isRegisted = true;
  axios
    .post('/api/users/register', userData)
    .then(() => {
      dispatch({
        type: IS_REGISTED,
        payload: isRegisted,
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localStorage
      const {token} = res.data;
      // Set token to lS
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set curren user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//Edit Profile
export const editProfile = profileData => async dispatch => {
  const profileForm = new FormData();
  profileForm.append('name', profileData.name);
  profileForm.append('bio', profileData.bio);
  profileForm.append('image', profileData.image);

  try {
    const res = await axios.post('/api/users/', profileForm);

    dispatch({
      type: EDIT_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for ruture requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));

  const isRegisted = false;
  dispatch({
    type: IS_REGISTED,
    payload: isRegisted,
  });
};
