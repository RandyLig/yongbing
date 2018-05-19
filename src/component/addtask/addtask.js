import React from 'react'
import { NavBar, InputItem, Icon, TextareaItem, ImagePicker, Button, WingBlank } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux'
import { addTask } from '../../redux/task.redux'


@connect(
    state => state,
    { addTask }
)
//Tag专用
// function onChange(selected) {
//     console.log(`tag selected: ${selected}`);
// }
class AddTask extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            files: [],
            taskname: '',
            detail: '',
            reward: '',
            yongbingid: ''
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
        this.props.history.push('/me')
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
            {/* <Tag selected>绘画艺术</Tag> */}
            {/* <Tag >舞蹈音乐</Tag> */}
            {/* <Tag >语言翻译</Tag> */}
            {/* <Tag >IT服务</Tag> */}
            {/* <Tag >兼职家教</Tag> */}
            {/* <Tag >手绘修图</Tag> */}
            {/* <Tag >摄影约拍</Tag> */}
            {/* <Tag >旅游服务</Tag> */}
            <QueueAnim type='right' className='ImagePicker' >
                <ImagePicker
                    key={'ImagePicker'}
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs, '111')}
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