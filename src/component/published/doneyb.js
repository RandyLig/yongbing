import React from 'react'
import QueueAnim from 'rc-queue-anim';
import { Card, WingBlank, WhiteSpace, NavBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { formatDate } from '../../util'
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
        const tasklist = this.props.task.tasklist.filter(v => v.yongbing === name)
        return (
            <div>
                <NavBar
                    mode="dark"
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
                                        thumb={v.files[0].url ? v.files[0].url : '加载出错'}
                                        thumbStyle={{ height: '56px', width: '50px' }}
                                        extra={<a onClick={() => console.log('评价')} size="small" type="ghost">查看评价</a>}
                                    />
                                    <Card.Body>
                                        {v.detail}
                                    </Card.Body>
                                    <Card.Footer
                                        content={v.yongbing ? v.yongbing : "出错了"}
                                        extra={'完成时间:' + formatDate(new Date(v.create_time))}                                        
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