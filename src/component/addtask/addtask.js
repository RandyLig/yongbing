import React from 'react'
import { NavBar, InputItem, Icon } from 'antd-mobile'

class AddTask extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            taskname: '',
            time: '',
            adress: '',
            dowhat: '',
            reward: ''
        }
    }
    render() {
        return <div>
            <NavBar mode="dark" icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}>任务发布</NavBar>
            <InputItem onChange={v => this.handleChange('taskname', v)}>任务名称</InputItem>
            <InputItem onChange={v => this.handleChange('time', v)}>时间</InputItem>
            <InputItem onChange={v => this.handleChange('adress', v)}>地点</InputItem>
            <InputItem onChange={v => this.handleChange('dowhat', v)}>做什么</InputItem>
            <InputItem onChange={v => this.handleChange('reward', v)}>酬劳</InputItem>
        </div>
    }
}

export default AddTask