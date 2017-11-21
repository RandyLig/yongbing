import React from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
@withRouter

@connect(
    state => state.chat
)

class NavLink extends React.Component {
    static PropTypes = {
        data: PropTypes.array.isRequired
    }
    render() {
        // console.log(this.props)
        const { pathname } = this.props.location
        const NavList = this.props.data.filter(v => !v.hide)
        return <div>
            <TabBar>
                {NavList.map(v => (
                    <TabBar.Item
                        badge={v.path === '/msg' ? this.props.unread : 0}
                        key={v.path}
                        title={v.text}
                        icon={{ uri: require(`./img/${v.icon}.png`) }}
                        selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
                        selected={v.path === pathname}
                        onPress={() => {
                            this.props.history.push(v.path)
                        }}
                    >
                    </TabBar.Item>
                ))}
            </TabBar>
        </div>
    }
}

export default NavLink