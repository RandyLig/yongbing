import React from 'react'
import Logo from '../../component/logo/logo.js'
import { Button, List, WingBlank, WhiteSpace, InputItem } from 'antd-mobile'
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
    }
    register() {
        this.props.history.push('./register')
    }
    render() {
        return <div>
            <Logo></Logo>
            <WingBlank>
                <List>
                    <InputItem>用户名</InputItem>
                    <InputItem>密码</InputItem>
                </List>
            </WingBlank>
            <WhiteSpace />
            <WhiteSpace />  
            <WingBlank>
                <WingBlank>
                    <Button type="primary">登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注册</Button>
                    <WhiteSpace />
                </WingBlank>
            </WingBlank>
        </div>
    }
}
export default Login