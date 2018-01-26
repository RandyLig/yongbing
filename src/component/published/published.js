import React from 'react'
import QueueAnim from 'rc-queue-anim';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@withRouter
class Published extends React.Component {
    static PropTypes = {
        userlist: PropTypes.array.isRequired
    }

    handleChange(v) {
        this.props.history.push(`/chat/${v._id}`)
    }
    render() {
        return (

            <WingBlank>
                <WhiteSpace />
                <WhiteSpace />
                {this.props.userlist.map(v => {
                    return (<div key={v._id}>
                        <WhiteSpace />
                        <QueueAnim>
                            <Card key={v._id} onClick={() => this.handleChange(v)}>
                                <Card.Header
                                    title={v.nickname}
                                    thumb={require(`../img/${v.avatar}.png`)}
                                    extra={v.home}
                                />
                                <Card.Body>
                                    {v.resume}
                                </Card.Body>
                            </Card>
                        </QueueAnim>
                    </div>)
                })}

            </WingBlank>
        )
    }
}

export default Published