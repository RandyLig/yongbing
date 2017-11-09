import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
    static PropTypes = {
        selectAvatar: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const imgList = 'android,apple,bug,command,css3,gears,html5,explorer,star,cone'.split(',').map(v => ({
            icon: require(`../img/${v}.png`),
            text: v
        }))
        const gridHeader = this.state.icon ?
            (<div>
                <span>当前选择的头像是：</span>
                <img src={this.state.icon} alt="" />
            </div>) : '请选择头像'
        return <div>
            <List renderHeader={() => gridHeader}>
                <Grid data={imgList}
                    columnNum={5}
                    onClick={ele => {
                        this.setState(ele)
                        this.props.selectAvatar(ele.text)
                    }}>
                </Grid>
            </List>
        </div>
    }
}

export default AvatarSelector