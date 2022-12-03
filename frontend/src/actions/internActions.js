import { INTERN_CREATE_FAIL, INTERN_CREATE_REQUEST, INTERN_CREATE_SUCCESS, INTERN_DELETE_FAIL, INTERN_DELETE_REQUEST, INTERN_DELETE_SUCCESS, INTERN_DETAILS_FAIL, INTERN_DETAILS_REQUEST, INTERN_DETAILS_SUCCESS, INTERN_LIST_FAIL, INTERN_LIST_REQUEST, INTERN_LIST_SUCCESS, INTERN_UPDATE_FAIL, INTERN_UPDATE_REQUEST, INTERN_UPDATE_SUCCESS } from "../reducers/internConstants";
import axios from 'axios';
import {logout} from './userActions'
export const createIntern = (order) => async (
    dispatch,getState
  ) => {
    try {
      dispatch({ type: INTERN_CREATE_REQUEST });
  
      const {
          userLogin: { userInfo },
        } = getState();
    
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
      const { data } = await axios.post(
        "/api/intern",
        order,
        config
      );
      dispatch({ type:INTERN_CREATE_SUCCESS, payload: data });
      
    } catch (error) {
      dispatch({
        type: INTERN_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  
  export const getInternDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: INTERN_DETAILS_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/intern/${id}`, config)
  
      dispatch({
        type: INTERN_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: INTERN_DETAILS_FAIL,
        payload: message,
      })
    }
  }
  
  

  export const updateIntern = (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: INTERN_UPDATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(
        `/api/intern/${order._id}`,
        order,
        config
      );
  
      dispatch({
        type: INTERN_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: INTERN_UPDATE_FAIL,
        payload: message,
      });
    }
  };

  export const listInterns = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: INTERN_LIST_REQUEST,
      })
  
      
  
      
  
      const { data } = await axios.get(`/api/intern`)
  
      dispatch({
        type: INTERN_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: INTERN_LIST_FAIL,
        payload: message,
      })
    }
  }

  
  export const deleteIntern = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: INTERN_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.delete(`/api/intern/${id}`, config)
  
      dispatch({
        type: INTERN_DELETE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: INTERN_DELETE_FAIL,
        payload: message,
      })
    }
  }
  
  