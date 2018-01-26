import React from 'react'
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux'
import { WhiteSpace, List, Button, Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies'
import { logout } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
const alert = Modal.alert;
const Item = List.Item;
const Brief = Item.Brief;
@connect(
    state => state.user,
    { logout }
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
                            thumb={<img src={require(`../img/${this.props.avatar}.png`)} style={{ width: 50 }} alt="" />}
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
                        {this.props.type === 'boss' ? (<List.Item
                            multipleLine
                            // thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                            onClick={() => { this.props.history.push('/addTask') }}
                            arrow="horizontal"
                        >
                            发布任务
                </List.Item>) : null}
                        {this.props.type === 'boss' ? (<List.Item
                            multipleLine
                            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                            onClick={() => { this.props.history.push('/published') }}
                            arrow="horizontal"
                        >
                            已发布的任务
                    </List.Item>) : null}
                        <List.Item
                            multipleLine
                            thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                            onClick={() => { console.log('跳转已完成任务页面') }}
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