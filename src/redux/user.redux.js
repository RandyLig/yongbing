import axios from 'axios'
import { getRedirectUrl } from '../util.js'



const ERROR_MSG = 'ERROR_MSG'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGIN_DATA = 'LOGIN_DATA'
const LOGO_OUT = 'LOGO_OUT'
//补全自己信息
const COMPELETEINFO = 'COMPELETEINFO'
const initstate = {
    redirectTo: '',
    errmsg: '',
    msg: '',
    user: '',
    type: ''
}


export function user(state = initstate, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state, msg: '登陆成功', redirectTo: getRedirectUrl(action.payload), ...action.payload
            }
        case ERROR_MSG:
            return {
                ...state, errmsg: action.errmsg, msg: ''
            }
        case LOGIN_DATA: return {
            ...state, ...action.payload
        }
        case LOGO_OUT: return {
            ...initstate, redirectTo: '/login'
        }
        case COMPELETEINFO: return {
            ...state, ...action.payload
        }
        default: return state
    }
}
// function registerSucess(data) {
//     return { payload: data, type: REGISTER_SUCESS }
// }
// function loginSucess(data) {
//     return { payload: data, type: LOGIN_SUCESS }
// }
function authSuccess(data) {
    return { payload: data, type: AUTH_SUCCESS }
}
function compeleteInfo(data) {
    return { payload: data, type: COMPELETEINFO }
}
function errorMsg(errmsg) {
    return { errmsg, type: ERROR_MSG }
}
export function loadData(data) {
    return { type: LOGIN_DATA, payload: data }
}

export function logout() {
    return { type: LOGO_OUT }
}
//登录时填自己的信息
export function update(data) {
    return dispatch => {
        axios.post('/user/update', data).then(
            res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}
//登录后完善自己的信息
export function updateInfo(data) {
    return dispatch => {
        axios.post('/user/update', data).then(
            res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(compeleteInfo(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
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
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}



export function register({ user, pwd, repwd, type, hasError }) {
    if (!user || !pwd) {
        return errorMsg('必须输入用户密码')
    }
    if (pwd !== repwd) {
        return errorMsg('密码必须一致')
    }
    if (hasError) {
        return errorMsg('必须填正确信息')
    }
    return dispatch => {
        axios.post('/user/register', { user, pwd, type }).then(
            res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess({ user, pwd, type }))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}