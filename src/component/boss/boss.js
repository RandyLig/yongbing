import React from 'react'
import axios from 'axios'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
class Boss extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        axios.get('/user/list?type=yongbing').then(
            res => {
                if (res.data.code === 0) {
                    this.setState({ data: res.data.data })
                }
            }
        )
    }
    render() {
        const datas = this.state.data
        console.log(datas)
        return <div>
            <WingBlank>
                <WhiteSpace/>
                <WhiteSpace/>
                    {datas.map(v => (
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
                    ))}
            
            </WingBlank>
        </div>
    }
}
export default Boss