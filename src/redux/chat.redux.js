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
    unread: 0
}


export function chat(state = initstate, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state, chatMsg: action.payload, unread: action.payload.filter(v => !v.read).length
            }
        case MSG_RECIVE:
            return {
                ...state, chatMsg: [...state.chatMsg, action.payload], unread: state.unread + 1
            }
        // case MSG_READ:
        //     return {
        //         ...state, userlist: action.payload
        //     }
        default: return state
    }
}
function msgList(msgs) {
    return { type: 'MSG_LIST', payload: msgs }
}

function reviceMsgs(msg) {
    return { type: 'MSG_RECIVE', payload: msg }
}

export function sendMsg({ from, to, msg }) {
    //把数据放入socket
    return dispatch => { socket.emit('sendMsg', { from, to, msg }) }
}


export function reciveMsg() {
    return dispatch => {
        socket.on('reciveMsg', function (data) {
            dispatch(reviceMsgs(data))
        })
    }
}

export function getMsgList() {
    return dispatch => {
        axios.get('/user/getMsglist').then(
            res => {
                // 检验是否拿到数据
                // console.log(res.data.msgs)
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(msgList(res.data.msgs))
                }
            }
        )
    }
}
