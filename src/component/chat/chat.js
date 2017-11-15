import React from 'react'
import io from 'socket.io-client'
import { List, InputItem, NabBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, reciveMsg } from '../../redux/chat.redux'

const socket = io('ws://localhost:9093')
@connect(
    state => state,
    { getMsgList, sendMsg, reciveMsg }
)

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: []
        }
        this.Submit = this.Submit.bind(this)
    }
    componentDidMount() {
        this.props.getMsgList()
        this.props.reciveMsg()
        // socket.on('reciveMsg', (data) => {
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })
    }
    Submit() {
        // socket.emit('sendMsg', { text: this.state.text })
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({ from, to, msg })
        this.setState({ text: '' })
        // console.log(this.state.text)
    }
    render() {
        return (
            <div>
                <div>
                    {this.props.chat.chatMsg.map(v => {
                        return <p key={v._id}>{v.content}</p>
                    })}
                </div>
                <div className='submitMsg'>
                    <List>
                        <InputItem
                            placeholder='输入消息....'
                            value={this.state.text}
                            onChange={v => this.setState({ text: v })}
                            extra={<span onClick={this.Submit}>发送</span>}
                        >
                        </InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat