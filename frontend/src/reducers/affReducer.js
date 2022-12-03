import {
    AFF_CREATE_FAIL,
    AFF_CREATE_REQUEST,
    AFF_CREATE_SUCCESS,
    AFF_DETAILS_FAIL,
    AFF_DETAILS_RESET,
    AFF_DETAILS_REQUEST,
    AFF_DETAILS_SUCCESS,
    AFF_LIST_REQUEST,
    AFF_LIST_FAIL,
    AFF_LIST_SUCCESS,
    AFF_CREATE_RESET,
    AFF_DELETE_FAIL,
    AFF_DELETE_REQUEST,
    AFF_DELETE_RESET,
    AFF_DELETE_SUCCESS,
    AFF_UPDATE_FAIL,
    AFF_UPDATE_REQUEST,
    AFF_UPDATE_RESET,
    AFF_UPDATE_SUCCESS,
    AFF_LIST_RESET
  } from "./affConstants";
  export const affCreateReducer = (state = {success:false}, action) => {
    switch (action.type) {
      case AFF_CREATE_REQUEST:
        return { loading: true,success:false };
      case AFF_CREATE_SUCCESS:
        return {
          loading: false,
          affInfo: action.payload,
          success:true
        };
      case AFF_CREATE_FAIL:
        return {
          loading: false,
          error: action.payload,
          success:false
        };
  
      default:
        return state;
    }
  };
  
  export const affDetailsReducer = (state = { aff: {} }, action) => {
    switch (action.type) {
      case AFF_DETAILS_REQUEST:
        return { ...state, loading: true };
      case AFF_DETAILS_SUCCESS:
        return {
          loading: false,
          aff: action.payload,
        };
      case AFF_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case AFF_DETAILS_RESET:
        return { aff: {} };
      default:
        return state;
    }
  };
  
  export const affListReducer = (state = { affs: [] }, action) => {
    switch (action.type) {
      case AFF_LIST_REQUEST:
        return { loading: true };
      case AFF_LIST_SUCCESS:
        return { loading: false, affs: action.payload };
      case AFF_LIST_FAIL:
        return { loading: false, error: action.payload };
      case AFF_LIST_RESET:
        return { affs: [] };
      default:
        return state;
    }
  };
  
  export const affDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case AFF_DELETE_REQUEST:
        return { loading: true };
      case AFF_DELETE_SUCCESS:
        return { loading: false, success: true };
      case AFF_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const affUpdateReducer = (state = { aff: {} }, action) => {
    switch (action.type) {
      case AFF_UPDATE_REQUEST:
        return { loading: true };
      case AFF_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case AFF_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case AFF_UPDATE_RESET:
        return {
          aff: {},
        };
      default:
        return state;
    }
  };
  