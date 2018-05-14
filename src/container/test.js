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

        }
    }


    render() {

        return (<div>

        </div>);
    }

}
const TestWrapper = createForm()(Test);
export default TestWrapper
// ReactDOM.render(<TestWrapper />, mountNode);