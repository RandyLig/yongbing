import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim';
@connect(
    state => state
)

class Msg extends React.Component {
    getLast(arr) {
        return arr[arr.length - 1]
    }
    render() {
        const Item = List.Item
        const msgGroup = {}
        this.props.chat.chatMsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        //将消息按创建时间排序
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last - a_last

        })
        //获取当前登录用户的id
        const userid = this.props.user._id
        const user = this.props.chat.users
        return <div>

            <List>
                {chatList.map(v => {
                    const targetid = v[0].from === userid ? v[0].to : v[0].from
                    // console.log('targetid', targetid)

                    //优化，防止遍历空时报错
                    if (!user[targetid]) {
                        return null
                    }
                    const chatItem = this.getLast(v)
                    // console.log('chatItem', chatItem)

                    //读取未读消息数
                    const unread = v.filter(v => !v.read && v.to === userid).length
                    return (
                        <QueueAnim type='bottom' key={chatItem._id}>
                            <Item
                                //当未读消息为0时过滤一下
                                extra={<Badge text={unread ? unread : ''}></Badge>}
                                key={chatItem._id + 'item'}
                                thumb={require(`../img/${user[targetid].avatar}.png`)}
                                arrow='horizontal'
                                onClick={() =>
                                    this.props.history.push(`/chat/${targetid}`)
                                }
                            >
                                {chatItem.content}
                                <Item.Brief>
                                    {user[targetid].name}
                                </Item.Brief>
                            </Item>
                        </QueueAnim>
                    )
                })}
            </List>
        </div>
    }
}

export default Msg