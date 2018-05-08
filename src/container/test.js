import React from 'react'
import { Picker, List, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import arrayTreeFilter from 'array-tree-filter';
import { district, provinceLite } from 'antd-mobile-demo-data';

const sex = [
    [
        {
            label: '男',
            value: '男',
        },
        {
            label: '女',
            value: '女',
        }

    ]
];
class Test extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            cols: 1,
            pickerValue: [],
            asyncValue: [],
            visible: false,
            sValue: ''
        }
    }

    onClick = () => {
        setTimeout(() => {
            this.setState({
                data: provinceLite,
            });
        }, 120);
    };
    onPickerChange = (val) => {
        console.log(val);
        let colNum = 1;
        const d = [...this.state.data];
        const asyncValue = [...val];
        if (val[0] === 'zj') {
            d.forEach((i) => {
                if (i.value === 'zj') {
                    colNum = 2;
                    if (!i.children) {
                        i.children = [{
                            value: 'zj-nb',
                            label: '宁波',
                        }, {
                            value: 'zj-hz',
                            label: '杭州',
                        }];
                        asyncValue.push('zj-nb');
                    } else if (val[1] === 'zj-hz') {
                        i.children.forEach((j) => {
                            if (j.value === 'zj-hz') {
                                j.children = [{
                                    value: 'zj-hz-xh',
                                    label: '西湖区',
                                }];
                                asyncValue.push('zj-hz-xh');
                            }
                        });
                        colNum = 3;
                    }
                }
            });
        } else {
            colNum = 1;
        }
        this.setState({
            data: d,
            cols: colNum,
            asyncValue,
        });
    };
    getSel() {
        const value = this.state.pickerValue;
        if (!value) {
            return '';
        }
        const treeChildren = arrayTreeFilter(district, (c, level) => c.value === value[level]);
        return treeChildren.map(v => v.label).join(',');
    }
    setVal() {
        this.props.form.setFieldsValue({
            district: ['340000', '340800', '340822'],
        });
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (<div>
            <WhiteSpace size="lg" />
            <List style={{ backgroundColor: 'white' }} className="picker-list">
                <Picker extra="请选择(可选)"
                    data={district}
                    title="地区选择"
                    {...getFieldProps('district', {
                        initialValue: ['340000', '341500', '341502'],
                    }) }
                    onOk={e => console.log('ok', e)}
                    onDismiss={e => console.log('dismiss', e)}
                >
                    <List.Item arrow="horizontal">地区选择</List.Item>
                </Picker>
            </List>
            <Picker
                data={sex}
                title="选择性别"
                cascade={false}
                extra="请选择"
                cols={1}
                value={this.state.sValue}
                onChange={v => this.setState({ sValue: v })}
                onOk={v => {
                    this.setState({ sValue: v })
                    console.log(v[0])
                    console.log(v)
                }}
            >
                <List.Item arrow="horizontal">选择性别</List.Item>
            </Picker>
            {/* 选择地区 */}
            <Picker
                visible={this.state.visible}
                data={district}
                value={this.state.pickerValue}
                onChange={v => this.setState({ pickerValue: v })}
                onOk={() => this.setState({ visible: false })}
                onDismiss={() => this.setState({ visible: false })}
            >
                <List.Item extra={this.getSel()} onClick={() => {
                    this.setState({ visible: true }),
                        this.getSel()
                    console.log(this.getSel())
                }
                }>
                    地区选择
          </List.Item>
            </Picker>
        </div>);
    }

}
const TestWrapper = createForm()(Test);
export default TestWrapper
// ReactDOM.render(<TestWrapper />, mountNode);