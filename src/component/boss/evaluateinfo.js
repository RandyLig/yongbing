import React from 'react'
import { NavBar, Icon, ImagePicker, Button, SegmentedControl, Toast, Result, Card, WhiteSpace } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim';
import { getEvaluateOne } from '../../redux/task.redux'
import { connect } from 'react-redux'
import { getChatId } from '../../util'

@connect(
    state => state,
    { getEvaluateOne }
)

class Evaluateinfo extends React.Component {
    constructor(props) {
        super(props)
        this.props.getEvaluateOne(this.props.match.params.user)
        this.state = {
            haserror: false,
        }
        this.Submit = this.Submit.bind(this)
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    Submit() {
        // if (!this.state.evaluate) {
        //     this.setState({
        //         haserror: true
        //     })
        // }
        //从url中获取任务id
        const taskid = this.props.match.params.user
        const from = this.props.user._id
        // const chatid = getChatId(from, user)

        // console.log({ ...this.state, taskid })
        // this.props.evaluate({ ...this.state, taskid })
        // this.props.history.go(-1)

    }
    render() {
        // var SimpleDateFormat = function (pattern) {
        //     var reg = /[\-\/\.]/g;
        //     var format = new RegExp("^[ymd]+" + reg.source + "[ymd]+" + reg.source + "[ymd]+$", "i");
        //     if (!format.test(pattern)) {
        //         throw new Error("the pattern paramters is not legal !");
        //     }
        //     this.pattern = pattern;
        //     this.reg = reg;
        //     this.spliter = pattern.replace(/[ymd]/gi, '').substr(1);
        // }

        // SimpleDateFormat.prototype.format = function (date) {
        //     if (!(date instanceof Date)) {
        //         throw new Error("the date paramter is not Date type.");
        //     }
        //     var spliter = this.spliter;
        //     var year = date.getFullYear();
        //     var month = date.getMonth();
        //     var day = date.getDate();
        //     return year + spliter + month + spliter + day;
        // }

        // SimpleDateFormat.prototype.parse = function (str) {
        //     var pattern = this.pattern;
        //     var reg = new RegExp("^" + pattern.replace(/[ymd]/gi, '\\d') + "$");
        //     if (!reg.test(str)) {
        //         throw new Error("the str paramter could not be pattered.");
        //     }
        //     var tempDate = str.split(this.spliter);
        //     return new Date(tempDate[0], tempDate[1], tempDate[2]);
        // }
        // var d1 = new SimpleDateFormat("yyyy-MM-dd");
        // console.log(d1.format(this.props.task.evaluate[0].create_time))
        // const user = this.props.match.params.user
        // console.log(user)
        return <div>
            <NavBar mode="dark" icon={<Icon type="cross" />}
                onLeftClick={() => this.props.history.go(-1)}>评价详情</NavBar>
            <Result
                img={<Icon type="check-circle" style={{
                    fill: '#1F90E6', width: '60px',
                    height: '60px'
                }} />}
                title="交易完成"
                message="完成时间："
            />
            <WhiteSpace size="lg" />
            <QueueAnim type='bottom'>
                <Card key={'evaluateinfo'} onClick={''}>
                    <Card.Header
                        title={this.props.user.nickname}
                        thumb={<img src={require(`../img/${this.props.user.avatar}.png`)} style={{ width: 25 }} alt="" />}
                        extra={this.props.task.evaluate[0].praise}
                    />
                    <Card.Body>
                        <div>{this.props.task.evaluate[0].evaluate}</div>
                    </Card.Body>
                    <Card.Footer content={'评论时间:' + this.props.task.evaluate[0].create_time}>

                    </Card.Footer>
                </Card>
            </QueueAnim>
        </div>
    }
}

export default Evaluateinfo