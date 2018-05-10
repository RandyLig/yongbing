import React from 'react'
import { NavBar, InputItem, Button, WhiteSpace, Picker, List, TextareaItem } from 'antd-mobile'
import AvatarSelector from '../../component/avatarSelector/avatarSelector.js'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import arrayTreeFilter from 'array-tree-filter';
import { district, provinceLite } from 'antd-mobile-demo-data';
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

class BossInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nickname: '',
            sex: '',
            age: '',
            home: '',
            resume: '',
            data: [],
            cols: 1,
            // pickerValue: [],
            asyncValue: [],
            visible: false,
            // sValue: ''
        }
        // this.getSel = this.getSel.bind(this)
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    onClick = () => {
        setTimeout(() => {
            this.setState({
                data: provinceLite,
            });
        }, 120);
    };
    onPickerChange = (val) => {
        console.log(val);
        let colNum = 1;
        const d = [...this.state.data];
        const asyncValue = [...val];
        if (val[0] === 'zj') {
            d.forEach((i) => {
                if (i.value === 'zj') {
                    colNum = 2;
                    if (!i.children) {
                        i.children = [{
                            value: 'zj-nb',
                            label: '宁波',
                        }, {
                            value: 'zj-hz',
                            label: '杭州',
                        }];
                        asyncValue.push('zj-nb');
                    } else if (val[1] === 'zj-hz') {
                        i.children.forEach((j) => {
                            if (j.value === 'zj-hz') {
                                j.children = [{
                                    value: 'zj-hz-xh',
                                    label: '西湖区',
                                }];
                                asyncValue.push('zj-hz-xh');
                            }
                        });
                        colNum = 3;
                    }
                }
            });
        } else {
            colNum = 1;
        }
        this.setState({
            data: d,
            cols: colNum,
            asyncValue,
        });
    };
    getSel() {
        const value = this.state.home;
        if (!value) {
            return '';
        }
        const treeChildren = arrayTreeFilter(district, (c, level) => c.value === value[level]);
        return treeChildren.map(v => v.label).join(',');
    }
    // setVal() {
    //     this.props.form.setFieldsValue({
    //         district: ['340000', '340800', '340822'],
    //     });
    // }
    render() {
        const path = this.props.location.pathname
        const re = this.props.redirectTo
        return <div>
            {re && re !== path ? <Redirect to={re} /> : null}
            <NavBar mode="dark">boss信息完善</NavBar>
            <AvatarSelector selectAvatar={imgname => {
                this.setState({
                    avatar: imgname
                })
            }}></AvatarSelector>
            <InputItem onChange={v => this.handleChange('nickname', v)}>昵称</InputItem>
            {/* 选择性别 */}
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
                <List.Item arrow="horizontal">性别</List.Item>
            </Picker>
            {/* 选择年龄 */}
            <InputItem onChange={v => this.handleChange('age', v)}>年龄</InputItem>
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
            }}>保存</Button>
        </div >
    }
}

export default BossInfo