import React from 'react'
import QueueAnim from 'rc-queue-anim';
import { Button, Card, WingBlank, WhiteSpace, NavBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


@withRouter
@connect(
    state => state,
    {}
)

class Published extends React.Component {
    static PropTypes = {
        tasklist: PropTypes.array.isRequired
    }

    handleChange(v) {
        this.props.history.push(`/chat/${v._id}`)
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
                        return (<div key={v._id}>
                            <WhiteSpace />
                            <QueueAnim>
                                <Card key={v.taskname}>
                                    <Card.Header
                                        title={v.taskname}
                                        // thumb={require(`../img/${v.avatar}.png`)}
                                        extra={<a onClick={() => { console.log('完成') }} size="small" type="ghost">完成</a>}
                                    />
                                    <Card.Body>
                                        {v.detail}
                                    </Card.Body>
                                </Card>
                            </QueueAnim>
                        </div>)
                    })}

                </WingBlank>
            </div>
        )
    }
}

export default Published