import {
  INNOVATION_REGISTER_SUCCESS,
  INNOVATION_REGISTER_FAIL,
  INNOVATION_REGISTER_REQUEST,
  INNOVATION_DETAILS_REQUEST,
  INNOVATION_DETAILS_SUCCESS,
  INNOVATION_DETAILS_FAIL,
  INNOVATION_LIST_MY_REQUEST,
  INNOVATION_LIST_MY_SUCCESS,
  INNOVATION_LIST_MY_FAIL,
  INNOVATION_COMPLETE_SUCCESS,
  INNOVATION_COMPLETE_FAIL,
  INNOVATION_COMPLETE_REQUEST,
  INNOVATION_LIST_REQUEST,
  INNOVATION_LIST_SUCCESS,
  INNOVATION_LIST_FAIL,
} from "../reducers/innovationConstants";
import { logout } from "../actions/userActions";
import axios from "axios";

export const registerInnovation = (order) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: INNOVATION_REGISTER_REQUEST });

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
      "/api/innovation",
      order,
      config
    );
    dispatch({ type: INNOVATION_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: INNOVATION_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getInnovationDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INNOVATION_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/innovation/${id}`, config);

    dispatch({
      type: INNOVATION_DETAILS_SUCCESS,
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
      type: INNOVATION_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const listMyInnovations = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: INNOVATION_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/innovation/myinnovations`, config);

    dispatch({
      type: INNOVATION_LIST_MY_SUCCESS,
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
      type: INNOVATION_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const completeInnovation = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INNOVATION_COMPLETE_REQUEST,
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
      `/api/innovation/${order._id}`,
      {},
      config
    );

    dispatch({
      type: INNOVATION_COMPLETE_SUCCESS,
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
      type: INNOVATION_COMPLETE_FAIL,
      payload: message,
    });
  }
};

export const listInnovations = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: INNOVATION_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/innovation`, config);

    dispatch({
      type: INNOVATION_LIST_SUCCESS,
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
      type: INNOVATION_LIST_FAIL,
      payload: message,
    });
  }
};
