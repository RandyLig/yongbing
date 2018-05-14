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
    state => state,
    { logout, getTaskList }
)


class Me extends React.Component {
    constructor(props) {
        super(props)
        this.props.getTaskList()
        this.logout = this.logout.bind(this)
        this.info = this.info.bind(this)
        this.confirm = this.confirm.bind(this)
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
    confirm() {
        this.props.history.push('/confirm')
        this.props.getTaskList()
    }
    componentDidMount() {
        //获取任务列表筛选后获得待确认的徽标数
        // this.props.getTaskList()
        // //获取用户id
        // const userid = this.props.user._id
        // //筛选属于该boss的请求任务
        // const tasklist = this.props.task.tasklist.filter(v => v.bossid === userid)
        // const requestlist = tasklist.filter(v => (v.request === true && v.accept === false))
        // console.log(requestlist.length)
    }
    render() {
        //获取用户id
        const userid = this.props.user._id
        //筛选属于该boss的请求任务
        const tasklist = this.props.task.tasklist.filter(v => v.bossid === userid)
        const tasklist2 = this.props.task.tasklist.filter(v => v.yongbingid === userid)
        //确认栏的徽标数
        const requestlist = tasklist.filter(v => (v.request === true && v.accept === false))
        const doinglist = tasklist2.filter(v => (v.request === false && v.accept === true && v.done === false))
        // console.log(requestlist.length)
        return this.props.user.user ? <QueueAnim>
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
                    <List renderHeader={() => 'welcome'}
                        className="my-list"
                        key={'result'}>
                        <Item extra='去完善'
                            arrow="horizontal"
                            multipleLine={true}
                            thumb={<img src={require(`../img/${this.props.user.avatar}.png`)} style={{ width: 25 }} alt="" />}
                            onClick={this.info}>
                            {this.props.user.type === 'yongbing' ? this.props.user.nickname : this.props.user.nickname}
                            <Brief >{this.props.user.user}</Brief>
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
                            thumb={<img src={require(`../img/${'灯泡'}.png`)} style={{ width: 30, height: 30 }} alt="" />}
                            onClick={() => { this.props.history.push('/identify') }}
                            arrow="horizontal"
                        >
                            实名认证
                </List.Item>
                        {/* 任务确认 */}
                        {this.props.user.type === 'boss' ? (<List.Item
                            multipleLine
                            extra={<Badge text={requestlist.length ? requestlist.length : ''}></Badge>}
                            thumb={<img src={require(`../img/${'界面设计'}.png`)} style={{ width: 30, height: 30 }} alt="" />}
                            onClick={this.confirm}
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
                        {this.props.user.type === 'boss' ? (<List.Item
                            multipleLine
                            thumb={<img src={require(`../img/${'VR眼镜'}.png`)} style={{ width: 30, height: 30 }} alt="" />}
                            onClick={() => { this.props.history.push('/addTask') }}
                            arrow="horizontal"
                        >
                            发布任务
                </List.Item>) : null}
                        {/* BOSS查看已发布的任务 */}
                        {this.props.user.type === 'boss' ? (<List.Item
                            multipleLine
                            thumb={<img src={require(`../img/${'背包'}.png`)} style={{ width: 30, height: 30 }} alt="" />}
                            onClick={() => {
                                this.props.history.push('/published')
                                this.props.getTaskList()
                            }}
                            arrow="horizontal"
                        >
                            已发布的任务
                    </List.Item>) : null}
                        {/* 佣兵查看任务 */}
                        {this.props.user.type === 'yongbing' ? (<List.Item
                            multipleLine
                            thumb={<img src={require(`../img/${'背包'}.png`)} style={{ width: 30, height: 30 }} alt="" />}
                            onClick={() => {
                                this.props.history.push('/published2F')
                                this.props.getTaskList()
                            }}
                            arrow="horizontal">

                            查看任务
                </List.Item>) : null}
                        {/* 佣兵查看正在进行的任务 */}
                        {this.props.user.type === 'yongbing' ? (<List.Item
                            multipleLine
                            extra={<Badge text={doinglist.length ? doinglist.length : ''}></Badge>}
                            thumb={<img src={require(`../img/${'飞碟'}.png`)} style={{ width: 30, height: 30 }} alt="" />}
                            onClick={() => {
                                this.props.history.push('/doing')
                                this.props.getTaskList()
                            }}
                            arrow="horizontal">

                            正在进行的任务
                </List.Item>) : null}
                        {/* //boss已完成 */}
                        {this.props.user.type === 'boss' ? <List.Item
                            multipleLine
                            thumb={<img src={require(`../img/${'检测单'}.png`)} style={{ width: 30, height: 30 }} alt="" />}
                            onClick={() => {
                                this.props.history.push('/done')
                                this.props.getTaskList()
                            }}
                            arrow="horizontal">

                            已完成的任务
                                     {/* //佣兵已完成 */}
                        </List.Item> : <List.Item
                            multipleLine
                            thumb={<img src={require(`../img/${'检测单'}.png`)} style={{ width: 30, height: 30 }} alt="" />}
                            onClick={() => {
                                this.props.history.push('/doneyb')
                                this.props.getTaskList()
                            }}
                            arrow="horizontal">

                                已完成的任务
                </List.Item>}

                    </List>
                </QueueAnim>
                < WhiteSpace />
                < WhiteSpace />
                < WhiteSpace />
                <QueueAnim key={'logut'} type='bottom'>
                    <Button type="warning" onClick={this.logout} key={'button'}>退出登录</Button>
                </QueueAnim>

            </div>
        </QueueAnim > : <Redirect to={this.props.user.redirectTo} />
    }
}

export default Me