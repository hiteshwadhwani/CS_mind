import axios from "axios";
import { logout } from "../actions/userActions";
import {
  CAL_ASSIGNED_FAIL,
  CAL_ASSIGNED_REQUEST,
  CAL_ASSIGNED_SUCCESS,
  CAL_ORDERS_FAIL,
  CAL_ORDERS_REQUEST,
  CAL_ORDERS_SUCCESS,
  CAL_UPLOAD_FAIL,
  CAL_UPLOAD_REQUEST,
  CAL_UPLOAD_SUCCESS,
  COMMENT_ADD_FAIL,
  COMMENT_ADD_REQUEST,
  COMMENT_ADD_SUCCESS,
  COMMITMENT_COMPLETE_FAIL,
  COMMITMENT_COMPLETE_REQUEST,
  COMMITMENT_COMPLETE_SUCCESS,
  COMMITMENT_DETAILS_FAIL,
  COMMITMENT_DETAILS_REQUEST,
  COMMITMENT_DETAILS_SUCCESS,
  COMMITMENT_LIST_FAIL,
  COMMITMENT_LIST_MY_FAIL,
  COMMITMENT_LIST_MY_REQUEST,
  COMMITMENT_LIST_MY_SUCCESS,
  COMMITMENT_LIST_REQUEST,
  COMMITMENT_LIST_SUCCESS,
  COMMITMENT_REGISTER_FAIL,
  COMMITMENT_REGISTER_REQUEST,
  COMMITMENT_REGISTER_SUCCESS,
  READER_ASSIGNED_FAIL,
  READER_ASSIGNED_REQUEST,
  READER_ASSIGNED_SUCCESS,
  READER_ORDERS_FAIL,
  READER_ORDERS_REQUEST,
  READER_ORDERS_SUCCESS,
  READER_SELECT_FAIL,
  READER_SELECT_REQUEST,
  READER_SELECT_RESET,
  READER_SELECT_SUCCESS,
} from "../reducers/commitmentConstants";

export const registerCommitment = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMMITMENT_REGISTER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/commitment", order, config);
    dispatch({ type: COMMITMENT_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: COMMITMENT_REGISTER_FAIL,
      payload: message,
    });
  }
};

export const getCommitmentDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMMITMENT_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/commitment/${id}`, config);

    dispatch({
      type: COMMITMENT_DETAILS_SUCCESS,
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
      type: COMMITMENT_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const listMyCommitments = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMMITMENT_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/commitment/mycommitments", config);

    dispatch({
      type: COMMITMENT_LIST_MY_SUCCESS,
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
      type: COMMITMENT_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const completeCommitment = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMMITMENT_COMPLETE_REQUEST,
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
      `/api/commitment/${order._id}`,
      {},
      config
    );

    dispatch({
      type: COMMITMENT_COMPLETE_SUCCESS,
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
      type: COMMITMENT_COMPLETE_FAIL,
      payload: message,
    });
  }
};

export const listCommitments = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMMITMENT_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/commitment`, config);

    dispatch({
      type: COMMITMENT_LIST_SUCCESS,
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
      type: COMMITMENT_LIST_FAIL,
      payload: message,
    });
  }
};

export const assignCal = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAL_ASSIGNED_REQUEST,
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
      `/api/commitment/cal/assign`,
      order,
      config
    );

    dispatch({
      type: CAL_ASSIGNED_SUCCESS,
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
      type: CAL_ASSIGNED_FAIL,
      payload: message,
    });
  }
};

export const assignReader = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: READER_ASSIGNED_REQUEST,
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
      `/api/commitment/reader/assign`,
      order,
      config
    );

    dispatch({
      type: READER_ASSIGNED_SUCCESS,
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
      type: READER_ASSIGNED_FAIL,
      payload: message,
    });
  }
};

export const getCalOrders = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAL_ORDERS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/commitment/cal/${id}`, config);

    dispatch({
      type: CAL_ORDERS_SUCCESS,
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
      type: CAL_ORDERS_FAIL,
      payload: message,
    });
  }
};

export const getReaderOrders = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: READER_ORDERS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/commitment/reader/${id}`, config);

    dispatch({
      type: READER_ORDERS_SUCCESS,
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
      type: READER_ORDERS_FAIL,
      payload: message,
    });
  }
};

export const uploadByCal = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAL_UPLOAD_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    console.log("before api call");
    const { data } = await axios.put(
      `/api/commitment/cal/upload`,
      order,
      config
    );
    console.log("after api cal");
    dispatch({
      type: CAL_UPLOAD_SUCCESS,
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
      type: CAL_UPLOAD_FAIL,
      payload: message,
    });
  }
};

export const selectByReader = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: READER_SELECT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    console.log("before api call");
    const { data } = await axios.put(
      `/api/commitment/reader/select`,
      order,
      config
    );
    console.log("after api cal");
    dispatch({
      type: READER_SELECT_SUCCESS,
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
      type: READER_SELECT_FAIL,
      payload: message,
    });
  }
};
export const addComment = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMMENT_ADD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/commitment/comment", order, config);
    dispatch({ type: COMMENT_ADD_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: COMMENT_ADD_FAIL,
      payload: message,
    });
  }
};
