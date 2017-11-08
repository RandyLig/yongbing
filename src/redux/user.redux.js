import axios from 'axios'
import { getRedirectUrl } from '../util.js'


const REGISTER_SUCESS = 'REGISTER_SUCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCESS = 'LOGIN_SUCESS'
const LOGIN_DATA = 'LOGIN_DATA'
const initstate = {
    isAuth: false,
    msg: '',
    user: '',

    type: ''
}


export function user(state = initstate, action) {
    switch (action.type) {
        case LOGIN_SUCESS:
            return {
                ...state, msg: '', isAuth: true, redirectTo: getRedirectUrl(action.payload), ...action.payload
            }
        case REGISTER_SUCESS:
            return {
                ...state, msg: '', isAuth: true, redirectTo: getRedirectUrl(action.payload), ...action.payload
            }
        case ERROR_MSG:
            return {
                ...state, msg: '', isAuth: false, msg: action.msg
            }
        case LOGIN_DATA: return {
            ...state, ...action.payload
        }
        default: return state
    }
}
function registerSucess(data) {
    return { payload: data, type: REGISTER_SUCESS }
}
function loginSucess(data) {
    return { payload: data, type: LOGIN_SUCESS }
}
function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}
export function loadData(data) {
    return { type: LOGIN_DATA, payload: data }
}




//登录注册方法

export function login({ user, pwd, repwd, type }) {
    if (!user || !pwd) {
        return errorMsg('必须输入用户密码')
    }
    return dispatch => {
        axios.post('/user/login', { user, pwd }).then(
            res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(loginSucess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}



export function register({ user, pwd, repwd, type }) {
    if (!user || !pwd) {
        return errorMsg('必须输入用户密码')
    }
    if (pwd !== repwd) {
        return errorMsg('密码必须一致')
    }
    return dispatch => {
        axios.post('/user/register', { user, pwd, type }).then(
            res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(registerSucess({ user, pwd, type }))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}