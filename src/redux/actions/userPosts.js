import { ActionTypes } from "../constants/actionTypes"

export const setPost = (data) => {
    return {
        type: ActionTypes.SET_POST,
        payload: data
    }
}
