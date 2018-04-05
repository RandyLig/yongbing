import React from 'react'
import { NavBar, InputItem, Icon, TextareaItem, ImagePicker, Button, WingBlank } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux'
import { addTask } from '../../redux/task.redux'

const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
}];

@connect(
    state => state,
    { addTask }
)

class AddTask extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            files: data,
            taskname: '',
            detail: '',
            time: new Date(),
            reward: ''
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
        const from = this.props.user._id
        this.props.addTask({ ...this.state, from })
        this.props.history.push('/msg')
    }
    render() {
        const { files } = this.state;
        return <div>
            <NavBar mode="dark" icon={<Icon type="cross" />}
                onLeftClick={() => this.props.history.go(-1)}>发布</NavBar>
            <InputItem
                onChange={v => this.handleChange('taskname', v)}
                placeholder='标题 好的开始是成功的一半'
            ></InputItem>
            <TextareaItem
                rows={6}
                autoHeight
                onChange={v => this.handleChange('detail', v)}
                placeholder='描述一下任务的细节'
            ></TextareaItem>
            <QueueAnim type='right' className='ImagePicker' >
                <ImagePicker
                    key={'ImagePicker'}
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={true}
                    multiple={true}
                />
            </QueueAnim>
            <QueueAnim type='bottom' className='confirm'>
                <WingBlank key={'confirmButton'}>
                    <Button type="warning"
                        onClick={this.Submit}
                        key={'button'} className='confirmButton'
                        size='small'
                        inline={true}
                    >确定发布</Button>
                </WingBlank>
            </QueueAnim>
        </div>
    }
}

export default AddTask