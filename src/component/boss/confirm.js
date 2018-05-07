import React from 'react'
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux'
import { getRequestTask } from '../../redux/task.redux'
import Cards from '../card/card'
import { Icon, Modal, NavBar, Card, WingBlank, WhiteSpace } from 'antd-mobile'
const prompt = Modal.prompt
@connect(
    state => state,
    { getRequestTask }
)

class Confirm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
        this.Submit = this.Submit.bind(this)
    }
    Submit(v) {
        this.props.haddone(v._id)
    }
    componentDidMount() {
        //获取待确认任务的数据
        this.props.getRequestTask()
    }
    render() {
        // const datas = this.props.userlist
        // console.log(this.props.userlist)
        //获取用户id
        const userid = this.props.user._id
        //筛选属于该boss的请求任务
        const tasklist = this.props.task.tasklist.filter(v => v.bossid === userid)
        const requestlist = tasklist.filter(v => v.request === true)
        return <div>
            <NavBar
                mode="dark"
                leftContent="返回"
                onLeftClick={() => this.props.history.go(-1)}
                rightContent={[

                ]}
            >任务确认</NavBar>
            <WingBlank>
                <WhiteSpace />
                <WhiteSpace />
                {requestlist.map(v => {
                    return (<div key={v._id}>
                        <WhiteSpace />
                        <QueueAnim>
                            <Card key={v._id}>
                                {/* //显示boss */}
                                <Card.Header
                                    title={v.yongbingid}
                                    // thumb={require(`../img/${v.avatar}.png`)}
                                    extra={<a onClick={() => this.Submit(v)} size="small" type="ghost">确认</a>}
                                />
                                <Card.Body>
                                    请求接受您的{v.taskname}的任务
                                </Card.Body>
                                {/* <Card.Footer
                                    content={v.yongbingid ? v.yongbingid : "暂无人接受"}
                                >
                                </Card.Footer> */}
                            </Card>
                        </QueueAnim>
                    </div>)
                })}

            </WingBlank>
        </div>
    }
}
export default Confirm