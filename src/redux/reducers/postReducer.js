import { ActionTypes } from "../constants/actionTypes";

const initialState = {
    post: [],
};

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_POST:
            return {
                ...state,
                post: action.payload,
            };
        default:
            return state;
    }
};
