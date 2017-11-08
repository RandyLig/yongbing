

export function getRedirectUrl({ type, avatar }) {
    //根据用户信息跳转至不同路由
    let url = (type === 'boss') ? '/boss' : '/yongbing'
    if (!avatar) {
        url += 'info'
    }
    return url
}