import { ActionTypes } from "../constants/actionTypes";

const initialState = {
    posts: [],
};

export const allPostReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_POSTS:
            return {
                ...state,
                posts: action.payload,
            };
        default:
            return state;
    }
};
