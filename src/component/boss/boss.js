import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import { getMsgList } from '../../redux/chat.redux'
import Cards from '../card/card'


@connect(
    state => state.chatuser,
    { getUserList, getMsgList }
)

class Boss extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        //获取佣兵的数据
        this.props.getUserList('yongbing')
        //获取未读消息数
        this.props.getMsgList()
    }
    render() {
        // const datas = this.props.userlist
        // console.log(this.props.userlist)
        return <div>
            <Cards userlist={this.props.userlist}></Cards>
        </div>
    }
}
export default Boss