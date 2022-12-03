import {
  INTERN_CREATE_FAIL,
  INTERN_CREATE_REQUEST,
  INTERN_CREATE_SUCCESS,
  INTERN_DETAILS_FAIL,
  INTERN_DETAILS_RESET,
  INTERN_DETAILS_REQUEST,
  INTERN_DETAILS_SUCCESS,
  INTERN_LIST_REQUEST,
  INTERN_LIST_FAIL,
  INTERN_LIST_SUCCESS,
  INTERN_CREATE_RESET,
  INTERN_DELETE_FAIL,
  INTERN_DELETE_REQUEST,
  INTERN_DELETE_RESET,
  INTERN_DELETE_SUCCESS,
  INTERN_UPDATE_FAIL,
  INTERN_UPDATE_REQUEST,
  INTERN_UPDATE_RESET,
  INTERN_UPDATE_SUCCESS,
  INTERN_LIST_RESET
} from "./internConstants";
export const internCreateReducer = (state = {success:false}, action) => {
  switch (action.type) {
    case INTERN_CREATE_REQUEST:
      return { loading: true,success:false };
    case INTERN_CREATE_SUCCESS:
      return {
        loading: false,
        internInfo: action.payload,
        success:true
      };
    case INTERN_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
        success:false
      };

    default:
      return state;
  }
};

export const internDetailsReducer = (state = { intern: {} }, action) => {
  switch (action.type) {
    case INTERN_DETAILS_REQUEST:
      return { ...state, loading: true };
    case INTERN_DETAILS_SUCCESS:
      return {
        loading: false,
        intern: action.payload,
      };
    case INTERN_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case INTERN_DETAILS_RESET:
      return { intern: {} };
    default:
      return state;
  }
};

export const internListReducer = (state = { interns: [] }, action) => {
  switch (action.type) {
    case INTERN_LIST_REQUEST:
      return { loading: true };
    case INTERN_LIST_SUCCESS:
      return { loading: false, interns: action.payload };
    case INTERN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case INTERN_LIST_RESET:
      return { interns: [] };
    default:
      return state;
  }
};

export const internDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case INTERN_DELETE_REQUEST:
      return { loading: true };
    case INTERN_DELETE_SUCCESS:
      return { loading: false, success: true };
    case INTERN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const internUpdateReducer = (state = { intern: {} }, action) => {
  switch (action.type) {
    case INTERN_UPDATE_REQUEST:
      return { loading: true };
    case INTERN_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case INTERN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case INTERN_UPDATE_RESET:
      return {
        intern: {},
      };
    default:
      return state;
  }
};
