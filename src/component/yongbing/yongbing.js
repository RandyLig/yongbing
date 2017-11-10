import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import Cards from '../card/card'


@connect(
    state => state.chatuser,
    { getUserList }
)

class Yongbing extends React.Component {
    componentDidMount() {
        //获取boss的数据
        this.props.getUserList('boss')
    }
    render() {
        // const datas = this.props.userlist
        return <div>
            <Cards userlist={this.props.userlist}></Cards>
        </div>
    }
}
export default Yongbing