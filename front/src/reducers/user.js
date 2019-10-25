import {SOCKET_RESPONSE, DEL_USER} from '../actions/action';

export const initialState = {
    user:{
        validateStatus:{
            loginIs: "base", 
            passwordIs: false,
        },
        userDel:false
    }
};

export function userReducer(state = initialState, action ) {

    switch (action.type) {
        case SOCKET_RESPONSE:
            return {...state, user:{...state.user, validateStatus:action.payload}}
        case DEL_USER:
            return {...state, user:{...state.user, userDel:action.payload}}
        default:
            return state
    }
}