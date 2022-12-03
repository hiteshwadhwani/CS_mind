import {
  INTERN_FORM_DETAILS_FAIL,
  INTERN_FORM_DETAILS_REQUEST,
  INTERN_FORM_DETAILS_SUCCESS,
  INTERN_FORM_LIST_FAIL,
  INTERN_FORM_LIST_REQUEST,
  INTERN_FORM_LIST_SUCCESS,
  INTERN_FORM_REGISTER_FAIL,
  INTERN_FORM_REGISTER_REQUEST,
  INTERN_FORM_REGISTER_SUCCESS,
} from "../reducers/internFormConstants";
import { logout } from "../actions/userActions";
import axios from "axios";
export const registerInternForm = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: INTERN_FORM_REGISTER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/internForm", order, config);
    dispatch({ type: INTERN_FORM_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: INTERN_FORM_REGISTER_FAIL,
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
      type: INTERN_FORM_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/internForm/${id}`, config);

    dispatch({
      type: INTERN_FORM_DETAILS_SUCCESS,
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
      type: INTERN_FORM_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const listInterns = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: INTERN_FORM_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/internForm`, config);

    dispatch({
      type: INTERN_FORM_LIST_SUCCESS,
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
      type: INTERN_FORM_LIST_FAIL,
      payload: message,
    });
  }
};
