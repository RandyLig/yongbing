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
//佣兵完成界面
class Doneyb extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        // this.Submit = this.Submit.bind(this)
    }
    static PropTypes = {
        tasklist: PropTypes.array.isRequired
    }
    // Submit() {
    //     const from = this.props.user._id
    //     this.props.haddone({ from })
    // }
    handleChange(v) {
        this.props.history.push(`/chat/${v._id}`)
    }
    render() {
        // 過濾其他用戶發佈的任務
        // const userid = this.props.user._id
        const name = this.props.user.nickname
        const tasklist = this.props.task.tasklist.filter(v => v.yongbingid === name)
        return (
            <div>
                <NavBar
                    mode="light"
                    leftContent="返回"
                    onLeftClick={() => this.props.history.go(-1)}>已完成任务</NavBar>
                <WingBlank>
                    <WhiteSpace />
                    <WhiteSpace />
                    {tasklist.map(v => {
                        return v.done ? (<div key={v._id}>
                            <WhiteSpace />
                            <QueueAnim>
                                <Card key={v.taskname}>
                                    <Card.Header
                                        title={v.taskname}
                                        thumb={''}
                                        thumbStyle={{ height: '56px', width: '50px' }}
                                        extra={<a onClick={() => console.log('评价')} size="small" type="ghost">等待评价</a>}
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
                        </div>) : ''
                    })}

                </WingBlank>
            </div>
        )
    }
}

export default Doneyb