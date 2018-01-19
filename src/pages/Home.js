import React from 'react'

import {Link} from 'react-router'
//引入重复代码组件
import HomeLayout from '../layouts/HomeLayout'

class Home extends React.Component {
    render() {
        return (
            <HomeLayout title="Welcome">
                <h3>用户界面</h3>
                <ul>
                    <li><Link to="/user/add">添加用户</Link></li>
                    <li><Link to="/user/list">用户列表</Link></li>
                </ul>
            </HomeLayout>
        )
    }
}

export default Home