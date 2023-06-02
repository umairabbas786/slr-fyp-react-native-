import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { postReducer } from "./postReducer";

const reducers = combineReducers({
    userDetails: userReducer,
    userPosts: postReducer
});

export default reducers

