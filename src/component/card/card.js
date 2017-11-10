import React from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import PropTypes from 'prop-types'


class Cards extends React.Component {
    static PropTypes = {
        userlist: PropTypes.array.isRequired
    }
    render() {
        return (
            <WingBlank>
                <WhiteSpace />
                <WhiteSpace />
                {this.props.userlist.map(v => (
                    <div>
                        <WhiteSpace />
                        <Card key={v._id}>
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