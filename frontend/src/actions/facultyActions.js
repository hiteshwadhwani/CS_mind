import { FACULTY_CREATE_FAIL, FACULTY_CREATE_REQUEST, FACULTY_CREATE_SUCCESS, FACULTY_DELETE_FAIL, FACULTY_DELETE_REQUEST, FACULTY_DELETE_SUCCESS, FACULTY_DETAILS_FAIL, FACULTY_DETAILS_REQUEST, FACULTY_DETAILS_SUCCESS, FACULTY_LIST_FAIL, FACULTY_LIST_REQUEST, FACULTY_LIST_SUCCESS, FACULTY_UPDATE_FAIL, FACULTY_UPDATE_REQUEST, FACULTY_UPDATE_SUCCESS } from "../reducers/facultyConstants";
import axios from 'axios';
import {logout} from './userActions'
export const createFaculty = (order) => async (
    dispatch,getState
  ) => {
    try {
      dispatch({ type: FACULTY_CREATE_REQUEST });
  
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
        "/api/faculty",
        order,
        config
      );
      dispatch({ type:FACULTY_CREATE_SUCCESS, payload: data });
      
    } catch (error) {
      dispatch({
        type: FACULTY_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  
  export const getFacultyDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FACULTY_DETAILS_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/faculty/${id}`, config)
  
      dispatch({
        type: FACULTY_DETAILS_SUCCESS,
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
        type: FACULTY_DETAILS_FAIL,
        payload: message,
      })
    }
  }
  
  

  export const updateFaculty = (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FACULTY_UPDATE_REQUEST,
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
        `/api/faculty/${order._id}`,
        order,
        config
      );
  
      dispatch({
        type: FACULTY_UPDATE_SUCCESS,
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
        type: FACULTY_UPDATE_FAIL,
        payload: message,
      });
    }
  };

  export const listFaculities = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: FACULTY_LIST_REQUEST,
      })
  
      
  
      const { data } = await axios.get(`/api/faculty`)
  
      dispatch({
        type: FACULTY_LIST_SUCCESS,
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
        type: FACULTY_LIST_FAIL,
        payload: message,
      })
    }
  }

  
  export const deleteFaculty = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FACULTY_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.delete(`/api/faculty/${id}`, config)
  
      dispatch({
        type: FACULTY_DELETE_SUCCESS,
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
        type: FACULTY_DELETE_FAIL,
        payload: message,
      })
    }
  }
  
  