import React from 'react'
import QueueAnim from 'rc-queue-anim';
import { Card, WingBlank, WhiteSpace, NavBar, Icon, Modal } from 'antd-mobile'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { haddone, getTaskList, cancelTask } from '../../redux/task.redux'
import { getChatId } from '../../util'
const prompt = Modal.prompt
@withRouter
@connect(
    state => state,
    { haddone, getTaskList, cancelTask }
)

class Published extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.Submit = this.Submit.bind(this)
        this.cancel = this.cancel.bind(this)
    }
    static PropTypes = {
        tasklist: PropTypes.array.isRequired
    }
    Submit(v) {
        const yongbingname = v.yongbing
        const yongbingid = v.yongbingid
        const taskname = v.taskname
        const chatid = getChatId(yongbingid, this.props.user._id)
        // console.log(v._id, yongbingid, chatid)
        this.props.haddone(v._id, yongbingid, chatid, taskname)
    }
    cancel(v) {
        this.props.cancelTask(v._id)
    }
    handleChange(v) {
        this.props.history.push(`/chat/${v._id}`)
    }
    componentDidMount() {
        //获取任务的数据
        this.props.getTaskList()
    }
    render() {
        // 過濾其他用戶發佈的任務
        const userid = this.props.user._id
        const tasklist = this.props.task.tasklist.filter(v => v.bossid === userid)
        return (
            <div>
                <NavBar
                    mode="light"
                    leftContent="返回"
                    onLeftClick={() => this.props.history.go(-1)}
                    rightContent={[
                        //搜索按钮
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={
                            () => prompt('请输入查询内容', '', [
                                { text: 'Cancel' },
                                { text: 'Submit', onPress: value => console.log(`输入的内容:${value}`) },
                            ], 'default', '')} />
                    ]}
                >已发布任务</NavBar>
                <WingBlank>
                    <WhiteSpace />
                    <WhiteSpace />
                    {tasklist.map(v => {
                        return v.done ? '' : (<div key={v._id}>
                            <WhiteSpace />
                            <QueueAnim>
                                <Card key={v._id}>
                                    {/* //显示boss */}
                                    <Card.Header
                                        title={v.taskname}
                                        thumb={v.files.url}
                                        thumbStyle={{ height: '56px', width: '50px' }}
                                        extra={(<div>{v.yongbing ? <a style={{ color: 'red' }} onClick={() => this.Submit(v)} size="small" type="ghost">确认完成</a> : ''}
                                            <a style={{ color: 'green' }} onClick={() => this.cancel(v)} size="small" type="ghost">取消任务</a></div>)}
                                    />
                                    <Card.Body>
                                        {v.detail}
                                    </Card.Body>
                                    <Card.Footer
                                        content={'执行人:' + (v.yongbing ? v.yongbing : "暂时无人接受")}
                                    >
                                    </Card.Footer>
                                </Card>
                            </QueueAnim>
                        </div>)
                    })}

                </WingBlank>
            </div>
        )
    }
}

export default Published