import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'

import reducers from './reducer'
import './index.css'
import Login from './container/login/login.js'
import Register from './container/register/register.js'
import AuthRoute from './component/authroute/authroute.js'
import AddTask from './component/addtask/addtask.js'
import BossInfo from './container/bossinfo/bossinfo.js'
import YongbingInfo from './container/yongbinginfo/yongbinginfo.js'
import DashBoard from './component/dashboard/dashboard.js'
import Chat from './component/chat/chat'
import Info from './component/info/info'
import Published from './component/published/published'
import Published2 from './component/published/published2'
import Done from './component/published/done'
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
ReactDOM.render(
    // 可以用componentDidCatch(){}来处理出错
    
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo} />
                    <Route path='/yongbinginfo' component={YongbingInfo} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/addtask' component={AddTask} />
                    <Route path='/chat/:user' component={Chat} />
                    <Route path='/info'  component={Info}/>
                    <Route path='/published'  component={Published}/>
                    <Route path='/published2'  component={Published2}/>
                    <Route path='/Done'  component={Done}/>
                    <Route component={DashBoard} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
