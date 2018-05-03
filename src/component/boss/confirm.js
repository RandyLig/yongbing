import React from 'react'
import { connect } from 'react-redux'
// import { getUserList } from '../../redux/chatuser.redux'
import Cards from '../card/card'


@connect(
    state => state,
    {  }
)

class Confirm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        //获取待确认任务的数据
        this.props.getTaskList()
    }
    render() {
        // const datas = this.props.userlist
        // console.log(this.props.userlist)
        return <div>
            <Cards userlist={this.props.userlist}></Cards>
        </div>
    }
}
export default Confirm