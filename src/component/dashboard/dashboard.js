import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Popover, NavBar, Icon, Modal } from 'antd-mobile'
import NavLink from '../navLink/navLink'
import Boss from '../boss/boss'
import Yongbing from '../yongbing/yongbing'
import Me from '../me/me'
import Msg from '../msg/msg'
import { getMsgList, reciveMsg } from '../../redux/chat.redux'
import { filterUserList, areaSearch } from '../../redux/chatuser.redux'
const Item = Popover.Item;
const prompt = Modal.prompt
@withRouter
@connect(
    state => state
)

@connect(
    state => state,
    { getMsgList, reciveMsg, filterUserList, areaSearch }
)

class DashBoard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            selected: '',
        }
    }
    correctType = (type) => {
        if (type === 'boss') {
            const type = 'yongbing'
            return type
        }
        if (type === 'yongbing') {
            const type = 'boss'
            return type
        }
    };
    onSelect = (opt) => {
        // console.log(opt.props.value);
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
        // console.log(this.props.user.type)
        this.props.filterUserList(this.correctType(this.props.user.type), opt.props.value)
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };
    componentDidMount() {
        if (!this.props.chat.chatMsg.length) {
            this.props.reciveMsg()
            this.props.getMsgList()
            
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
                <Popover
                    // overlayClassName="fortest"
                    // overlayStyle={{ color: 'currentColor' }}
                    visible={this.state.visible}
                    overlay={[
                        (<Item key="4" value="age" data-seed="logId">按年龄</Item>),
                        (<Item key="5" value="man" style={{ whiteSpace: 'nowrap' }}>男性</Item>),
                        (<Item key="6" value="woman" >
                            <span style={{ marginRight: 5 }}>女性</span>
                        </Item>),
                        (//搜索按钮
                            <Icon style={{ marginLeft: 15 }} key="7" type='search' size='sm' value='address' onClick={
                                () => prompt('请输入查询地区', '', [
                                    { text: 'Cancel' },
                                    { text: 'Submit', onPress: value => this.props.areaSearch(this.correctType(this.props.user.type), `${value}`) },
                                ], 'default', '')}></Icon>)
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