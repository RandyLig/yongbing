import axios from 'axios'
//通过io链接后台
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

//获取聊天列表
const MSG_LIST = 'MSG_LIST'
//获取聊天消息
const MSG_RECIVE = 'MSG_RECIVE'
//获取是否已读
const MSG_READ = 'MSG_READ'

const initstate = {
    chatMsg: [],
    users: {},
    unread: 0
}


export function chat(state = initstate, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state, chatMsg: action.payload.msgs, users: action.payload.users, unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length
            }
        case MSG_RECIVE:
            const n = action.payload.userid === action.payload.to ? 1 : 0
            return {
                ...state, chatMsg: [...state.chatMsg, action.payload.msg], unread: state.unread + n
            }
        case MSG_READ:
            const { from } = action.payload
            return {
                ...state, unread: state.unread - action.payload.num, chatMsg: state.chatMsg.map(v => ({
                    ...v,
                    read: v.from === from ? true : v.read
                }))
            }
        default: return state
    }
}
function msgList(msgs, users, userid) {
    return { type: 'MSG_LIST', payload: { msgs, users, userid } }
}

function reviceMsgs(msg, userid) {
    return { type: 'MSG_RECIVE', payload: { msg, userid } }
}

function hadReadMsg({ from, userid, num }) {
    return { type: 'MSG_READ', payload: { from, userid, num } }
}
export function sendMsg({ from, to, msg }) {
    //把数据放入socket
    return dispatch => { socket.emit('sendMsg', { from, to, msg }) }
}

//客户端接收数据
export function reciveMsg() {
    return (dispatch, getState) => {
        socket.on('reciveMsg', function (data) {
            const userid = getState().user._id
            dispatch(reviceMsgs(data, userid))
        })
    }
}

export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getMsglist').then(
            res => {
                // 检验是否拿到数据
                // console.log(res.data.msgs)
                if (res.status === 200 && res.data.code === 0) {
                    // console.log(getState())
                    const userid = getState().user._id
                    dispatch(msgList(res.data.msgs, res.data.users, userid))
                }
            }
        )
    }
}
// 查看后设置取消badge   已读函数
export function hadread(from) {
    return (dispatch, getState) => {
        axios.post('/user/hadread', { from }).then(
            res => {
                const userid = getState().user._id
                if (res.status === 200 && res.data.code === 0) {
                    // console.log(getState())

                    //分别是当前与之聊天的用户，登录的用户，未读消息数
                    dispatch(hadReadMsg({ from, userid, num: res.data.num }))
                }
            }
        )
    }
}
