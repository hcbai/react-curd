import React from 'react'
//用户展示界面
class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userList:[]
        }
    };
    componentDidMount(){
        fetch('http://localhost:3000/user')
        .then(ref => ref.json())
        .then(ref => {
            this.setState({
                userList:ref
            })
            // console.log(this.state.userList)
        })
    };
    render(){
        const {userList} = this.state;
        return (
            <div>
                <header>
                    <h3>用户列表界面</h3>
                </header>
                
                <main>
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
                </main>
            </div>
        )
    }
}

export default UserList