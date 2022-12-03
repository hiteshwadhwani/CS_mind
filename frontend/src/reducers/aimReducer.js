import {
  AIM_REGISTER_FAIL,
  AIM_REGISTER_REQUEST,
  AIM_REGISTER_SUCCESS,
  AIM_DETAILS_FAIL,
  AIM_DETAILS_REQUEST,
  AIM_DETAILS_SUCCESS,
  AIM_LIST_MY_FAIL,
  AIM_LIST_MY_REQUEST,
  AIM_LIST_MY_RESET,
  AIM_LIST_MY_SUCCESS,
  AIM_COMPLETE_REQUEST,
  AIM_COMPLETE_SUCCESS,
  AIM_COMPLETE_FAIL,
  AIM_COMPLETE_RESET,
  AIM_LIST_REQUEST,
  AIM_LIST_SUCCESS,
  AIM_LIST_FAIL,
  AIM_REGISTER_RESET
} from "./aimConstants";

export const aimRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case AIM_REGISTER_REQUEST:
      return { loading: true };
    case AIM_REGISTER_SUCCESS:
      return {
        loading: false,
        aimInfo: action.payload,
        successMessage:
          "we have recieved your registration,we will contact you through mail or phone shortly",
      };
    case AIM_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case AIM_REGISTER_RESET:
      return {};

    default:
      return state;
  }
};

export const aimDetailsReducer = (
  state = { loading: true, aimItems: [] },
  action
) => {
  switch (action.type) {
    case AIM_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AIM_DETAILS_SUCCESS:
      return {
        loading: false,
        aimItems: action.payload,
      };
    case AIM_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const aimListMyReducer = (state = { aimItems: [] }, action) => {
  switch (action.type) {
    case AIM_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case AIM_LIST_MY_SUCCESS:
      return {
        loading: false,
        aimItems: action.payload,
      };
    case AIM_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case AIM_LIST_MY_RESET:
      return { aimItems: [] };

    default:
      return state;
  }
};

export const aimCompleteReducer = (state = {}, action) => {
  switch (action.type) {
    case AIM_COMPLETE_REQUEST:
      return {
        loading: true,
      };
    case AIM_COMPLETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case AIM_COMPLETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case AIM_COMPLETE_RESET:
      return {};
    default:
      return state;
  }
};

export const aimListReducer = (state = { aims: [] }, action) => {
  switch (action.type) {
    case AIM_LIST_REQUEST:
      return {
        loading: true,
      };
    case AIM_LIST_SUCCESS:
      return {
        loading: false,
        aims: action.payload,
      };
    case AIM_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
