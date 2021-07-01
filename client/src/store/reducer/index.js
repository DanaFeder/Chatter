//import the reducer and call the action object
import { ProcessReducer } from "./process";
import { combineReducers } from "redux";
const rootReducers = combineReducers({
  ProcessReducer: ProcessReducer,
});

export default rootReducers;
