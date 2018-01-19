import React from 'react'
import HomeLayout from '../layouts/HomeLayout'
import UserEditor from '../components/UserEditor'

//编辑用户界面

class UserEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user:null
        }
    };
    componentWillMount(){
        const userId = this.context.router.params.id;
        fetch('http://localhost:3000/user/' + userId)
        .then(ref => ref.json())
        .then(ref => {
            this.setState({
                user : ref
            })
        })
    };
    render(){
        const {user} = this.state;
        return (
            <HomeLayout title="编辑用户">
            {
                user? <UserEditor editTarget={user}/>:'加载中...'
            }
            </HomeLayout>
        )
    }
}

UserEdit.contextTypes = {
    router:React.PropTypes.object.isRequired
}

export default UserEdit