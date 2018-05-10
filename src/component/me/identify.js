import React from 'react'
import { NavBar, InputItem, Icon, ImagePicker, Button, WingBlank } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux'
const data = [{
    url: 'https://img.alicdn.com/imgextra/i4/i2/TB1bpISHpXXXXbKXpXXXXXXXXXX_!!0-item_pic.jpg',
    id: '1',
}
];

@connect(
    state => state,
    {}
)

class Identify extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            files: data,
            name: '',
            phone: '',
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
        console.log(this.state)
    }
    render() {
        const { files } = this.state;
        return <div>
            <NavBar mode="dark" icon={<Icon type="cross" />}
                onLeftClick={() => this.props.history.go(-1)}>实名认证</NavBar>
            <InputItem
                onChange={v => this.handleChange('name', v)}
                placeholder='请输入您的姓名'
            >姓名</InputItem>
            <InputItem
                onChange={v => this.handleChange('phone', v)}
                placeholder='请输入您的联系方式'
            >联系方式</InputItem>
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
                    >实名认证</Button>
                </WingBlank>
            </QueueAnim>
        </div>
    }
}

export default Identify