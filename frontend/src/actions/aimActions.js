import {
  AIM_COMPLETE_FAIL,
  AIM_COMPLETE_REQUEST,
  AIM_COMPLETE_SUCCESS,
  AIM_DETAILS_FAIL,
  AIM_DETAILS_REQUEST,
  AIM_DETAILS_SUCCESS,
  AIM_LIST_FAIL,
  AIM_LIST_MY_FAIL,
  AIM_LIST_MY_REQUEST,
  AIM_LIST_MY_SUCCESS,
  AIM_LIST_REQUEST,
  AIM_LIST_SUCCESS,
  AIM_REGISTER_FAIL,
  AIM_REGISTER_REQUEST,
  AIM_REGISTER_SUCCESS,
} from "../reducers/aimConstants";
import {logout} from '../actions/userActions';
import axios from "axios";
export const registerAim = (order) => async (
    dispatch,getState
  ) => {
    try {
      dispatch({ type: AIM_REGISTER_REQUEST });
  
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
        "/api/aim",
        order,
        config
      );
      dispatch({ type: AIM_REGISTER_SUCCESS, payload: data });
      
    } catch (error) {
      dispatch({
        type: AIM_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  
  export const getAimDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: AIM_DETAILS_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/aim/${id}`, config)
  
      dispatch({
        type: AIM_DETAILS_SUCCESS,
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
        type: AIM_DETAILS_FAIL,
        payload: message,
      })
    }
  }
  
  
  export const listMyAims = () => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: AIM_LIST_MY_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(
        `/api/aim/myaims`,
        config
      )
  
      dispatch({
        type: AIM_LIST_MY_SUCCESS,
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
        type: AIM_LIST_MY_FAIL,
        payload: message,
      })
    }
  }  


  export const completeAim = (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: AIM_COMPLETE_REQUEST,
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
        `/api/aim/${order._id}`,
        {},
        config
      );
  
      dispatch({
        type: AIM_COMPLETE_SUCCESS,
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
        type: AIM_COMPLETE_FAIL,
        payload: message,
      });
    }
  };

  export const listAims = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: AIM_LIST_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/aim`, config)
  
      dispatch({
        type: AIM_LIST_SUCCESS,
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
        type: AIM_LIST_FAIL,
        payload: message,
      })
    }
  }

  