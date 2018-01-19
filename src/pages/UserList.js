import React from 'react'
//用户展示界面

//引入重复代码组件
import HomeLayout from '../layouts/HomeLayout'

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userList:[]
        }
    };
    componentWillMount(){
        fetch('http://localhost:3000/user')
        .then(ref => ref.json())
        .then(ref => {
            this.setState({
                userList:ref
            })
        })
    };
    render(){
        const {userList} = this.state;
      
        return (
            <HomeLayout title="用户列表界面">
                <table>
                    <thead>
                        <tr>
                            <th>用户ID</th>
                            <th>用户姓名</th>
                            <th>用户年龄</th>
                            <th>用户性别</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>{item.gender}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </HomeLayout>
        )
    }
}

export default UserList