import React from 'react'
import Logo from '../../component/logo/logo.js'
import { Button, List, WingBlank, WhiteSpace, InputItem, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux.js'

const RadioItem = Radio.RadioItem;

@connect(
    state => state,
    { register }
)
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
        this.state = {
            user: '',
            pwd: '',
            repwd: '',
            type: 'yongbing'
        }
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    register() {
        this.props.register(this.state)
        console.log(this.props.register(this.state))
    }
    render() {
        return <div>
            <Logo></Logo>
            <WingBlank>
                <List>
                    <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
                    <InputItem onChange={v => this.handleChange('pwd', v)} type="password">密码</InputItem>
                    <InputItem onChange={v => this.handleChange('repwd', v)} type="password">确认密码</InputItem>
                </List>
            </WingBlank>
            <WhiteSpace />
            <WhiteSpace />
            <WingBlank>

                <RadioItem checked={this.state.type === 'yongbing'} onChange={() => this.handleChange('type', 'yongbing')}>佣兵</RadioItem>
                <WhiteSpace />
                <RadioItem checked={this.state.type === 'boss'} onChange={() => this.handleChange('type', 'boss')}>BOSS</RadioItem>
                <WhiteSpace />
                <Button type="primary" onClick={this.register}>注册</Button>
            </WingBlank>

        </div >
    }
}
export default Register