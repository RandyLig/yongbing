import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import NavLink from '../navLink/navLink'
import Boss from '../boss/boss'
import Yongbing from '../yongbing/yongbing'
import Me from '../me/me'


function Msg() {
    return <h1>Msg</h1>
}

@withRouter
@connect(
    state => state
)



class DashBoard extends React.Component {
    render() {
        const { pathname } = this.props.location
        const user = this.props.user
        const NavList = [{
            path: '/boss',
            title: '佣兵列表',
            icon: 'manage2',
            text: '佣兵',
            component: Boss,
            hide: user.type === 'yongbing'
        }, {
            path: '/yongbing',
            title: 'boss列表',
            icon: 'manage2',
            text: 'boss',
            component: Yongbing,
            hide: user.type === 'boss'
        }, {
            path: '/msg',
            title: '消息列表',
            icon: 'msg2',
            text: '消息',
            component: Msg,
        }, {
            path: '/me',
            title: '个人信息',
            icon: 'mine2',
            text: '个人',
            component: Me,
        }]
        return <div>
            <NavBar mode="dark">{NavList.find(v => v.path === pathname).title}</NavBar>
            <div>
                <Switch>
                    {NavList.map(v => (
                        <Route key={v.path} path={v.path} component={v.component} />
                    ))}
                </Switch>
            </div>
            <NavLink data={NavList}></NavLink>
        </div>
    }
}

export default DashBoard