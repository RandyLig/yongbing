import React from 'react'
import QueueAnim from 'rc-queue-anim';
import { Card, WingBlank, WhiteSpace, NavBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { accepttask, getTaskList } from '../../redux/task.redux'

@withRouter
@connect(
    state => state,
    { accepttask, getTaskList }
)
//佣兵所看到的的任务列表
class Published2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.accept = this.accept.bind(this)
    }
    static PropTypes = {
        tasklist: PropTypes.array.isRequired
    }
    //请求执行任务
    accept(v) {
        // console.log(v._id)
        const userid = this.props.user._id
        this.props.accepttask(v._id, userid)

    }
    handleChange(v) {
        this.props.history.push(`/chat/${v._id}`)
    }
    componentDidMount() {
        //获取任务的数据
        this.props.getTaskList()
    }
    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    leftContent="返回"
                    onLeftClick={() => this.props.history.go(-1)}>已发布任务</NavBar>
                <WingBlank>
                    <WhiteSpace />
                    <WhiteSpace />
                    {this.props.task.tasklist.map(v => {
                        return v.done ? '' : (<div key={v._id}>
                            <WhiteSpace />
                            <QueueAnim>
                                <Card key={v._id}>
                                    {/* //显示佣兵 */}
                                    <Card.Header
                                        title={v.taskname}
                                        // thumb={require(`../img/${v.avatar}.png`)}
                                        extra={<a onClick={() => this.accept(v)} size="small" type="ghost">接受</a>}
                                    />
                                    <Card.Body>
                                        {v.detail}
                                    </Card.Body>
                                    <Card.Footer
                                        content={v.yongbingid ? v.yongbingid : "暂无人接受"}
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

export default Published2