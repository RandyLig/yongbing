import React from 'react'
import Logo from '../../component/logo/logo.js'
import { Button, List, WingBlank, WhiteSpace, InputItem, Toast } from 'antd-mobile'
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
        this.login1 = this.login1.bind(this)
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
        // if(!this.state.user||!this.state.pwd){
        //     Toast.fail('请输入用户名或密码')
        // }
        this.props.login(this.state)
    }
    login1() {
        this.login()
        if (this.props.errmsg) {
            Toast.fail(this.props.errmsg)
        } else {
            Toast.success(this.props.errmsg)
        }
    }
    render() {
        return <div>
            {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null}
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
                    <Button type="primary" onClick={this.login1}>登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注册</Button>
                    <WhiteSpace />
                </WingBlank>
            </WingBlank>
        </div>
    }
}
export default Login