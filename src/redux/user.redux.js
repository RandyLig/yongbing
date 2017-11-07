import axios from 'axios'

const REGISTER_SUCESS = 'REGISTER_SUCESS'
const ERROR_MSG = 'ERROR_MSG'
const initstate = {
    isAuth: false,
    msg: '',
    user: '',
    pwd: '',
    type: ''
}


export function user(state = initstate, action) {
    switch (action.type) {
        case REGISTER_SUCESS:
            return {
                ...state, msg: '', isAuth: true, ...action.payload
            }
        case ERROR_MSG:
            return {
                ...state, msg: '', isAuth: false, msg: action.msg
            }
        default: return state
    }
}
function registerSucess(data) {
    return { payload: data, type: REGISTER_SUCESS }
}
function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
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