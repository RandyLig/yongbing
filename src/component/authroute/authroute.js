import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux.js'
import { connect } from 'react-redux'

@withRouter
@connect(
    null,
    { loadData }
)
class AuthRoute extends React.Component {
    componentDidMount() {
        // console.log(this.props)
        const publicList = ['/login', '/register','/msg']
        const pathname = this.props.location.pathname
        if (publicList.indexOf(pathname) > -1) {
            return null
        }
        axios.get('/user/info').then(
            res => {
                if (res.status === 200) {
                    //有登录信息
                    if (res.data.code === 0) {
                        this.props.loadData(res.data.data)
                    } else {
                        //没有登录信息跳轉到登錄界面
                        this.props.history.push('/login')
                    }
                }
            })
    }
    render() {
        return null
    }
}

export default AuthRoute