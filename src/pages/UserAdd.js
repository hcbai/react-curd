import React from 'react'

class UserAdd extends React.Component{
    constructor(){
        super();
        //改变用户数据表单形式
        this.state = {
            form:{
                name:{
                    valid:false,
                    value:'',
                    error:''
                },
                age:{
                    valid:false,
                    value:0,
                    error:''
                },
                gender:{
                    valid:false,
                    value:'',
                    error:''
                }
            }
        }
    };
    valueChange(filed, value, type = 'string'){
        if(type === 'number'){
            value = +value;
        }
        //添加用户表单数据验证
        const {form} = this.state;
        const newFiledObj = {valid:true,value,error:''};

        switch (filed) {
            case 'name': {
                if(value.length >=5){
                    newFiledObj.error = '用户最多输入4个字',
                    newFiledObj.valid = false
                } else if(value.length === 0) {
                    newFiledObj.error = '请输入用户名',
                    newFiledObj.valid = false
                }
                break;
            }
            case 'age':{
                if(value < 1 || value > 100) {
                    newFiledObj.error = '请输入有效的年龄1~100',
                    newFiledObj.valid = false
                }
                break;
            }
            case 'gender':{
                if(!value) {
                    newFiledObj.error = '请选择性别',
                    newFiledObj.valid = false
                }
                break;
            }
        }

        this.setState({
            form:{
                ...form,               
                [filed]:newFiledObj 
            }    
        })
        console.log(this.state)
    };
    fromSubmit(e){
        e.preventDefault();
        // alert(JSON.stringify(this.state))

        //ES6结构赋值拆解获取数据
        // const {name,age,gender} = this.state;
        const {form:{name,age,gender}} = this.state;

        //判断用户输入的是否合格
        if(!name.valid || !age.valid || !gender.valid) {
            alert('请填写正确的信息');
            return
        }

        //使用fetch()提交数据
        fetch('http://localhost:3000/user',{
            method:'post',
            body:JSON.stringify({name:name.value,age:age.value,gender:gender.value}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res=>res.json())
        .then(res => {
            // console.log(res)
            if(res.id){
                alert('用户添加成功');
                //添加完成，清空列表
                this.setState({
                    form:{
                        name:{
                            valid:false,
                            value:'',
                            error:''
                        },
                        age:{
                            valid:false,
                            value:0,
                            error:''
                        },
                        gender:{
                            valid:false,
                            value:'',
                            error:''
                        }
                    }
                })
            } else {
                alert('添加失败')
            }
        })
        //处理提交失败
        .catch(err => console.log(err))
    };
    render(){
        //ES6结构赋值拆解获取数据
        // const {name,age,gender} = this.state;
        const {form:{name,age,gender}} = this.state;
        return (
            <div>
                <header>
                    <h1>添加用户</h1>
                </header>
                <main>
                    <form onSubmit={e=>this.fromSubmit(e)}>
                        <label htmlFor="name">用户名：</label>
                        <input type="text" id="name" 
                            value={name.value} 
                            onChange={e=>this.valueChange('name',e.target.value)}/>
                        {!name.valid && <span>{name.error}</span>}
                        <br/>
                        <label htmlFor="age">年龄：</label>
                        <input type="number" id="age" 
                            value={age.value} 
                            onChange={e=>this.valueChange('age',e.target.value,'number')}/>
                        {!age.valid && <span>{age.error}</span>}
                        <br/>
                        <label htmlFor="">性别：</label>
                        <select value={gender.value} onChange={e=>this.valueChange('gender',e.target.value)}>
                            <option value="">请选择</option>
                            <option value="男">男</option>
                            <option value="女">女</option>
                        </select>
                        {!gender.valid && <span>{gender.error}</span>}
                        <br/>
                        <input type="submit" value="提交"/>
                    </form>
                </main>
            </div>
        )
    };
}

export default UserAdd