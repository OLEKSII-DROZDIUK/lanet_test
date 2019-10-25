import io from "socket.io-client";
import axios from 'axios';

export const ADD_USER = "ADD_USER";
export const DEL_USER = "DEL_USER";
export const LOGIN_USER = "LOGIN_USER";

export const SOCKET_RESPONSE = "SOCKET_RESPONSE";

export const SET_ERROR_LOGIN = "SET_ERROR_LOGIN";
export const CLEAR_ERROR_LOGIN = "CLEAR_ERROR_LOGIN";


export function socketCheckUser(login, password) {
    const socket = io("/");

    socket.emit('userData', {login, password})

    return dispatch => {
        socket.on("userStatus", data => {

            dispatch({
                type: SOCKET_RESPONSE,
                payload: data  
            })
            socket.disconnect();
        });
    }
}

export function addUser(login, password) {

    return dispatch => {
        axios.post("/authentication/registration",{
        data:{login, password}
        })
        .then(res => {
            if(res.status === 200) {
                dispatch({
                    type: ADD_USER
                })
            }     
        })
        .catch((error) => {

            if(!error.response){
                dispatch(messageLoginFormOn("Рекомендуэмо перезавантажити сторінку"));
            } else if(error.response.data){
                dispatch(messageLoginFormOn(error.response.data.message));
            } else {
                dispatch(messageLoginFormOn(error.message));
            } 
        });
    }
}

export function delUser(login, password) {

    return dispatch => {
        axios.delete("/authentication/del",{
        data:{login, password}
        })
        .then(res => {
            if(res.status === 200) {
                dispatch({
                    type: DEL_USER,
                    payload: res.data.userDel
                })
            }     
        })
        .catch((error) => {
            
            if(error.response.data.message){
                dispatch(messageLoginFormOn(error.response.data.message));
            } else {
                dispatch(messageLoginFormOn(error.message));
            }   
        });
    }
}

export function loginUser(login, password) {
    return dispatch => {
        axios.post("/authentication/login",{
        data:{login, password}
        })
        .then(res => {
            if(res.status === 200) {
                dispatch({
                    type: LOGIN_USER
                })
            } 
        })
        .catch((error) => {
            
            if(error.response.data.message){
                dispatch(messageLoginFormOn(error.response.data.message));
            } else {
                dispatch(messageLoginFormOn(error.message));
            }   
        });
    }
}

export function messageLoginFormOn(message) {
    
    return dispatch => {
        dispatch({
            type: SET_ERROR_LOGIN,
            payload:{messageError:message, statusError: true}
        });

        setTimeout(() => {
            dispatch(messageLoginFormOff());
        }, 5000);
    };
}

export function messageLoginFormOff() {
    
    return  dispatch => {
        dispatch({
            type: CLEAR_ERROR_LOGIN,
            payload: {messageError:"", statusError: false}
        });
    };
}