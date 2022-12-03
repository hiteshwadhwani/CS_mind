import {
  SHARPEN_COMPLETE_FAIL,
  SHARPEN_COMPLETE_REQUEST,
  SHARPEN_COMPLETE_SUCCESS,
  SHARPEN_DETAILS_FAIL,
  SHARPEN_DETAILS_REQUEST,
  SHARPEN_DETAILS_SUCCESS,
  SHARPEN_LIST_FAIL,
  SHARPEN_LIST_MY_FAIL,
  SHARPEN_LIST_MY_REQUEST,
  SHARPEN_LIST_MY_SUCCESS,
  SHARPEN_LIST_REQUEST,
  SHARPEN_LIST_SUCCESS,
  SHARPEN_REGISTER_FAIL,
  SHARPEN_REGISTER_REQUEST,
  SHARPEN_REGISTER_SUCCESS
} from "../reducers/sharpenConstants";
import { logout } from "../actions/userActions";
import axios from "axios";
export const registerSharpen = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: SHARPEN_REGISTER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/sharpen", order, config);
    dispatch({ type: SHARPEN_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SHARPEN_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSharpenDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHARPEN_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/sharpen/${id}`, config);

    dispatch({
      type: SHARPEN_DETAILS_SUCCESS,
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
      type: SHARPEN_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const listMySharpens = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHARPEN_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/sharpen/mysharpens`, config);

    dispatch({
      type: SHARPEN_LIST_MY_SUCCESS,
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
      type: SHARPEN_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const completeSharpen = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHARPEN_COMPLETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/sharpen/${order._id}`, {}, config);

    dispatch({
      type: SHARPEN_COMPLETE_SUCCESS,
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
      type: SHARPEN_COMPLETE_FAIL,
      payload: message,
    });
  }
};

export const listSharpens = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHARPEN_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/sharpen`, config);

    dispatch({
      type: SHARPEN_LIST_SUCCESS,
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
      type: SHARPEN_LIST_FAIL,
      payload: message,
    });
  }
};
