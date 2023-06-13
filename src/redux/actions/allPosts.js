import { ActionTypes } from "../constants/actionTypes"

export const setPosts = (data) => {
    return {
        type: ActionTypes.SET_POSTS,
        payload: data
    }
}
