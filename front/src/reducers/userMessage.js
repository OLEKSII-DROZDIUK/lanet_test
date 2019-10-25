import {CLEAR_ERROR_LOGIN, SET_ERROR_LOGIN} from '../actions/action';

export const initialState = {
    loginMessage:{
        messageError:"",
        statusError: false
    }
};

export function loginMessageReducer(state = initialState, action ) {
    
    switch (action.type) {
        case SET_ERROR_LOGIN :
            return {...state, loginMessage:{...state.loginMessage, ...action.payload}}
        case  CLEAR_ERROR_LOGIN:
            return {...state, loginMessage:{...state.loginMessage, ...action.payload}}
        default:
            return state
    }
}