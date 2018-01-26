import React from 'react'
import Logo from '../../component/logo/logo.js'
import { Button, List, WingBlank, WhiteSpace, InputItem, Radio, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux.js'
import { Redirect } from 'react-router-dom'

const RadioItem = Radio.RadioItem;

@connect(
    state => state.user,
    { register }
)
class Register extends React.Component {
    constructor(props) {
        super(props)
        //这种注册方法的方式能性能优化
        this.register = this.register.bind(this)
        this.onBlue = this.onBlue.bind(this)
        this.onBluePassword = this.onBluePassword.bind(this)
        this.state = {
            user: '',
            pwd: '',
            repwd: '',
            type: 'yongbing',
            hasError: false
        }
    }
    handleChange(key, val) {
        // let RegExp123 = /^1\d{10}$/
        // if (!RegExp123.test(val)) {
        //     this.setState({
        //         hasError: true,
        //     });
        // } else {
        //     this.setState({
        //         hasError: false,
        //     });
        // }
        this.setState({
            [key]: val
        });
    }


    register() {
        this.props.register(this.state)
    }

    onBlue(v) {
        let RegExp123 = /^1\d{10}$/
        // return RegExp123.test(v)
        if (!RegExp123.test(v)) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
            // Toast.info('请输入正确的手机号');
        }
        // console.log(RegExp123.test(v))
    }
    onBluePassword(v) {
        let RegExpPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
        if (!RegExpPassword.test(v)) {
            Toast.info('请输入6-12字母和数字的密码');
        }
    }
    onErrorClick = () => {
        if (this.state.hasError) {
          Toast.info('Please enter 11 digits');
        }
      }
    render() {
        return <div>
            {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
            <Logo></Logo>
            <WingBlank>
                <List>
                    <InputItem
                        onChange={v => this.handleChange('user', v)}
                        placeholder="请输入手机号"
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        onBlur={v => this.onBlue(v)}
                    >用户名</InputItem>
                    <InputItem onChange={v => this.handleChange('pwd', v)} type="password"
                        placeholder="请输入密码" onBlur={v => this.onBluePassword(v)}>密码</InputItem>
                    <InputItem onChange={v => this.handleChange('repwd', v)} type="password"
                        placeholder="请确认密码">确认密码</InputItem>
                </List>
            </WingBlank>
            <WhiteSpace />
            <WhiteSpace />
            <WingBlank>

                <RadioItem checked={this.state.type === 'yongbing'}
                    onChange={() => this.handleChange('type', 'yongbing')}>佣兵</RadioItem>
                <WhiteSpace />
                <RadioItem checked={this.state.type === 'boss'}
                    onChange={() => this.handleChange('type', 'boss')}>BOSS</RadioItem>
                <WhiteSpace />
                <Button type="primary" onClick={this.register}>注册</Button>
            </WingBlank>

        </div >
    }
}
export default Register