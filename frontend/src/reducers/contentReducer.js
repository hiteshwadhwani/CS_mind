import {
  CONTENT_DETAILS_FAIL,
  CONTENT_DETAILS_REQUEST,
  CONTENT_DETAILS_SUCCESS,
  CONTENT_UPDATE_FAIL,
  CONTENT_UPDATE_REQUEST,
  CONTENT_UPDATE_RESET,
  CONTENT_UPDATE_SUCCESS,
} from "./contentConstants";

export const contentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTENT_UPDATE_REQUEST:
      return { loading: true };
    case CONTENT_UPDATE_SUCCESS:
      return {
        loading: false,
        contentInfo: action.payload,
        success:'updated'
      };
    case CONTENT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CONTENT_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

export const contentDetailsReducer = (
  state = { loading: true, contentItems: [] },
  action
) => {
  switch (action.type) {
    case CONTENT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONTENT_DETAILS_SUCCESS:
      return {
        loading: false,
        contentItems: action.payload,
      };
    case CONTENT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
