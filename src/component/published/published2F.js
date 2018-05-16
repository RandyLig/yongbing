import React from 'react'
// import QueueAnim from 'rc-queue-anim';
import { NavBar, Popover, Icon, Modal, Button, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { accepttask, getTaskList } from '../../redux/task.redux'
// import { filterUserList, areaSearch } from '../../redux/chatuser.redux'
import { titleSearch, detailSearch } from '../../redux/task.redux'
// const Item = Popover.Item;
const prompt = Modal.prompt
const data = new Array({
    icon: require(`../img/${'界面设计'}.png`),
    text: '绘画书法'
}, {
        icon: require(`../img/${'放映机'}.png`),
        text: '舞蹈音乐'
    }, {
        icon: require(`../img/${'书架'}.png`),
        text: '语言翻译'
    }, {
        icon: require(`../img/${'电脑'}.png`),
        text: 'IT服务'
    }, {
        icon: require(`../img/${'检测单'}.png`),
        text: '兼职家教'
    }, {
        icon: require(`../img/${'绘画'}.png`),
        text: '手绘修图'
    }, {
        icon: require(`../img/${'数码'}.png`),
        text: '摄影约拍'
    }, {
        icon: require(`../img/${'背包'}.png`),
        text: '旅游服务'
    }, {
        icon: require(`../img/${'飞碟'}.png`),
        text: '游戏服务'
    }, {
        icon: require(`../img/${'体育运动'}.png`),
        text: '运动私教'
    }, {
        icon: require(`../img/${'机器人'}.png`),
        text: '机器人'
    }, {
        icon: require(`../img/${'VR眼镜'}.png`),
        text: '电影推荐'
    })
@withRouter
@connect(
    state => state,
    { accepttask, getTaskList, titleSearch, detailSearch }
)
//佣兵所看到的的任务列表
class Published2F extends React.Component {
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
                    mode="dark"
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
                <Grid data={data} columnNum={3} hasLine={false} onClick={_el => {
                    this.props.history.push('/published2')
                }}
                />
            </div>
        )
    }
}

export default Published2F