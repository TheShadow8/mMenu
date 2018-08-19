import { SET_CURRENT_USER, IS_REGISTED } from '../actions/types'
import isEmpty from '../validation/is-empty'

const initialState = {
    isAuthenticated: false,
    user: {},
    isRegisted: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case IS_REGISTED:
            return {
                ...state,
                isRegisted: action.payload
            }
        default:
            return state;
    }
}