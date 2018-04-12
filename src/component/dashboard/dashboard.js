import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Popover, NavBar, Icon } from 'antd-mobile'
import NavLink from '../navLink/navLink'
import Boss from '../boss/boss'
import Yongbing from '../yongbing/yongbing'
import Me from '../me/me'
import Msg from '../msg/msg'
// import AddTask from '../addtask/addtask'
import { getMsgList, reciveMsg } from '../../redux/chat.redux'
import { filterUserList } from '../../redux/chatuser.redux'
const Item = Popover.Item;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
@withRouter
@connect(
    state => state
)

@connect(
    state => state,
    { getMsgList, reciveMsg, filterUserList }
)

class DashBoard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            selected: '',
        }
    }

    onSelect = (opt) => {
        // console.log(opt.props.value);
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
        // console.log(this.props.user.type)
        this.props.filterUserList(this.props.user.type, opt.props.value)
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };
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
            hide: false
        }, {
            path: '/me',
            title: '个人信息',
            icon: 'my',
            text: '个人',
            component: Me,
            hide: false
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
            {page.icon === '猪' ? (<NavBar mode="dark" rightContent={
                <Popover mask
                    // overlayClassName="fortest"
                    // overlayStyle={{ color: 'currentColor' }}
                    visible={this.state.visible}
                    overlay={[
                        (<Item key="4" value="age" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">按年龄</Item>),
                        (<Item key="5" value="sex" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>按性别</Item>),
                        (<Item key="6" value="area" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                            <span style={{ marginRight: 5 }}>按地区</span>
                        </Item>),
                    ]}
                    align={{
                        overflow: { adjustY: 0, adjustX: 0 },
                        offset: [-10, 0],
                    }}
                    onVisibleChange={this.handleVisibleChange}
                    onSelect={this.onSelect}
                >
                    <div style={{
                        height: '100%',
                        padding: '0 15px',
                        marginRight: '-15px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    >
                        <Icon type="ellipsis" />
                    </div>
                </Popover>
            }>{page.title}</NavBar>) : (<NavBar mode="dark">{page.title}</NavBar>)}
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