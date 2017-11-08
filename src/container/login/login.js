import React from 'react'
import Logo from '../../component/logo/logo.js'
import { Button, List, WingBlank, WhiteSpace, InputItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux.js'
import { Redirect } from 'react-router-dom'

@connect(
    state => state.user,
    { login }
)

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: ''
        }
        this.register = this.register.bind(this)
        this.login = this.login.bind(this)
    }
    register() {
        this.props.history.push('./register')
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    login() {
        this.props.login(this.state)
        console.log(this.state)
    }
    render() {
        return <div>
            {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
            <Logo></Logo>
            <WingBlank>
                <List>
                    <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
                    <InputItem onChange={v => this.handleChange('pwd', v)} type="password">密码</InputItem>
                </List>
            </WingBlank>
            <WhiteSpace />
            <WhiteSpace />
            <WingBlank>
                <WingBlank>
                    <Button type="primary" onClick={this.login}>登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注册</Button>
                    <WhiteSpace />
                </WingBlank>
            </WingBlank>
        </div>
    }
}
export default Login