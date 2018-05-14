import React from 'react'
import QueueAnim from 'rc-queue-anim';
import { WhiteSpace, Accordion, List, NavBar, Icon } from 'antd-mobile'
// import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
@withRouter
@connect(
    state => state,
    {}
)
class Userinfo extends React.Component {
    // static PropTypes = {
    //     userlist: PropTypes.array.isRequired
    // }
    onChange = (key) => {
        console.log(key);
    }
    handleChange(v) {
        // this.props.history.push(`/chat/${v._id}`)
    }
    render() {
        const user = this.props.chatuser.userlist.filter(v => v._id === this.props.match.params.user)
        // console.log(user)
        return (
            user.map(v => (<div key={'div' + v._id}>
                <NavBar mode="dark" icon={<Icon type="cross" />}
                    onLeftClick={() => this.props.history.go(-1)}
                    rightContent={<a onClick={() => this.props.history.push(`/chat/${v._id}`)}>去聊天</a>}
                    key={'nav' + v._id}
                >资料详情</NavBar>
                <div key={'body' + v._id}>
                    <QueueAnim key={'ani' + v._id}>
                        <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange} key={'Acc' + v._id}>
                            <Accordion.Panel header="用户名" key={'0'}>
                                <List className="my-list">
                                    <List.Item thumb={<img src={require(`../img/${v.avatar}.png`)} style={{ width: 25 }} alt="" />}>{v.nickname}</List.Item>
                                </List>
                            </Accordion.Panel>
                            <Accordion.Panel header="类别" className="pad" key={'type' + v._id}>
                                <List.Item
                                    thumb={<img src={require(`../img/${'类别'}.png`)} style={{ width: 25, height: 25 }} alt="" />}
                                > {v.type === 'yongbing' ? '佣兵' : 'Boss'}</List.Item>
                            </Accordion.Panel>
                            <Accordion.Panel header="性别" className="pad" key={'sex' + v._id}>
                                <List.Item
                                    thumb={<img src={require(`../img/${'性别'}.png`)} style={{ width: 25, height: 25 }} alt="" />}
                                >{v.sex}</List.Item>
                            </Accordion.Panel>
                            <Accordion.Panel header="年龄" className="pad" key={'age' + v._id}>
                                <List.Item thumb={<img src={require(`../img/${'年龄'}.png`)} style={{ width: 25, height: 25 }} alt="" />}>{v.age}</List.Item>
                            </Accordion.Panel>
                            <Accordion.Panel header="特长" className="pad" key={'spe' + v._id}>
                                <List.Item thumb={<img src={require(`../img/${'彩色特长'}.png`)} style={{ width: 25, height: 25 }} alt="" />}> {v.specialities}</List.Item>
                            </Accordion.Panel>
                            <Accordion.Panel header="个人简介" className="pad" key={'resume' + v._id}>
                                <List.Item thumb={<img src={require(`../img/${'简介'}.png`)} style={{ width: 25, height: 25 }} alt="" />}>{v.resume}</List.Item>
                            </Accordion.Panel>
                            <Accordion.Panel header="家乡" className="pad" key={'home' + v._id}>
                                <List.Item thumb={<img src={require(`../img/${'家'}.png`)} style={{ width: 25, height: 25 }} alt="" />}> {v.home}</List.Item>
                            </Accordion.Panel>
                        </Accordion>
                    </QueueAnim>
                </div>
            </div>))
        )
    }
}

export default Userinfo