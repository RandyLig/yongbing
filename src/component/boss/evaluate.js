import React from 'react'
import { NavBar, InputItem, Icon, ImagePicker, Button, WingBlank, SegmentedControl, Toast } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim';
import { evaluate } from '../../redux/task.redux'
import { connect } from 'react-redux'
import { getChatId } from '../../util'

@connect(
    state => state,
    { evaluate }
)

class Evaluate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            files: [],
            evaluate: '',
            praise: '赏好评',
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
    onChange1 = (e) => {
        console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
    }
    onValueChange = (value) => {
        if (!value) {
            const value = '赏好评'
            this.setState(
                { praise: value });
        } else {

            this.setState(
                { praise: value });
        }

    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    Submit(user) {
        // if (!this.state.evaluate) {
        //     this.setState({
        //         haserror: true
        //     })
        // }
        const from = this.props.user._id
        const chatid = getChatId(from, user)
        if (!this.state.evaluate) {
            Toast.info('请填写评价')
            console.log(this.state)
        } else {
            this.setState({
                haserror: false
            })
            console.log(chatid)
            this.props.evaluate({ ...this.state, from, user, chatid })
            this.props.history.go(-1)
        }
    }
    render() {
        const { files } = this.state;
        const user = this.props.match.params.user
        // console.log(user)
        return <div>
            <NavBar mode="dark" icon={<Icon type="cross" />}
                onLeftClick={() => this.props.history.go(-1)}>评价</NavBar>
            <InputItem
                onChange={v => this.handleChange('evaluate', v)}
                placeholder='请输入你的感受'
            ></InputItem>
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
            <p className="sub-title">赏个好评吧！</p>
            <WingBlank>
                <SegmentedControl
                    onChange={this.onChange1}
                    onValueChange={this.onValueChange}
                    values={['赏好评', '不赏']} />
            </WingBlank>
            <QueueAnim type='bottom' className='confirm'>
                <WingBlank key={'confirmButton'}>
                    <Button type="warning"
                        onClick={() => this.Submit(user)}
                        key={'button'} className='confirmButton'
                        size='small'
                        inline={true}
                    >发表评价</Button>
                </WingBlank>
            </QueueAnim>
        </div>
    }
}

export default Evaluate