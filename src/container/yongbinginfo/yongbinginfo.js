import React from 'react'
import { NavBar, InputItem, Button, TextareaItem, WhiteSpace, Picker, List, Toast } from 'antd-mobile'
import AvatarSelector from '../../component/avatarSelector/avatarSelector.js'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import arrayTreeFilter from 'array-tree-filter';
import { district } from 'antd-mobile-demo-data';
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
            resume: '',
            data: [],
            cols: 1,
            // pickerValue: [],
            asyncValue: [],
            visible: false,
            hasErrorAge: false,
            hasError: false,
        }
    }
    handleChange(key, val) {
        // if (val.replace(/\s/g, '').length > 12) {
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
        })
    }
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('请输入不超过8位的昵称');
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
    getSel() {
        const value = this.state.home;
        if (!value) {
            return '';
        }
        const treeChildren = arrayTreeFilter(district, (c, level) => c.value === value[level]);
        return treeChildren.map(v => v.label).join(',');
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
            <InputItem
                onChange={v => this.handleChange('nickname', v)}
                error={this.state.hasError}
                onErrorClick={this.onErrorClick}
                onChange={v => this.handleChange('nickname', v)}>昵称</InputItem>
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
                <List.Item>选择性别</List.Item>
            </Picker>
            <InputItem
                error={this.state.hasErrorAge}
                onErrorClick={this.onErrorClickAge}
                onChange={v => this.handleChangeAge('age', v)}>年龄</InputItem>
            {/* 选择地区 */}
            <Picker
                visible={this.state.visible}
                data={district}
                value={this.state.home}
                onChange={v => this.setState({ home: v })}
                onOk={v => {
                    this.setState({ visible: false })
                    this.setState({ home: v })
                    // this.setState({ home: this.getSel() })
                    console.log(this.state.home)
                }}
                onDismiss={() => this.setState({ visible: false })}
            >
                <List.Item extra={this.getSel()} onClick={() => {
                    this.setState({ visible: true })
                }
                }>
                    地区
          </List.Item>
            </Picker>
            <InputItem onChange={v => this.handleChange('specialities', v)}>特长</InputItem>
            <TextareaItem rows={3} autoHeight onChange={v => this.handleChange('resume', v)} title='个人简介'></TextareaItem>
            <WhiteSpace />
            <WhiteSpace />
            <WhiteSpace />
            <Button type="primary" onClick={() => {
                var area = this.getSel()
                this.setState({ home: area })
                setTimeout(() => {
                    console.log(this.state)
                    this.props.update(this.state)
                }, 1200);
            }}>出发</Button>
        </div>
    }
}

export default YongbingInfo