import {
  AFF_CREATE_FAIL,
  AFF_CREATE_REQUEST,
  AFF_CREATE_SUCCESS,
  AFF_DELETE_FAIL,
  AFF_DELETE_REQUEST,
  AFF_DELETE_SUCCESS,
  AFF_DETAILS_FAIL,
  AFF_DETAILS_REQUEST,
  AFF_DETAILS_SUCCESS,
  AFF_LIST_FAIL,
  AFF_LIST_REQUEST,
  AFF_LIST_SUCCESS,
  AFF_UPDATE_FAIL,
  AFF_UPDATE_REQUEST,
  AFF_UPDATE_SUCCESS,
} from "../reducers/affConstants";
import axios from "axios";
import { logout } from "./userActions";
export const createAff = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: AFF_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/aff", order, config);
    dispatch({ type: AFF_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: AFF_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAffDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AFF_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/aff/${id}`, config);

    dispatch({
      type: AFF_DETAILS_SUCCESS,
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
      type: AFF_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateAff = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AFF_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/aff/${order._id}`, order, config);

    dispatch({
      type: AFF_UPDATE_SUCCESS,
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
      type: AFF_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const listAffs = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: AFF_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/aff`);

    dispatch({
      type: AFF_LIST_SUCCESS,
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
      type: AFF_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteAff = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AFF_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/aff/${id}`, config);

    dispatch({
      type: AFF_DELETE_SUCCESS,
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
      type: AFF_DELETE_FAIL,
      payload: message,
    });
  }
};
