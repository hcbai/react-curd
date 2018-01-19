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
    //编辑用户
    editList(item){
        // console.log(item)
        this.context.router.push('/user/edit/' + item.id)
    };
    //删除用户
    delList(item){
        // console.log(item)
        // let flag = confirm('请问是否确认删除?');
        let flag = true;
        if(flag){    
            fetch('http://localhost:3000/user/' + item.id,{method:'delete'})
            .then(ref => ref.json())
            .then(ref => {
                this.setState({
                    userList:this.state.userList.filter(data => data.id !== item.id)
                });
                alert('删除成功')
            })
            .catch(err => console.error(err))
        }
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
                            <th>操作</th>
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
                                    <td>
                                        <a href="jacascript:void(0)" onClick={()=>this.editList(item)}>编辑</a>
                                        &nbsp;&nbsp;
                                        <a href="jacascript:void(0)" onClick={()=>this.delList(item)}>删除</a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </HomeLayout>
        )
    }
}

UserList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default UserList