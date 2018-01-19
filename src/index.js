//引入react核心包
import React from 'react'
//引入与DOM相关操作需要的包
import ReactDOM from 'react-dom'
//引入路由文件
import { Router, Route, hashHistory } from 'react-router'

//引入重复代码组件
// import HomeLayout from './layouts/HomeLayout'

import UserAddPage from './pages/UserAdd'
import HomePage from './pages/Home'
import UserListPage from './pages/UserList'
import UserEditPage from './pages/UserEdit'


ReactDOM.render((
        <Router history={hashHistory}>
            {/* <Route component={HomeLayout}> */}
                <Route path='/' component={HomePage}/>
                <Route path='/user/add' component={UserAddPage}/>
                <Route path='/user/list' component={UserListPage}/>
                <Route path='/user/edit/:id' component={UserEditPage}/>
            {/* </Route> */}
        </Router>
        // <h2>jdsalk</h2>
    ),document.getElementById('root')
)




