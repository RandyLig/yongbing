import React from 'react'
import { NavBar, InputItem, TextareaItem, Button, WhiteSpace, Icon, Toast } from 'antd-mobile'
import AvatarSelector from '../../component/avatarSelector/avatarSelector.js'
import { connect } from 'react-redux'
import { updateInfo } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

// @withRouter
@connect(
    state => state.user,
    { updateInfo }
)

class Info extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false,
            hasErrorAge: false,
            hasErrorSex: false,
            hasErrorhome: false,
            nickname: this.props.nickname,
            sex: this.props.sex,
            age: this.props.age,
            home: this.props.home,
            resume: this.props.resume,
            specialities: this.props.specialities
        }
    }
    handleChange(key, val) {
        if (val.replace(/\s/g, '').length > 8) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            [key]: val
        })
    }
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('请输入不超过8位的昵称');
        }
    }
    handleChangehome(key, val) {
        if (val.replace(/\s/g, '').length > 16) {
            this.setState({
                hasErrorhome: true,
            });
        } else {
            this.setState({
                hasErrorhome: false,
            });
        }
        this.setState({
            [key]: val
        })
    }
    onErrorClickhome = () => {
        if (this.state.hasErrorhome) {
            Toast.info('请输入不超过16位的地址');
        }
    }
    handleChangeresume(key, val) {
        this.setState({
            [key]: val
        })
    }
    onErrorClickresume = () => {
        if (this.state.hasErrorhome) {
            Toast.info('请输入不超过36位的简介');
        }
    }
    //年龄验证
    handleChangeAge(key, val) {
        var pattern = /\D/g
        console.log(val.replace(/\D/g, ''))
        if (pattern.test(val) === true || val.replace(/\s/g, '').length > 3) {
            this.setState({
                hasErrorAge: true,
            });
        } else {
            this.setState({
                hasErrorAge: false,
            });
        }
        this.setState({
            [key]: val.replace(/\D/g, '')
        })
    }
    onErrorClickAge = () => {
        if (this.state.hasErrorAge) {
            Toast.info('请输入正确的年龄');
        }
    }
    //性别验证
    // handleChangeSex(key, val) {
    //     var pattern = /^['男'|'女']$/ ;
    //     console.log(val.replace(/\D/g, ''))
    //     if (pattern.test(val) === true || val.replace(/\d/g, '').length > 3) {
    //         this.setState({
    //             hasErrorSex: true,
    //         });
    //     } else {
    //         this.setState({
    //             hasErrorSex: false,
    //         });
    //     }
    //     this.setState({
    //         [key]: val.exec(pattern)
    //     })
    // }
    // onErrorClickSex = () => {
    //     if (this.state.hasErrorSex) {
    //         Toast.info('请输入男或女');
    //     }
    // }
    render() {
        const path = this.props.location.pathname
        const re = this.props.redirectTo
        return <div>
            {re && re !== path ? <Redirect to={re} /> : null}
            <NavBar
                mode="light"
                leftContent="Back"
                onLeftClick={() => this.props.history.go(-1)}>信息完善</NavBar>
            <AvatarSelector selectAvatar={imgname => {
                this.setState({
                    avatar: imgname
                })
            }}></AvatarSelector>
            <WhiteSpace />
            <InputItem
                defaultValue={this.props.nickname}
                onChange={v => this.handleChange('nickname', v)}
                error={this.state.hasError}
                onErrorClick={this.onErrorClick}
                extra={<Icon type='right'></Icon>}
            >昵称</InputItem>
            <InputItem
                onChange={v => this.handleChange('sex', v)}
                value={this.props.sex}
                editable="false"
                extra={<Icon type='right'></Icon>}>性别</InputItem>
            <InputItem
                onChange={v => this.handleChangeAge('age', v)}
                defaultValue={this.props.age}
                error={this.state.hasErrorAge}
                onErrorClick={this.onErrorClickAge}
                extra={<Icon type='right'></Icon>}>年龄</InputItem>
            <TextareaItem
                rows={1}
                autoHeight
                onChange={v => this.handleChangehome('home', v)}
                defaultValue={this.props.home}
                error={this.state.hasErrorhome}
                onErrorClick={this.onErrorClickhome}
                title='家乡'
                clear='true'
            ></TextareaItem>
            {this.props.type === 'yongbing' ? <InputItem
                onChange={v => this.handleChange('specialities', v)}
                value={this.props.specialities}
                editable="false"
                extra={<Icon type='right'></Icon>}>特长</InputItem> : ''}
            <TextareaItem
                rows={2}
                autoHeight
                onChange={v => this.handleChangeresume('resume', v)}
                defaultValue={this.props.resume}
                title='个人简介'
                clear='true'
            ></TextareaItem>
            <WhiteSpace />
            <WhiteSpace />
            <WhiteSpace />
            <Button type="primary" onClick={() => {
                this.props.updateInfo(this.state)
            }}>保存</Button>
        </div>
    }
}

export default Info