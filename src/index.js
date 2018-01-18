//引入react核心包
import React from 'react'
//引入与DOM相关操作需要的包
import ReactDOM from 'react-dom'
//引入路由文件
import { Router, Route, hashHistory } from 'react-router'


import UserAddPage from './pages/UserAdd'
import HomePage from './pages/Home'



ReactDOM.render((
        <Router history={hashHistory}>
            <Route path='/' component={HomePage}/>
            <Route path='/user/add' component={UserAddPage}/>
        </Router>
        // <h2>jdsalk</h2>
    ),document.getElementById('root')
)




