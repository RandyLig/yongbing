import React from 'react'
import QueueAnim from 'rc-queue-anim';
import { Card, WingBlank, WhiteSpace, NavBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import { haddone } from '../../redux/task.redux'

@withRouter
@connect(
    state => state,
    {}
)

class Doing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.Submit = this.Submit.bind(this)
    }
    static PropTypes = {
        tasklist: PropTypes.array.isRequired
    }
    Submit(v) {
        console.log('正在进行中等待boss确认完成')
        // this.props.haddone(v._id)
    }
    handleChange(v) {
        this.props.history.push(`/chat/${v._id}`)
    }
    render() {
        // 過濾其他用戶發佈的任務，获取当前佣兵接取的，正在进行的任务
        // const userid = this.props.user._id
        const nickname = this.props.user.nickname
        const tasklist = this.props.task.tasklist.filter(v => v.yongbing === nickname)

        return (
            <div>
                <NavBar
                    mode="dark"
                    leftContent="返回"
                    onLeftClick={() => this.props.history.go(-1)}>正在进行的任务</NavBar>
                <WingBlank>
                    <WhiteSpace />
                    <WhiteSpace />
                    {tasklist.map(v => {
                        return v.done ? '' : (<div key={v._id}>
                            <WhiteSpace />
                            <QueueAnim>
                                <Card key={v._id}>
                                    {/* //显示boss */}
                                    <Card.Header
                                        title={v.taskname}
                                        thumb={v.files[0].url ? v.files[0].url : '加载出错'}
                                        thumbStyle={{ height: '56px', width: '50px' }}
                                        extra={<a onClick={() => this.Submit(v)} size="small" type="ghost">正在进行中</a>}
                                    />
                                    <Card.Body>
                                        {v.detail}
                                    </Card.Body>
                                    <Card.Footer
                                        content={'执行人:' + (v.yongbing ? v.yongbing : "出错了")}
                                    >
                                    </Card.Footer>
                                </Card>
                            </QueueAnim>
                        </div>)
                    })}

                </WingBlank>
            </div>
        )
    }
}

export default Doing