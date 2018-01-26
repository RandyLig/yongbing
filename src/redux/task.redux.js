import axios from 'axios'
// import { getRedirectUrl } from '../util.js'

const TASK_LIST = 'TASK_LIST'
const ERROR_MSG = 'ERROR_MSG'
const PUBLISH_SUCCESS = 'PUBLISH_SUCCESS'
const initstate = {
    tasklist: []
}


export function task(state = initstate, action) {
    switch (action.type) {
        case TASK_LIST:
            return {
                ...state, tasklist: [...state.tasklist, action.payload]
            }
        case PUBLISH_SUCCESS:
            return {
                ...state, ...action.payload
            }
        case ERROR_MSG:
            return {
                ...state, errmsg: action.errmsg, msg: ''
            }
        default: return state
    }
}
function publishSuccess(data) {
    return { payload: data, type: PUBLISH_SUCCESS }
}

function errorMsg(errmsg) {
    return { errmsg, type: ERROR_MSG }
}

export function taskList(data) {
    return { type: TASK_LIST, payload: data }
}

export function getTaskList(type) {
    return dispatch => {
        axios.get('/user/tasklist').then(
            res => {
                if (res.data.code === 0) {
                    dispatch(taskList(res.data.data))
                }
            }
        )
    }
}

export function addTask({ taskname, detail, time, reward }) {
    if (!taskname) {
        return errorMsg('必须输入标题')
    }
    return dispatch => {
        axios.post('/user/addTask', { taskname, detail, time, reward }).then(
            res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(taskList({ taskname, detail, time, reward }))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}