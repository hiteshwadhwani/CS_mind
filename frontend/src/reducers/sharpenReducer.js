import {
  SHARPEN_REGISTER_FAIL,
  SHARPEN_REGISTER_REQUEST,
  SHARPEN_REGISTER_SUCCESS,
  SHARPEN_DETAILS_FAIL,
  SHARPEN_DETAILS_REQUEST,
  SHARPEN_DETAILS_SUCCESS,
  SHARPEN_LIST_MY_FAIL,
  SHARPEN_LIST_MY_REQUEST,
  SHARPEN_LIST_MY_RESET,
  SHARPEN_LIST_MY_SUCCESS,
  SHARPEN_COMPLETE_REQUEST,
  SHARPEN_COMPLETE_SUCCESS,
  SHARPEN_COMPLETE_FAIL,
  SHARPEN_COMPLETE_RESET,
  SHARPEN_LIST_REQUEST,
  SHARPEN_LIST_SUCCESS,
  SHARPEN_LIST_FAIL,
  SHARPEN_REGISTER_RESET,
} from "./sharpenConstants";

export const sharpenRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case SHARPEN_REGISTER_REQUEST:
      return { loading: true };
    case SHARPEN_REGISTER_SUCCESS:
      return {
        loading: false,
        sharpenInfo: action.payload,
        successMessage:
          "we have recieved your registration,we will contact you through mail or phone shortly",
      };
    case SHARPEN_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SHARPEN_REGISTER_RESET:
      return {};

    default:
      return state;
  }
};

export const sharpenDetailsReducer = (
  state = { loading: true, sharpenItems: [] },
  action
) => {
  switch (action.type) {
    case SHARPEN_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SHARPEN_DETAILS_SUCCESS:
      return {
        loading: false,
        sharpenItems: action.payload,
      };
    case SHARPEN_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const sharpenListMyReducer = (state = { sharpenItems: [] }, action) => {
  switch (action.type) {
    case SHARPEN_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case SHARPEN_LIST_MY_SUCCESS:
      return {
        loading: false,
        sharpenItems: action.payload,
      };
    case SHARPEN_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SHARPEN_LIST_MY_RESET:
      return { sharpenItems: [] };

    default:
      return state;
  }
};

export const sharpenCompleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SHARPEN_COMPLETE_REQUEST:
      return {
        loading: true,
      };
    case SHARPEN_COMPLETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case SHARPEN_COMPLETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SHARPEN_COMPLETE_RESET:
      return {};
    default:
      return state;
  }
};

export const  sharpenListReducer = (state = { sharpens: [] }, action) => {
  switch (action.type) {
    case SHARPEN_LIST_REQUEST:
      return {
        loading: true,
      };
    case SHARPEN_LIST_SUCCESS:
      return {
        loading: false,
        sharpens: action.payload,
      };
    case SHARPEN_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
