import React from 'react'
import QueueAnim from 'rc-queue-anim';
import { Card, WingBlank, WhiteSpace, NavBar, Popover, Icon, Modal, Button } from 'antd-mobile'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { accepttask, getTaskList } from '../../redux/task.redux'
// import { filterUserList, areaSearch } from '../../redux/chatuser.redux'
import { titleSearch, detailSearch } from '../../redux/task.redux'
const Item = Popover.Item;
const prompt = Modal.prompt
@withRouter
@connect(
    state => state,
    { accepttask, getTaskList, titleSearch, detailSearch }
)
//佣兵所看到的的任务列表
class Published2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            selected: '',
        }
        this.accept = this.accept.bind(this)
    }
    static PropTypes = {
        tasklist: PropTypes.array.isRequired
    }
    //请求执行任务
    accept(v) {
        // console.log(v._id)
        const userid = this.props.user._id
        this.props.accepttask(v._id, userid)

    }
    handleChange(v) {
        this.props.history.push(`/chat/${v._id}`)
    }
    onSelect = (opt) => {
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
        if ('') {

        } else {

        }
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };
    componentDidMount() {
        //获取任务的数据
        this.props.getTaskList()
    }
    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    leftContent="返回"
                    onLeftClick={() => this.props.history.go(-1)}
                    rightContent={<Popover
                        // overlayClassName="fortest"
                        // overlayStyle={{ color: 'currentColor' }}
                        visible={this.state.visible}
                        overlay={[
                            (<Button key="4" value="title" data-seed="logId" size='small' onClick={
                                () => prompt('请输入查询地区', '', [
                                    { text: 'Cancel' },
                                    { text: 'Submit', onPress: value => this.props.titleSearch(`${value}`) },
                                ], 'default', '')}>按标题查询</Button>),
                            (<Button key="5" value="detail" style={{ whiteSpace: 'nowrap' }} size='small' onClick={() => prompt('请输入查询地区', '', [
                                { text: 'Cancel' },
                                { text: 'Submit', onPress: value => this.props.detailSearch(`${value}`) },
                            ], 'default', '')}>按内容查询</Button>),
                        ]}
                        align={{
                            overflow: { adjustY: 0, adjustX: 0 },
                            offset: [-10, 0],
                        }}
                        onVisibleChange={this.handleVisibleChange}
                    // onSelect={this.onSelect}
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
                    </Popover>}
                >已发布任务</NavBar>
                <WingBlank>
                    <WhiteSpace />
                    <WhiteSpace />
                    {this.props.task.tasklist.map(v => {
                        return v.done ? '' : (<div key={v._id}>
                            <WhiteSpace />
                            <QueueAnim>
                                <Card key={v._id}>
                                    {/* //显示佣兵 */}
                                    <Card.Header
                                        title={v.taskname}
                                        thumb={''}
                                        thumbStyle={{ height: '56px', width: '50px' }}
                                        extra={<a onClick={() => this.accept(v)} size="small" type="ghost">接受</a>}
                                    />
                                    <Card.Body>
                                        {v.detail}
                                    </Card.Body>
                                    <Card.Footer
                                        content={v.yongbing ? v.yongbing : "暂无人接受"}
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

export default Published2