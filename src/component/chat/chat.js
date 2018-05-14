import React from 'react'
import QueueAnim from 'rc-queue-anim';
import { List, InputItem, NavBar, Icon, Grid, WhiteSpace, WingBlank, Card } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, reciveMsg, hadread } from '../../redux/chat.redux'
import { getEvaluate, getTaskListOne, getTaskList } from '../../redux/task.redux'
import { getChatId } from '../../util'
// const socket = io('ws://localhost:9093')

@connect(
    state => state,
    { getMsgList, sendMsg, reciveMsg, hadread, getEvaluate, getTaskListOne, getTaskList }
)

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.props.getEvaluate()
        this.props.getTaskList()
        this.state = {
            text: '',
            msg: [],
            showEmoji: false
        }
        this.Submit = this.Submit.bind(this)
        this.evaluateinfo = this.evaluateinfo.bind(this)
        // this.evaluate = this.evaluate.bind(this)
    }
    componentDidMount() {
        if (!this.props.chat.chatMsg.length) {
            this.props.getEvaluate()
            this.props.reciveMsg()
            this.props.getMsgList()

        }
    }
    evaluateinfo(v) {
        this.props.getTaskListOne(v.taskid)
        setTimeout(this.props.history.push(`/evaluateinfo/${v.taskid}`), 200)

    }
    //退出聊天时执行
    componentWillUnmount() {
        const to = this.props.match.params.user
        this.props.hadread(to)
    }
    // 防止antd-mobile自帶的bug
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
        if (this.state.text) {
            this.props.sendMsg({ from, to, msg })
            this.props.getMsgList()
        } else {
            console.log('请输入消息')
        }
        // this.props.getMsgList()
        this.setState({ text: '' })
        // console.log(this.state.text)
    }
    // evaluate() {
    //     this.props.history.push(`/evaluate/${chatid}`)
    // }
    render() {
        const emoji = '😀 😁 😎 😂 😃 😄 😅 😉 😊 😋 😍 😘 😗 😙 😐 😑 😶 😏 😣 😥 😮 😯 😪 😫 😛 😜 😝 😒 😖 😤 😷 😬 😵 😱 😈 🎅 💀'.split(' ').filter(v => v).map(v => ({ text: v }))
        const user = this.props.match.params.user
        const users = this.props.chat.users
        //引入util方法
        const chatid = getChatId(this.props.user._id, user)
        //过滤其他用户的数据
        const chatMsg = this.props.chat.chatMsg.filter(v => v.chatid === chatid)
        const evaluate111 = this.props.task.evaluate.filter(v => v.chatid === chatid)
        // console.log(evaluate111)
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
                    <QueueAnim>
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
                    </QueueAnim>
                </div>
                <WhiteSpace size="lg" />
                {this.props.user.type === 'boss' ? (
                    evaluate111.map(v => v.visiable ? <div key={v._id + 'evaluate'}><WhiteSpace size="lg" /> <QueueAnim key={'list'}>
                        <WingBlank>
                            <Card key={'evaluate' + v._id} onClick={() => this.props.history.push(`/evaluate/${v.taskid}`)}>
                                <Card.Header
                                    title={v.taskname + "交易完成，去评价"}
                                    thumb=""
                                    extra={<Icon type='right' color='#108ee9'></Icon>}
                                />

                            </Card>
                        </WingBlank>
                    </QueueAnim>
                        <WhiteSpace size="lg" />
                        {v.done && v.visiable ? <QueueAnim key={'list2'}>
                            <WingBlank>
                                <Card key={'evaluateinfo' + v._id}
                                    onClick={() => this.evaluateinfo(v)}>
                                    <Card.Header
                                        title="已完成评价"
                                        thumb=""
                                        extra={<Icon type='check-circle' color='#108ee9'></Icon>}
                                    />
                                </Card>
                            </WingBlank>
                        </QueueAnim> : ''}</div> : '')
                ) : ''}
                {this.props.user.type === 'yongbing' ? (evaluate111.map(v => v.done && v.visiable ? <QueueAnim key={'list2'}>
                    <WingBlank>
                        <Card key={'yongbing' + v._id}
                            onClick={() => this.props.history.push(`/evaluateinfo/${v.taskid}`)}>
                            <Card.Header
                                title="boss已完成评价"
                                thumb=""
                                extra={<Icon type='check-circle' color='#108ee9'></Icon>}
                            />
                        </Card>
                    </WingBlank>
                </QueueAnim> : '')) : ''}
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