import React from 'react'
//引用表单重复组件
// import FormItem from '../components/FormItem'
//引用表单验证组件
// import formProvider from '../utils/formProvider'
//引入页面重复组件
import HomeLayout from '../layouts/HomeLayout'

import UserEditor from '../components/UserEditor'

class UserAdd extends React.Component{
   render(){
       return(
           <HomeLayout title="添加用户">
               <UserEditor />
           </HomeLayout>
       )
   }
}

export default UserAdd