import React from 'react'
import { NavBar, Icon, Result, Card, WhiteSpace } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim';
import { getEvaluateOne, getTaskListOne } from '../../redux/task.redux'
import { connect } from 'react-redux'
// import { getChatId } from '../../util'

@connect(
    state => state,
    { getEvaluateOne, getTaskListOne }
)

class Evaluateinfo extends React.Component {
    constructor(props) {
        super(props)
        this.props.getEvaluateOne(this.props.match.params.user)
        this.props.getTaskListOne(this.props.match.params.user)
        this.state = {
            haserror: false,
        }
        this.Submit = this.Submit.bind(this)
        this.formatTen = this.formatTen.bind(this)
        this.formatDate = this.formatDate.bind(this)
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }
    // componentDidMount() {
    //     this.props.getTaskListOne(this.props.match.params.user)
    // }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    //时间格式化
    formatTen(num) {
        return num > 9 ? (num + "") : ("0" + num);
    }

    formatDate(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return year + "-" + this.formatTen(month) + "-" + this.formatTen(day) + " " + this.formatTen(hour) + ":" + this.formatTen(minute) + ":" + this.formatTen(second);
    }
    Submit() {
        // if (!this.state.evaluate) {
        //     this.setState({
        //         haserror: true
        //     })
        // }
        //从url中获取任务id
        // const taskid = this.props.match.params.user
        // const from = this.props.user._id
        // const chatid = getChatId(from, user)

        // console.log({ ...this.state, taskid })
        // this.props.evaluate({ ...this.state, taskid })
        // this.props.history.go(-1)

    }
    render() {
        const tasklist = this.props.task.tasklist.filter(v => v._id === this.props.match.params.user)
        const evaluate = this.props.task.evaluate.filter(v => v.taskid === this.props.match.params.user)
        // console.log(tasklist)
        return !!tasklist ? (<div>
            <NavBar mode="dark" icon={<Icon type="cross" />}
                onLeftClick={() => this.props.history.go(-1)}>评价详情</NavBar>
            <Result
                img={<Icon type="check-circle" style={{
                    fill: '#1F90E6', width: '60px',
                    height: '60px'
                }} />}
                title={(evaluate[0].taskname ? evaluate[0].taskname : '') + "交易完成"}
                message={"完成时间：" + this.formatDate(new Date(tasklist[0].create_time))}
            />
            <WhiteSpace size="lg" />
            <QueueAnim type='bottom'>
                <Card key={'evaluateinfo'} onClick={() => console.log('评价')}>
                    <Card.Header
                        title={this.props.task.bossname}
                        thumb={<img src={require(`../img/${this.props.task.avatar ? this.props.task.avatar : 'android'}.png`)} style={{ width: 25 }} alt="" />}
                        extra={evaluate[0].praise}
                    />
                    <Card.Body>
                        <div>{evaluate[0].evaluate}</div>
                    </Card.Body>
                    <Card.Footer content={'评论时间:' + this.formatDate(new Date(this.props.task.evaluate[0].create_time))}>

                    </Card.Footer>
                </Card>
            </QueueAnim>
        </div>) : ''
    }
}

export default Evaluateinfo