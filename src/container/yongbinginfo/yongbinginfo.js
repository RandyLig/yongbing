import React from 'react'
import { NavBar, InputItem, Button, TextareaItem, WhiteSpace, Picker, List } from 'antd-mobile'
import AvatarSelector from '../../component/avatarSelector/avatarSelector.js'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
const sex = [
    [
        {
            label: '男',
            value: '男',
        },
        {
            label: '女',
            value: '女',
        }

    ]
];

@connect(
    state => state.user,
    { update }
)


class YongbingInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nickname: '',
            sex: '',
            age: '',
            home: '',
            //特长
            specialities: '',
            resume: ''
        }
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    render() {
        const path = this.props.location.pathname
        const re = this.props.redirectTo
        return <div>
            {re && re !== path ? <Redirect to={re} /> : null}
            <NavBar mode="dark">佣兵信息完善</NavBar>
            <AvatarSelector selectAvatar={imgname => {
                this.setState({
                    avatar: imgname
                })
            }}></AvatarSelector>
            <InputItem onChange={v => this.handleChange('nickname', v)}>昵称</InputItem>
            <Picker
                data={sex}
                title="选择性别"
                cascade={false}
                extra="请选择"
                cols={1}
                value={this.state.sex}
                onChange={v => this.setState({ sex: v })}
                onOk={v => {
                    this.setState({ sex: v })
                    console.log(v[0])
                }}
            >
                <List.Item arrow="horizontal">选择性别</List.Item>
            </Picker>
            <InputItem onChange={v => this.handleChange('age', v)}>年龄</InputItem>
            <TextareaItem rows={2} autoHeight onChange={v => this.handleChange('home', v)} title='家乡'></TextareaItem>
            <InputItem onChange={v => this.handleChange('specialities', v)}>特长</InputItem>
            <TextareaItem rows={3} autoHeight onChange={v => this.handleChange('resume', v)} title='个人简介'></TextareaItem>
            <WhiteSpace />
            <WhiteSpace />
            <WhiteSpace />
            <Button type="primary" onClick={() => {
                this.props.update(this.state)
            }}>出发</Button>
        </div>
    }
}

export default YongbingInfo