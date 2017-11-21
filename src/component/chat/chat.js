import React from 'react'
import io from 'socket.io-client'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, reciveMsg, hadread } from '../../redux/chat.redux'
import { getChatId } from '../../util'
// const socket = io('ws://localhost:9093')

@connect(
    state => state,
    { getMsgList, sendMsg, reciveMsg, hadread }
)

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: [],
            showEmoji: false
        }
        this.Submit = this.Submit.bind(this)
    }
    componentDidMount() {
        if (!this.props.chat.chatMsg.length) {
            this.props.getMsgList()
            this.props.reciveMsg()
        }
        const from = this.props.match.params.user
        // console.log('from', from)
        this.props.hadread(from)
        // socket.on('reciveMsg', (data) => {
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })
    }
    //退出聊天时执行
    componentWillUnmount() {
        const from = this.props.match.params.user
        // 
        this.props.hadread(from)
    }
    fixCarousel() {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }
    Submit() {
        // socket.emit('sendMsg', { text: this.state.text })
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({ from, to, msg })
        // this.props.getMsgList()
        this.setState({ text: '' })
        // console.log(this.state.text)
    }
    render() {
        const emoji = '😀 😁 😎 😂 😃 😄 😅 😉 😊 😋 😍 😘 😗 😙 😐 😑 😶 😏 😣 😥 😮 😯 😪 😫 😛 😜 😝 😒 😖 😤 😷 😬 😵 😱 😈 🎅 💀'.split(' ').filter(v => v).map(v => ({ text: v }))
        const user = this.props.match.params.user
        const users = this.props.chat.users
        //引入util方法
        const chatid = getChatId(this.props.user._id, user)
        //过滤其他用户的数据
        const chatMsg = this.props.chat.chatMsg.filter(v => v.chatid === chatid)
        // console.log(user)
        //没有这句则会报错
        if (!users[user]) {
            return null
        }
        return (
            <div className='chat'>
                <div>
                    <NavBar
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.goBack()}
                    >{users[user].name}</NavBar>
                    {chatMsg.map(v => {
                        const avatar = require(`../img/${users[v.from].avatar}.png`)
                        return user === v.from ?
                            (<List key={v._id}>
                                <List.Item
                                    thumb={avatar}
                                >
                                    {v.content}
                                </List.Item>
                            </List>)
                            : (<List key={v._id}>
                                <List.Item
                                    extra={<img alt='' src={avatar} />}
                                    className="chat_listItem">
                                    {v.content}
                                </List.Item>
                            </List>)
                    })}
                </div>
                <div className='submitMsg'>
                    <List>
                        <InputItem
                            placeholder='输入消息....'
                            value={this.state.text}
                            onChange={v => this.setState({ text: v })}
                            extra={<div><span style={{ marginRight: 10 }} onClick={() => {
                                this.setState({
                                    showEmoji: !this.state.showEmoji
                                })
                                this.fixCarousel()
                            }}>👀</span>
                                <span onClick={this.Submit}>发送</span>
                            </div>}
                        >
                        </InputItem>
                    </List>
                    {this.state.showEmoji ? <Grid
                        onClick={el => {
                            this.setState({
                                text: this.state.text + el.text
                            })
                        }}
                        data={emoji}
                        columnNum={8}
                        isCarousel={true}
                        carouselMaxRow={4}
                    >
                    </Grid> : null}
                </div>

            </div >
        )
    }
}

export default Chat