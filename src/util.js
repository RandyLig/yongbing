

export function getRedirectUrl({ type, avatar }) {
    //根据用户信息跳转至不同路由
    let url = (type === 'boss') ? '/boss' : '/yongbing'
    if (!avatar) {
        url += 'info'
    }
    return url
}

export function getChatId(userid, targetid) {
    return [userid, targetid].sort().join('_');
}

//筛选佣兵列表
export function filter(value, arr) {
    if (value === 'age') {
        const Group = {}
        arr.forEach(v => {
            Group[v.type] = Group[v.type] || []
            Group[v.type].push(v)
        })

        //将佣兵列表按年龄排序
        const userList = Object.values(Group).sort((a, b) => {
            const a_last = this.getLast(a).age
            const b_last = this.getLast(b).age
            return b_last - a_last
        })
        console.log(userList)
        return userList[0];
    }
}