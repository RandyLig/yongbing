import axios from 'axios'
import { filter } from '../util'
const USER_LIST = 'USER_LIST'
const FILTER_USERLIST = 'FILTER_USERLIST'
const initstate = {
    userlist: [],
}


export function chatuser(state = initstate, action) {
    switch (action.type) {
        case USER_LIST:
            return {
                ...state, userlist: action.payload
            }
        case FILTER_USERLIST:
            const { filterValue } = action.payload
            return {
                ...state, userlist: filter(filterValue, action.payload.data)
            }
        default: return state
    }
}

export function userList(data) {
    return { type: USER_LIST, payload: data }
}
function filteruserList(data, filterValue) {
    return { type: FILTER_USERLIST, payload: { data, filterValue } }
}

export function getUserList(type) {
    return dispatch => {
        axios.get('/user/list?type=' + type).then(
            res => {
                if (res.data.code === 0) {
                    dispatch(userList(res.data.data))
                }
            }
        )
    }
}

export function filterUserList(type, filterValue) {
    return dispatch => {
        axios.get('/user/list?type=' + type, filterValue).then(
            res => {
                if (res.data.code === 0) {
                    dispatch(filteruserList(res.data.data, filterValue))
                }
            }
        )
    }
}

