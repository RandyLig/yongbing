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
            nickname: this.props.nickname,
            sex: this.props.sex,
            age: this.props.age,
            home: this.props.home
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
            <WhiteSpace/>
            <InputItem
                defaultValue={this.props.nickname}
                onChange={v => this.handleChange('nickname', v)}
                error={this.state.hasError}
                onErrorClick={this.onErrorClick}
                extra={<Icon type='right'></Icon>}
            >昵称</InputItem>
            <InputItem
                onChange={v => this.handleChange('sex', v)}
                defaultValue={this.props.sex}
                editable="false"
                extra={<Icon type='right'></Icon>}>性别</InputItem>
            <InputItem
                onChange={v => this.handleChange('age', v)}
                defaultValue={this.props.age}
                extra={<Icon type='right'></Icon>}>年龄</InputItem>
            <TextareaItem
                rows={2}
                autoHeight
                onChange={v => this.handleChange('home', v)}
                defaultValue={this.props.home}
                title='家乡'
               
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