import {
    INTERN_FORM_REGISTER_FAIL,
    INTERN_FORM_REGISTER_REQUEST,
    INTERN_FORM_REGISTER_SUCCESS,
    INTERN_FORM_DETAILS_FAIL,
    INTERN_FORM_DETAILS_REQUEST,
    INTERN_FORM_DETAILS_SUCCESS,
    INTERN_FORM_LIST_REQUEST,
    INTERN_FORM_LIST_SUCCESS,
    INTERN_FORM_LIST_FAIL,
    INTERN_FORM_REGISTER_RESET
  } from "./internFormConstants";
  
  export const internFormRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case INTERN_FORM_REGISTER_REQUEST:
        return { loading: true };
      case INTERN_FORM_REGISTER_SUCCESS:
        return {
          loading: false,
          internInfo: action.payload,
          successMessage:
            "we have recieved your registration,we will contact you through mail or phone shortly",
        };
      case INTERN_FORM_REGISTER_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case INTERN_FORM_REGISTER_RESET:
        return {};
  
      default:
        return state;
    }
  };
  
  export const internFormDetailsReducer = (
    state = { loading: true, internItems: [] },
    action
  ) => {
    switch (action.type) {
      case INTERN_FORM_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case INTERN_FORM_DETAILS_SUCCESS:
        return {
          loading: false,
          internItems: action.payload,
        };
      case INTERN_FORM_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  
  
  export const internFormListReducer = (state = { interns: [] }, action) => {
    switch (action.type) {
      case INTERN_FORM_LIST_REQUEST:
        return {
          loading: true,
        };
      case INTERN_FORM_LIST_SUCCESS:
        return {
          loading: false,
          interns: action.payload,
        };
      case INTERN_FORM_LIST_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  