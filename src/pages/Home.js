import React from 'react'

import {Link} from 'react-router'

class Home extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <h1>Welcome</h1>
                </header>
                <main>
                    <h3>用户界面</h3>
                    <ul>
                        <li><Link to="/user/add">添加用户</Link></li>
                        <li><Link to="/user/list">用户列表</Link></li>
                    </ul>
                </main>
            </div>
        )
    }
}

export default Home