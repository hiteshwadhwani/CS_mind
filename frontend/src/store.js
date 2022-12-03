import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userCalListReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userReaderListReducer,
  userRegisterReducer,
  userResetEmail,
  userResetPassword,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducer";
import {
  innovationCompleteReducer,
  innovationDetailsReducer,
  innovationListMyReducer,
  innovationListReducer,
  innovationRegisterReducer,
} from "./reducers/innovationReducer";
import {
  aimCompleteReducer,
  aimDetailsReducer,
  aimListMyReducer,
  aimListReducer,
  aimRegisterReducer,
} from "./reducers/aimReducer";
import {
  counselCompleteReducer,
  counselDetailsReducer,
  counselListMyReducer,
  counselListReducer,
  counselRegisterReducer,
} from "./reducers/counselReducer";
import {
  calAssignedReducer,
  calOrdersReducer,
  calUploadReducer,
  commentAddReducer,
  commitmentCompleteReducer,
  commitmentDetailsReducer,
  commitmentListReducer,
  commitmentlListMyReducer,
  commitmentRegisterReducer,
  readerAssignedReducer,
  readerOrdersReducer,
  readerSelectReducer,
} from "./reducers/commitmentReducer";
import {facultyCreateReducer,facultyDeleteReducer,facultyDetailsReducer,facultyListReducer,facultyUpdateReducer} from './reducers/facultyReducer';
import { sharpenCompleteReducer, sharpenDetailsReducer, sharpenListMyReducer, sharpenListReducer, sharpenRegisterReducer } from "./reducers/sharpenReducer";
import { contentDetailsReducer, contentUpdateReducer } from "./reducers/contentReducer";
import { internCreateReducer, internDeleteReducer, internDetailsReducer, internListReducer, internUpdateReducer } from "./reducers/internReducer";
import { internFormDetailsReducer, internFormListReducer, internFormRegisterReducer } from "./reducers/internFormReducer";
import {affCreateReducer,affDeleteReducer,affDetailsReducer,affListReducer,affUpdateReducer}  from './reducers/affReducer';
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userResetEmail: userResetEmail,
  userResetPassword: userResetPassword,
  userList: userListReducer,
  userCalList: userCalListReducer,
  userReaderList: userReaderListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  innovationRegister: innovationRegisterReducer,
  innovationListMy: innovationListMyReducer,
  innovationDetails: innovationDetailsReducer,
  innovationComplete: innovationCompleteReducer,
  innovationList: innovationListReducer,
  aimDetails: aimDetailsReducer,
  aimRegister: aimRegisterReducer,
  aimListMy: aimListMyReducer,
  aimComplete: aimCompleteReducer,
  aimList: aimListReducer,
  counselRegister: counselRegisterReducer,
  counselDetails: counselDetailsReducer,
  counselListMy: counselListMyReducer,
  counselComplete: counselCompleteReducer,
  counselList: counselListReducer,
  commitmentRegister: commitmentRegisterReducer,
  commitmentDetails: commitmentDetailsReducer,
  commitmentListMy: commitmentlListMyReducer,
  commitmentComplete: commitmentCompleteReducer,
  commitmentList: commitmentListReducer,
  commentAdd: commentAddReducer,
  calAssigned: calAssignedReducer,
  calOrders: calOrdersReducer,
  calUpload: calUploadReducer,
  readerAssigned: readerAssignedReducer,
  readerOrders: readerOrdersReducer,
  readerSelect: readerSelectReducer,
  sharpenDetails: sharpenDetailsReducer,
  sharpenRegister: sharpenRegisterReducer,
  sharpenListMy: sharpenListMyReducer,
  sharpenComplete: sharpenCompleteReducer,
  sharpenList: sharpenListReducer,
  contentDetails:contentDetailsReducer,
  contentUpdate:contentUpdateReducer,
  internCreate:internCreateReducer,
  internDelete:internDeleteReducer,
  internUpdate:internUpdateReducer,
  internDetails:internDetailsReducer,
  internList:internListReducer,
  facultyCreate:facultyCreateReducer,
  facultyDelete:facultyDeleteReducer,
  facultyUpdate:facultyUpdateReducer,
  facultyDetails:facultyDetailsReducer,
  facultyList:facultyListReducer,
  affCreate:affCreateReducer,
  affDelete:affDeleteReducer,
  affUpdate:affUpdateReducer,
  affDetails:affDetailsReducer,
  affList:affListReducer,
  internFormDetails:internFormDetailsReducer,
  internFormRegister:internFormRegisterReducer,
  internFormList:internFormListReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
