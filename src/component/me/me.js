import React from 'react'
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux'
import { WhiteSpace, List, Button, Modal, Badge } from 'antd-mobile';
import browserCookie from 'browser-cookies'
import { logout } from '../../redux/user.redux'
import { getTaskList } from '../../redux/task.redux'
import { Redirect } from 'react-router-dom'
const alert = Modal.alert;
const Item = List.Item;
const Brief = Item.Brief;
@connect(
    state => state.user,
    { logout, getTaskList }
)


class Me extends React.Component {

    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
        this.info = this.info.bind(this)
    }
    logout() {
        alert('注销', '确认退出吗', [
            { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
            {
                text: 'OK', onPress: () => {
                    //消除cookie
                    browserCookie.erase('userid')
                    this.props.logout()
                    //页面刷新
                    // window.location.href = window.location.href
                }
            },
        ]);
        console.log('logout')
    }
    info() {
        this.props.history.push('/info')
    }
    render() {
        // console.log(this.props)
        return this.props.user ? <QueueAnim>
            <div>
                <QueueAnim key='111' type='left'>
                    {/* <Result
                        img={<img src={require(`../img/${this.props.avatar}.png`)} style={{ width: 50 }} alt="" />}
                        title={this.props.type === 'yongbing' ? this.props.resume : this.props.nickname}
                        message={this.props.user}
                        // buttonText="查看并完善自己的信息"
                        // buttonType="primary"
                        // onButtonClick={this.info}
                        key={'result'}
                    /> */}
                    <List renderHeader={() => 'Customized Right Side（Empty Content / Text / Image）'}
                        className="my-list"
                        key={'result'}>
                        <Item extra='去完善'
                            arrow="horizontal"
                            multipleLine={true}
                            thumb={<img src={require(`../img/${this.props.avatar}.png`)} style={{ width: 25 }} alt="" />}
                            onClick={this.info}>
                            {this.props.type === 'yongbing' ? this.props.resume : this.props.nickname}
                            <Brief >{this.props.user}</Brief>
                        </Item>
                    </List>
                </QueueAnim>
                < WhiteSpace />
                <QueueAnim type='left' key={'list'}>
                    <List
                        renderHeader={() => '个人信息'}
                        key={'header'}
                    >
                        {/* 实名认证 */}
                        <List.Item
                            multipleLine
                            thumb={<img src={require(`../img/${'实名认证'}.png`)} style={{ width: 25 }} alt="" />}
                            onClick={() => { this.props.history.push('/identify') }}
                            arrow="horizontal"
                        >
                            实名认证
                </List.Item>
                        {/* 任务确认 */}
                        {this.props.type === 'boss' ? (<List.Item
                            multipleLine
                            extra={<Badge text={'1'}></Badge>}
                            thumb={<img src={require(`../img/${'发布任务'}.png`)} style={{ width: 25 }} alt="" />}
                            onClick={() => { this.props.history.push('/confirm'), this.props.getTaskList() }}
                            arrow="horizontal"
                        >
                            任务确认
                </List.Item>) : null}
                    </List>
                </QueueAnim>
                <QueueAnim type='left' key={'list2'}>

                    {/* 任务栏 */}
                    <List
                        renderHeader={() => '任务栏'}
                        key={'header2'}
                    >
                        {/* BOSS发布任务 */}
                        {this.props.type === 'boss' ? (<List.Item
                            multipleLine
                            thumb={<img src={require(`../img/${'发布任务'}.png`)} style={{ width: 25 }} alt="" />}
                            onClick={() => { this.props.history.push('/addTask') }}
                            arrow="horizontal"
                        >
                            发布任务
                </List.Item>) : null}
                        {/* BOSS查看已发布的任务 */}
                        {this.props.type === 'boss' ? (<List.Item
                            multipleLine
                            thumb={<img src={require(`../img/${'任务分配'}.png`)} style={{ width: 25 }} alt="" />}
                            onClick={() => {
                                this.props.history.push('/published')
                                this.props.getTaskList()
                            }}
                            arrow="horizontal"
                        >
                            已发布的任务
                    </List.Item>) : null}
                        {/* 佣兵查看任务 */}
                        {this.props.type === 'yongbing' ? (<List.Item
                            multipleLine
                            // thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                            onClick={() => {
                                this.props.history.push('/published2')
                                this.props.getTaskList()
                            }}
                            arrow="horizontal">

                            查看任务
                </List.Item>) : null}
                        {/* 佣兵查看正在进行的任务 */}
                        {this.props.type === 'yongbing' ? (<List.Item
                            multipleLine
                            thumb={<img src={require(`../img/${'任务进行中'}.png`)} style={{ width: 25 }} alt="" />}
                            onClick={() => {
                                this.props.history.push('/doing')
                                this.props.getTaskList()
                            }}
                            arrow="horizontal">

                            正在进行的任务
                </List.Item>) : null}
                        <List.Item
                            multipleLine
                            thumb={<img src={require(`../img/${'选择'}.png`)} style={{ width: 25 }} alt="" />}
                            onClick={() => {
                                this.props.history.push('/done')
                                this.props.getTaskList()
                            }}
                            arrow="horizontal">

                            已完成的任务
                </List.Item>

                    </List>
                </QueueAnim>
                < WhiteSpace />
                < WhiteSpace />
                < WhiteSpace />
                <QueueAnim key={'logut'} type='bottom'>
                    <Button type="warning" onClick={this.logout} key={'button'}>退出登录</Button>
                </QueueAnim>

            </div>
        </QueueAnim> : <Redirect to={this.props.redirectTo} />
    }
}

export default Me