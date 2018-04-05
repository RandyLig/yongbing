import axios from 'axios'
// import { getRedirectUrl } from '../util.js'

const TASK_LIST = 'TASK_LIST'
const ERROR_MSG = 'ERROR_MSG'
const TASK_DONE = 'TASK_DONE'
const PUBLISH_SUCCESS = 'PUBLISH_SUCCESS'
const initstate = {
    tasklist: []
}


export function task(state = initstate, action) {
    switch (action.type) {
        case TASK_LIST:
            return {
                ...state, tasklist: state.tasklist
            }
        case PUBLISH_SUCCESS:
            return {
                ...state, tasklist: [...state.tasklist, action.payload]
            }
        case ERROR_MSG:
            return {
                ...state, errmsg: action.errmsg, msg: ''
            }
        case TASK_DONE:
            const { from } = action.payload
            return {
                ...state, tasklist: state.tasklist.map(v => ({
                    ...v,
                    done: v.from === from ? v.done : true
                }))
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
function hadDone({ from, userid, num }) {
    return { type: 'TASK_DONE', payload: { from, userid, num } }
}
export function getTaskList() {
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

export function addTask({ taskname, detail, time, reward, from, done, to }) {
    if (!taskname) {
        return errorMsg('必须输入标题')
    }
    return dispatch => {
        axios.post('/user/addTask', { taskname, detail, time, reward, from, done, to }).then(
            res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(publishSuccess({ taskname, detail, time, reward, from, done, to }))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}

// 任务完成函数
export function haddone(from) {
    return (dispatch, getState) => {
        axios.post('/user/haddone', { from }).then(
            res => {
                const userid = getState().user._id
                if (res.status === 200 && res.data.code === 0) {
                    // console.log(getState())

                    //分别是当前与之聊天的用户，登录的用户，未读消息数
                    dispatch(hadDone({ from, userid, num: res.data.num }))
                }
            }
        )
    }
}