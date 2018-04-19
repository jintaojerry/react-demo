import { combineReducers } from "redux";
import collapsed from "./slideBar/slideBarReducer";
import aaReducer from "./aa/aaReducer";
import bbReducer from "./bb/bbReducer";

export default combineReducers({
  collapsed,
  aaReducer,
  bbReducer
});
