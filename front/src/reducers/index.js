import { combineReducers } from "redux";
import { userReducer } from "./user";
import { loginMessageReducer } from "./userMessage";

export const rootReducer = combineReducers({
  user: userReducer,
  loginMessage:loginMessageReducer,
});
