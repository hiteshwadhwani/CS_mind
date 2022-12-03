import { COUNSEL_COMPLETE_FAIL, COUNSEL_COMPLETE_REQUEST, COUNSEL_COMPLETE_RESET, COUNSEL_COMPLETE_SUCCESS, COUNSEL_DETAILS_FAIL, COUNSEL_DETAILS_REQUEST, COUNSEL_DETAILS_SUCCESS, COUNSEL_LIST_FAIL, COUNSEL_LIST_MY_FAIL, COUNSEL_LIST_MY_REQUEST, COUNSEL_LIST_MY_RESET, COUNSEL_LIST_MY_SUCCESS, COUNSEL_LIST_REQUEST, COUNSEL_LIST_SUCCESS, COUNSEL_REGISTER_FAIL, COUNSEL_REGISTER_REQUEST, COUNSEL_REGISTER_RESET, COUNSEL_REGISTER_SUCCESS } from "./counselConstants";

export const counselRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case COUNSEL_REGISTER_REQUEST:
        return { loading: true };
      case COUNSEL_REGISTER_SUCCESS:
        return {
          loading: false,
          successMessage:
            "we have recieved your registration,we will contact you through mail or phone shortly",
        };
      case COUNSEL_REGISTER_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case COUNSEL_REGISTER_RESET:
        return{}  
  
      default:
        return state;
    }
  };

  export const counselDetailsReducer = (
    state = { loading: true, counselItems: [] },
    action
  ) => {
    switch (action.type) {
      case COUNSEL_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case COUNSEL_DETAILS_SUCCESS:
        return {
          loading: false,
          counselItems: action.payload,
        };
      case COUNSEL_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const counselListMyReducer = (state = { counselItems: [] }, action) => {
    switch (action.type) {
      case COUNSEL_LIST_MY_REQUEST:
        return {
          loading: true,
        };
      case COUNSEL_LIST_MY_SUCCESS:
        return {
          loading: false,
          counselItems: action.payload,
        };
      case COUNSEL_LIST_MY_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case COUNSEL_LIST_MY_RESET:
        return { counselItems: [] };
  
      default:
        return state;
    }
  };
  
  export const counselCompleteReducer = (state = {}, action) => {
    switch (action.type) {
      case COUNSEL_COMPLETE_REQUEST:
        return {
          loading: true,
        };
      case COUNSEL_COMPLETE_SUCCESS:
        return {
          loading: false,
          success: true,
        };
      case COUNSEL_COMPLETE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case COUNSEL_COMPLETE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const counselListReducer = (state = { counsels: [] }, action) => {
    switch (action.type) {
      case COUNSEL_LIST_REQUEST:
        return {
          loading: true,
        };
      case COUNSEL_LIST_SUCCESS:
        return {
          loading: false,
          counsels: action.payload,
        };
      case COUNSEL_LIST_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  