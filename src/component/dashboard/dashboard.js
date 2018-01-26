import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import NavLink from '../navLink/navLink'
import Boss from '../boss/boss'
import Yongbing from '../yongbing/yongbing'
import Me from '../me/me'
import Msg from '../msg/msg'
// import AddTask from '../addtask/addtask'
import { getMsgList, reciveMsg } from '../../redux/chat.redux'

@withRouter
@connect(
    state => state
)

@connect(
    state => state,
    { getMsgList, reciveMsg }
)

class DashBoard extends React.Component {
    componentDidMount() {
        if (!this.props.chat.chatMsg.length) {
            this.props.getMsgList()
            this.props.reciveMsg()
        }

    }
    render() {
        // 获取pathname
        const { pathname } = this.props.location
        const user = this.props.user
        const NavList = [{
            path: '/boss',
            title: '佣兵列表',
            icon: '猪',
            text: '佣兵',
            component: Boss,
            hide: user.type === 'yongbing'
        }, {
            path: '/yongbing',
            title: 'boss列表',
            icon: '猪',
            text: 'boss',
            component: Yongbing,
            hide: user.type === 'boss'
        }, {
            path: '/msg',
            title: '消息列表',
            icon: 'msg',
            text: '消息',
            component: Msg,
        }, {
            path: '/me',
            title: '个人信息',
            icon: 'my',
            text: '个人',
            component: Me,
        }
        // , {
        //     path: '/addTask',
        //     title: '发布任务',
        //     icon: 'multiply',
        //     text: '任务',
        //     component: AddTask,
        // }
    ]
        const page = NavList.find(v => v.path === pathname)
        return page ? (<div>
            <NavBar mode="dark" >{page.title}</NavBar>
            <div className='content'>
                <Switch>

                    <Route key={page.path} path={page.path} component={page.component} />

                </Switch>
            </div>
            <NavLink data={NavList} className='NavLink'></NavLink>
        </div>) : <Redirect to="/msg"></Redirect>  // 用重定向来使用错误机制
    }
}

export default DashBoard