import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { postReducer } from "./postReducer";
import { allPostReducer } from "./allPostReducer";

const reducers = combineReducers({
    userDetails: userReducer,
    userPosts: postReducer,
    allPosts: allPostReducer
});

export default reducers

