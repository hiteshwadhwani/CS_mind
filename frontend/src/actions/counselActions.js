import {
  COUNSEL_COMPLETE_FAIL,
  COUNSEL_COMPLETE_REQUEST,
  COUNSEL_COMPLETE_SUCCESS,
  COUNSEL_DETAILS_FAIL,
  COUNSEL_DETAILS_REQUEST,
  COUNSEL_DETAILS_SUCCESS,
  COUNSEL_LIST_FAIL,
  COUNSEL_LIST_MY_FAIL,
  COUNSEL_LIST_MY_REQUEST,
  COUNSEL_LIST_MY_SUCCESS,
  COUNSEL_LIST_REQUEST,
  COUNSEL_LIST_SUCCESS,
  COUNSEL_REGISTER_FAIL,
  COUNSEL_REGISTER_REQUEST,
  COUNSEL_REGISTER_SUCCESS,
} from "../reducers/counselConstants";
import axios from "axios";
import { logout } from "../actions/userActions";

export const registerCounsel = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: COUNSEL_REGISTER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/counsel", order, config);
    dispatch({ type: COUNSEL_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: COUNSEL_REGISTER_FAIL,
      payload: message,
    });
  }
};

export const getCounselDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUNSEL_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/counsel/${id}`, config);

    dispatch({
      type: COUNSEL_DETAILS_SUCCESS,
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
      type: COUNSEL_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const listMyCounsels = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUNSEL_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

   const { data } = await axios.get("/api/counsel/mycounsels", config);
    
    dispatch({
      type: COUNSEL_LIST_MY_SUCCESS,
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
      type: COUNSEL_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const completeCounsel = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUNSEL_COMPLETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/counsel/${order._id}`, {}, config);

    dispatch({
      type: COUNSEL_COMPLETE_SUCCESS,
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
      type: COUNSEL_COMPLETE_FAIL,
      payload: message,
    });
  }
};

export const listCounsels = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUNSEL_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/counsel`, config);

    dispatch({
      type: COUNSEL_LIST_SUCCESS,
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
      type: COUNSEL_LIST_FAIL,
      payload: message,
    });
  }
};
