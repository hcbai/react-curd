import React from 'react'

class UserAdd extends React.Component{
    constructor(){
        super();
        this.state = {
            name:'',
            age:0,
            gender:''
        }
    };
    valueChange(filed, value, type = 'string'){
        if(type === 'number'){
            value = +value;
        }
        this.setState({
           [filed]:value     
        })
    };
    fromSubmit(e){
        e.preventDefault();
        // alert(JSON.stringify(this.state))

        //ES6结构赋值拆解获取数据
        const {name,age,gender} = this.state;
        //使用fetch()提交数据
        fetch('http://localhost:3000/user',{
            method:'post',
            body:JSON.stringify({name,age,gender}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res=>res.json())
        .then(res => {
            // console.log(res)
            if(res.id){
                alert('用户添加成功');
                //添加完成，清空列表
                this.setState({
                    name:'',
                    age:0,
                    gender:''
                })
            } else {
                alert('添加失败')
            }
        })
        //处理提交失败
        .catch(err => console.log(err))
    };
    render(){
        return (
            <div>
                <header>
                    <h1>添加用户</h1>
                </header>
                <main>
                    <form onSubmit={e=>this.fromSubmit(e)}>
                        <label htmlFor="name">用户名：</label>
                        <input type="text" id="name" 
                        value={this.state.name} 
                        onChange={e=>this.valueChange('name',e.target.value)}/>
                        <br/>
                        <label htmlFor="age">年龄：</label>
                        <input type="number" id="age" min="0" 
                        value={this.state.age} 
                        onChange={e=>this.valueChange('age',e.target.value,'number')}/>
                        <br/>
                        <label htmlFor="">性别：</label>
                        <select value={this.state.gender} onChange={e=>this.valueChange('gender',e.target.value)}>
                            <option value="">请选择</option>
                            <option value="男">男</option>
                            <option value="女">女</option>
                        </select>
                        <br/>
                        <input type="submit" value="提交"/>
                    </form>
                </main>
            </div>
        )
    };
}

export default UserAdd