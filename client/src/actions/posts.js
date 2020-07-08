import axios from 'axios';
import {
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  ADD_POST,
  DELETE_POST,
} from './types';
import { setAlert } from './alert';

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPost = (postID) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postID}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createPost = (postData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/posts', postData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post Created', 'success'));
    history.push('/');
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePost = (postID) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postID}`);

    dispatch({
      type: DELETE_POST,
      payload: postID,
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
