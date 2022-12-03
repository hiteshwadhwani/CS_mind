import {
  CONTENT_DETAILS_FAIL,
  CONTENT_DETAILS_REQUEST,
  CONTENT_DETAILS_SUCCESS,
  CONTENT_UPDATE_FAIL,
  CONTENT_UPDATE_REQUEST,
  CONTENT_UPDATE_SUCCESS,
} from "../reducers/contentConstants";
import { logout } from "../actions/userActions";
import axios from "axios";

export const updateContent = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONTENT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put("/api/content", order, config);
    dispatch({ type: CONTENT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONTENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getContentDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTENT_DETAILS_REQUEST,
    });

    


    const { data } = await axios.get(`/api/content`);

    dispatch({
      type: CONTENT_DETAILS_SUCCESS,
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
      type: CONTENT_DETAILS_FAIL,
      payload: message,
    });
  }
};
