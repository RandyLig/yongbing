import React from 'react'
import { connect } from 'react-redux'
import { Result, WhiteSpace, List, Button, Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies'
import { logout } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
const alert = Modal.alert;
@connect(
    state => state.user,
    { logout }
)


class Me extends React.Component {

    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout() {
        alert('注销', '确认退出吗', [
            { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
            {
                text: 'OK', onPress: () => {
                    browserCookie.erase('userid')
                    this.props.logout()
                    //页面刷新
                    // window.location.href = window.location.href
                }
            },
        ]);
        console.log('logout')
    }

    render() {
        console.log(this.props)
        return this.props.user ? (
            <div>
                <Result
                    img={<img src={require(`../img/${this.props.avatar}.png`)} style={{ width: 50 }} alt="" />}
                    title={this.props.user}
                    message={this.props.type === 'yongbing' ? this.props.resume : null}
                />
                < WhiteSpace />
                <List
                    renderHeader={() => '个人信息'}
                >
                    <List.Item multipleLine>
                        特长：
                        <List.Item.Brief>
                            {this.props.specialities}
                        </List.Item.Brief>
                    </List.Item>
                </List>
                < WhiteSpace />
                < WhiteSpace />
                < WhiteSpace />
                <Button type="warning" onClick={this.logout}>退出登录</Button>
            </div>
        ) : <Redirect to={this.props.redirectTo} />
    }
}

export default Me