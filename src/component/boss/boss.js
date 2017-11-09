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
                
                    {datas.map(v => (
                        <Card>
                            <Card.Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>this is extra</span>}
                            />
                            <Card.Body>
                                {v.age}
                            </Card.Body>
                        </Card>
                    ))}
            
            </WingBlank>
        </div>
    }
}
export default Boss