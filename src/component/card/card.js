import React from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@withRouter
class Cards extends React.Component {
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
                {this.props.userlist.map(v => (
                    <div>
                        <WhiteSpace />
                        <Card key={v._id} onClick={() => this.handleChange(v)}>
                            <Card.Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={v.home}
                            />
                            <Card.Body>
                                {v.resume}
                            </Card.Body>
                        </Card>
                    </div>
                ))}

            </WingBlank>)
    }
}

export default Cards