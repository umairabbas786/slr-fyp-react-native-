import { combineReducers } from "redux";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
    userDetails: userReducer
});

export default reducers

