import {
    FACULTY_CREATE_FAIL,
    FACULTY_CREATE_REQUEST,
    FACULTY_CREATE_SUCCESS,
    FACULTY_DETAILS_FAIL,
    FACULTY_DETAILS_RESET,
    FACULTY_DETAILS_REQUEST,
    FACULTY_DETAILS_SUCCESS,
    FACULTY_LIST_REQUEST,
    FACULTY_LIST_FAIL,
    FACULTY_LIST_SUCCESS,
    FACULTY_CREATE_RESET,
    FACULTY_DELETE_FAIL,
    FACULTY_DELETE_REQUEST,
    FACULTY_DELETE_RESET,
    FACULTY_DELETE_SUCCESS,
    FACULTY_UPDATE_FAIL,
    FACULTY_UPDATE_REQUEST,
    FACULTY_UPDATE_RESET,
    FACULTY_UPDATE_SUCCESS,
    FACULTY_LIST_RESET
  } from "./facultyConstants";
  export const facultyCreateReducer = (state = {success:false}, action) => {
    switch (action.type) {
      case FACULTY_CREATE_REQUEST:
        return { loading: true,success:false };
      case FACULTY_CREATE_SUCCESS:
        return {
          loading: false,
          facultyInfo: action.payload,
          success:true
        };
      case FACULTY_CREATE_FAIL:
        return {
          loading: false,
          error: action.payload,
          success:false
        };
  
      default:
        return state;
    }
  };
  
  export const facultyDetailsReducer = (state = { faculty: {} }, action) => {
    switch (action.type) {
      case FACULTY_DETAILS_REQUEST:
        return { ...state, loading: true };
      case FACULTY_DETAILS_SUCCESS:
        return {
          loading: false,
          faculty: action.payload,
        };
      case FACULTY_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case FACULTY_DETAILS_RESET:
        return { faculty: {} };
      default:
        return state;
    }
  };
  
  export const facultyListReducer = (state = { faculties: [] }, action) => {
    switch (action.type) {
      case FACULTY_LIST_REQUEST:
        return { loading: true };
      case FACULTY_LIST_SUCCESS:
        return { loading: false, faculties: action.payload };
      case FACULTY_LIST_FAIL:
        return { loading: false, error: action.payload };
      case FACULTY_LIST_RESET:
        return { faculties: [] };
      default:
        return state;
    }
  };
  
  export const facultyDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case FACULTY_DELETE_REQUEST:
        return { loading: true };
      case FACULTY_DELETE_SUCCESS:
        return { loading: false, success: true };
      case FACULTY_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const facultyUpdateReducer = (state = { faculty: {} }, action) => {
    switch (action.type) {
      case FACULTY_UPDATE_REQUEST:
        return { loading: true };
      case FACULTY_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case FACULTY_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case FACULTY_UPDATE_RESET:
        return {
          faculty: {},
        };
      default:
        return state;
    }
  };
  