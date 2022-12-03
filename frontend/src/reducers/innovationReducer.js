import {
  INNOVATION_REGISTER_REQUEST,
  INNOVATION_REGISTER_FAIL,
  INNOVATION_REGISTER_SUCCESS,
  INNOVATION_DETAILS_REQUEST,
  INNOVATION_DETAILS_SUCCESS,
  INNOVATION_LIST_MY_REQUEST,
  INNOVATION_LIST_MY_SUCCESS,
  INNOVATION_LIST_MY_FAIL,
  INNOVATION_LIST_MY_RESET,
  INNOVATION_COMPLETE_REQUEST,
  INNOVATION_COMPLETE_SUCCESS,
  INNOVATION_COMPLETE_FAIL,
  INNOVATION_COMPLETE_RESET,
  INNOVATION_LIST_REQUEST,
  INNOVATION_LIST_SUCCESS,
  INNOVATION_LIST_FAIL,
  INNOVATION_DETAILS_FAIL,
  INNOVATION_REGISTER_RESET,
} from "./innovationConstants";

export const innovationRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case INNOVATION_REGISTER_REQUEST:
      return { loading: true };
    case INNOVATION_REGISTER_SUCCESS:
      return {
        loading: false,
        innovationInfo: action.payload,
        successMessage:
          "we have recieved your registration,we will contact you through mail or phone shortly",
      };
    case INNOVATION_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case INNOVATION_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const innovationDetailsReducer = (
  state = { loading: true, innovationItems: [] },
  action
) => {
  switch (action.type) {
    case INNOVATION_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case INNOVATION_DETAILS_SUCCESS:
      return {
        loading: false,
        innovationItems: action.payload,
      };
    case INNOVATION_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const innovationListMyReducer = (
  state = { innovationItems: [] },
  action
) => {
  switch (action.type) {
    case INNOVATION_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case INNOVATION_LIST_MY_SUCCESS:
      return {
        loading: false,
        innovationItems: action.payload,
      };
    case INNOVATION_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case INNOVATION_LIST_MY_RESET:
      return { innovationItems: [] };

    default:
      return state;
  }
};

export const innovationCompleteReducer = (state = {}, action) => {
  switch (action.type) {
    case INNOVATION_COMPLETE_REQUEST:
      return {
        loading: true,
      };
    case INNOVATION_COMPLETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case INNOVATION_COMPLETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case INNOVATION_COMPLETE_RESET:
      return {};
    default:
      return state;
  }
};

export const innovationListReducer = (state = { innovations: [] }, action) => {
  switch (action.type) {
    case INNOVATION_LIST_REQUEST:
      return {
        loading: true,
      };
    case INNOVATION_LIST_SUCCESS:
      return {
        loading: false,
        innovations: action.payload,
      };
    case INNOVATION_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
