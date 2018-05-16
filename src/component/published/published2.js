import React from 'react'
import QueueAnim from 'rc-queue-anim';
import { Card, WingBlank, WhiteSpace, NavBar, Popover, Icon, Modal, Button, ActionSheet, Toast } from 'antd-mobile'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { accepttask, getTaskList } from '../../redux/task.redux'
// import { filterUserList, areaSearch } from '../../redux/chatuser.redux'
import { titleSearch, detailSearch } from '../../redux/task.redux'
// const Item = Popover.Item;
const prompt = Modal.prompt
// const data = new Array({
//     icon: require(`../img/${'界面设计'}.png` ),
//     text: '绘画书法'
// }, {
//         icon: require(`../img/${'放映机'}.png`),
//         text: '舞蹈音乐'
//     }, {
//         icon: require(`../img/${'书架'}.png`),
//         text: '语言翻译'
//     }, {
//         icon: require(`../img/${'电脑'}.png`),
//         text: 'IT服务'
//     }, {
//         icon: require(`../img/${'检测单'}.png`),
//         text: '兼职家教'
//     }, {
//         icon: require(`../img/${'绘画'}.png`),
//         text: '手绘修图'
//     }, {
//         icon: require(`../img/${'数码'}.png`),
//         text: '摄影约拍'
//     }, {
//         icon: require(`../img/${'背包'}.png`),
//         text: '旅游服务'
//     }, {
//         icon: require(`../img/${'飞碟'}.png`),
//         text: '游戏服务'
//     }, {
//         icon: require(`../img/${'体育运动'}.png`),
//         text: '运动私教'
//     }, {
//         icon: require(`../img/${'机器人'}.png`),
//         text: '机器人'
//     }, {
//         icon: require(`../img/${'VR眼镜'}.png`),
//         text: '电影推荐'
//     })
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
            clicked1: 'none',
            visible: false,
            selected: '',
        }
        this.accept = this.accept.bind(this)
    }
    static PropTypes = {
        tasklist: PropTypes.array.isRequired
    }
    dataList = [
        { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
        { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
        { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
        { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
        { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
    ].map(obj => ({
        icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
        title: obj.title,
    }));

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
    showShareActionSheet = () => {
        ActionSheet.showShareActionSheetWithOptions({
            options: this.dataList,
            // title: 'title',
            message: 'I am description, description, description',
        },
            (buttonIndex) => {
                this.setState({ clicked1: buttonIndex > -1 ? this.dataList[buttonIndex].title : 'cancel' });
                // also support Promise
                return new Promise((resolve) => {
                    Toast.info('closed after 1000ms');
                    setTimeout(resolve, 1000);
                });
            });
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
                                        thumb={v.files[0].url ? v.files[0].url : '加载出错'}
                                        thumbStyle={{ height: '56px', width: '50px' }}
                                        extra={<a onClick={() => this.accept(v)} size="small" type="ghost">接受</a>}
                                    />
                                    <Card.Body>
                                        {v.detail}
                                    </Card.Body>
                                    <Card.Footer
                                        content={v.yongbing ? v.yongbing : "暂无人接受"}
                                        extra={<img src={require(`../img/${'分享'}.png`)}
                                            style={{ width: 26, height: 18 }} alt=""
                                            onClick={this.showShareActionSheet}></img>}
                                    >
                                    </Card.Footer>
                                </Card>
                            </QueueAnim>
                        </div>)
                    })}
                    {/* <Grid data={data} columnNum={3} hasLine={false} onClick={_el => console.log(_el)}
                     /> */}
                </WingBlank>
            </div>
        )
    }
}

export default Published2