import React from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@withRouter
class NavLink extends React.Component {
    static PropTypes = {
        data: PropTypes.array.isRequired
    }
    render() {
        const { pathname } = this.props.location
        const NavList = this.props.data.filter(v => !v.hide)
        return <div>
            <TabBar>
                {NavList.map(v => (
                    <TabBar.Item
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