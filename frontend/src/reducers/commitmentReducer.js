import { CAL_ASSIGNED_FAIL, CAL_ASSIGNED_REQUEST, CAL_ASSIGNED_RESET, CAL_ASSIGNED_SUCCESS, CAL_ORDERS_FAIL, CAL_ORDERS_REQUEST, CAL_ORDERS_RESET, CAL_ORDERS_SUCCESS, CAL_UPLOAD_FAIL, CAL_UPLOAD_REQUEST, CAL_UPLOAD_RESET, CAL_UPLOAD_SUCCESS, COMMENT_ADD_FAIL, COMMENT_ADD_REQUEST, COMMENT_ADD_RESET, COMMENT_ADD_SUCCESS, COMMITMENT_COMPLETE_FAIL, COMMITMENT_COMPLETE_REQUEST, COMMITMENT_COMPLETE_RESET, COMMITMENT_COMPLETE_SUCCESS, COMMITMENT_DETAILS_FAIL, COMMITMENT_DETAILS_REQUEST, COMMITMENT_DETAILS_SUCCESS, COMMITMENT_LIST_FAIL, COMMITMENT_LIST_MY_FAIL, COMMITMENT_LIST_MY_REQUEST, COMMITMENT_LIST_MY_RESET, COMMITMENT_LIST_MY_SUCCESS, COMMITMENT_LIST_REQUEST, COMMITMENT_LIST_SUCCESS, COMMITMENT_REGISTER_FAIL, COMMITMENT_REGISTER_REQUEST, COMMITMENT_REGISTER_RESET, COMMITMENT_REGISTER_SUCCESS, READER_ASSIGNED_FAIL, READER_ASSIGNED_REQUEST, READER_ASSIGNED_RESET, READER_ASSIGNED_SUCCESS, READER_ORDERS_FAIL, READER_ORDERS_REQUEST, READER_ORDERS_RESET, READER_ORDERS_SUCCESS, READER_SELECT_FAIL, READER_SELECT_REQUEST, READER_SELECT_RESET, READER_SELECT_SUCCESS } from './commitmentConstants'

export const commitmentRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case COMMITMENT_REGISTER_REQUEST:
        return { loading: true };
      case COMMITMENT_REGISTER_SUCCESS:
        return {
          loading: false,
          successMessage:
            "we have recieved your registration,we will contact you through mail or phone shortly",
        };
      case COMMITMENT_REGISTER_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case COMMITMENT_REGISTER_RESET:
        return{}  
  
      default:
        return state;
    }
  };

  export const commitmentDetailsReducer = (
    state = { loading: true, commitmentItems: [] },
    action
  ) => {
    switch (action.type) {
      case COMMITMENT_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case COMMITMENT_DETAILS_SUCCESS:
        return {
          loading: false,
          commitmentItems: action.payload,
        };
      case COMMITMENT_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const commitmentlListMyReducer = (state = { commitmentItems: [] }, action) => {
    switch (action.type) {
      case COMMITMENT_LIST_MY_REQUEST:
        return {
          loading: true,
        };
      case COMMITMENT_LIST_MY_SUCCESS:
        return {
          loading: false,
          commitmentItems: action.payload,
        };
      case COMMITMENT_LIST_MY_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case COMMITMENT_LIST_MY_RESET:
        return { commitmentItems: [] };
  
      default:
        return state;
    }
  };
  
  export const commitmentCompleteReducer = (state = {}, action) => {
    switch (action.type) {
      case COMMITMENT_COMPLETE_REQUEST:
        return {
          loading: true,
        };
      case COMMITMENT_COMPLETE_SUCCESS:
        return {
          loading: false,
          success: true,
        };
      case COMMITMENT_COMPLETE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case COMMITMENT_COMPLETE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const commitmentListReducer = (state = { commitments: [] }, action) => {
    switch (action.type) {
      case COMMITMENT_LIST_REQUEST:
        return {
          loading: true,
        };
      case COMMITMENT_LIST_SUCCESS:
        return {
          loading: false,
          commitments: action.payload,
        };
      case COMMITMENT_LIST_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const calAssignedReducer = (state = {}, action) => {
    switch (action.type) {
      case CAL_ASSIGNED_REQUEST:
        return {
          loading: true,
        };
      case CAL_ASSIGNED_SUCCESS:
        return {
          loading: false,
          success: true,
        };
      case CAL_ASSIGNED_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CAL_ASSIGNED_RESET:
        return {};
      default:
        return state;
    }
  };
   
  export const readerAssignedReducer = (state = {}, action) => {
    switch (action.type) {
      case READER_ASSIGNED_REQUEST:
        return {
          loading: true,
        };
      case READER_ASSIGNED_SUCCESS:
        return {
          loading: false,
          success: true,
        };
      case READER_ASSIGNED_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case READER_ASSIGNED_RESET:
        return {};
      default:
        return state;
    }
  };  

  export const calOrdersReducer = (state = { calOrders: [] }, action) => {
    switch (action.type) {
      case CAL_ORDERS_REQUEST:
        return {
          loading: true,
        };
      case CAL_ORDERS_SUCCESS:
        return {
          loading: false,
          calOrders: action.payload,
        };
      case CAL_ORDERS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CAL_ORDERS_RESET:
        return {  };
  
      default:
        return state;
    }
  };
  export const readerOrdersReducer = (state = { readerOrders: [] }, action) => {
    switch (action.type) {
      case READER_ORDERS_REQUEST:
        return {
          loading: true,
        };
      case READER_ORDERS_SUCCESS:
        return {
          loading: false,
          readerOrders: action.payload,
        };
      case READER_ORDERS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case READER_ORDERS_RESET:
        return {  };
  
      default:
        return state;
    }
  };
  
  export const calUploadReducer = (state = {}, action) => {
    switch (action.type) {
      case CAL_UPLOAD_REQUEST:
        return { loading: true };
      case CAL_UPLOAD_SUCCESS:
        return {
          loading: false,
          success:true
        };
      case CAL_UPLOAD_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CAL_UPLOAD_RESET:
        return{}  
  
      default:
        return state;
    }
  };

  export const readerSelectReducer = (state = {}, action) => {
    switch (action.type) {
      case READER_SELECT_REQUEST:
        return { loading: true };
      case READER_SELECT_SUCCESS:
        return {
          loading: false,
          success:true
        };
      case READER_SELECT_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case READER_SELECT_RESET:
        return{}  
  
      default:
        return state;
    }
  };

  export const commentAddReducer = (state = {}, action) => {
    switch (action.type) {
      case COMMENT_ADD_REQUEST:
        return { loading: true };
      case COMMENT_ADD_SUCCESS:
        return {
          loading: false,
          successMessage:
            "comment added successfuly",
        };
      case COMMENT_ADD_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case COMMENT_ADD_RESET:
        return{}  
  
      default:
        return state;
    }
  };
