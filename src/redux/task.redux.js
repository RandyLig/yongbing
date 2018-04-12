import axios from 'axios'
// import { getRedirectUrl } from '../util.js'

const TASK_LIST = 'TASK_LIST'
const ERROR_MSG = 'ERROR_MSG'
const TASK_DONE = 'TASK_DONE'
const PUBLISH_SUCCESS = 'PUBLISH_SUCCESS'
const ACCEPT_TASK = 'ACCEPT_TASK'
const initstate = {
    tasklist: []
}


export function task(state = initstate, action) {
    switch (action.type) {
        case TASK_LIST:
            return {
                ...state, tasklist: action.payload
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
            const { taskid } = action.payload
            const id1 = action.payload.data._id
            // console.log(taskid, id1)
            return {
                ...state, tasklist: state.tasklist.map(v => ({
                    ...v,
                    done: v._id === taskid ? true : v.done
                }))
            }
        case ACCEPT_TASK:
            const { yongbingid, _id } = action.payload.data
            return {
                ...state, tasklist: state.tasklist.map(v => ({
                    ...v,
                    yongbingid: action.payload.data.taskid === _id ? yongbingid : v.yongbingid
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
function hadDone({ taskid, userid, data }) {
    return { type: 'TASK_DONE', payload: { taskid, userid, data } }
}
function acceptTask({ taskid, data }) {
    return { type: 'ACCEPT_TASK', payload: { taskid, data } }
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

export function addTask({ taskname, detail, reward, from, yongbingid, files }) {
    if (!taskname) {
        return errorMsg('必须输入标题')
    }
    return dispatch => {
        axios.post('/user/addTask', { taskname, detail, reward, from, yongbingid, files }).then(
            res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(publishSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}

// 任务完成函数
export function haddone(taskid) {
    return (dispatch, getState) => {
        axios.post('/user/haddone', { taskid }).then(
            res => {
                const userid = getState().user._id
                if (res.status === 200 && res.data.code === 0) {
                    // console.log(getState())
                    dispatch(hadDone({ taskid, userid, data: res.data.data }))
                }
            }
        )
    }
}
// 佣兵接受任务
export function accepttask(taskid) {
    return (dispatch, getState) => {
        // 获取当前任务的独一标识id
        // const taskid = getState().task.tasklist._id
        axios.post('/user/accepttask', { taskid }).then(
            res => {
                if (res.status === 200 && res.data.code === 0) {
                    // console.log(getState())
                    dispatch(acceptTask({ taskid, data: res.data.data }))
                }
            }
        )
    }
}