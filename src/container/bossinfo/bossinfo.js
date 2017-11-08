import React from 'react'
import { NavBar, List, InputItem, TextareaItem, Button, WhiteSpace } from 'antd-mobile'
import AvatarSelector from '../../component/avatarSelector/avatarSelector.js'


class BossInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nickname: '',
            sex: '',
            age: '',
            home: ''
        }
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    render() {
        return <div>
            <NavBar mode="dark">boss信息完善</NavBar>
            <AvatarSelector selectAvatar={imgname => {
                this.setState({
                    avatar: imgname
                })
            }}></AvatarSelector>
            <InputItem onChange={v => this.handleChange('nickname', v)}>昵称</InputItem>
            <InputItem onChange={v => this.handleChange('sex', v)}>性别</InputItem>
            <InputItem onChange={v => this.handleChange('age', v)}>年龄</InputItem>
            <TextareaItem rows={2} autoHeight onChange={v => this.handleChange('home', v)} title='家乡'></TextareaItem>
            <WhiteSpace />
            <WhiteSpace />
            <WhiteSpace />
            <Button type="primary">保存</Button>
        </div>
    }
}

export default BossInfo