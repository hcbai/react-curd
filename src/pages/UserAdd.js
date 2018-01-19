import React from 'react'
//引用表单重复组件
import FormItem from '../components/FormItem'
//引用表单验证组件
import formProvider from '../utils/formProvider'

class UserAdd extends React.Component{
    // constructor(){
    //     super();
    //     //改变用户数据表单形式
    //     this.state = {
    //         form:{
    //             name:{
    //                 valid:false,
    //                 value:'',
    //                 error:''
    //             },
    //             age:{
    //                 valid:false,
    //                 value:0,
    //                 error:''
    //             },
    //             gender:{
    //                 valid:false,
    //                 value:'',
    //                 error:''
    //             }
    //         }
    //     }
    // };
    // valueChange(filed, value, type = 'string'){
    //     if(type === 'number'){
    //         value = +value;
    //     }
    //     //添加用户表单数据验证
    //     const {form} = this.state;
    //     const newFiledObj = {valid:true,value,error:''};

    //     switch (filed) {
    //         case 'name': {
    //             if(value.length >=5){
    //                 newFiledObj.error = '用户最多输入4个字',
    //                 newFiledObj.valid = false
    //             } else if(value.length === 0) {
    //                 newFiledObj.error = '请输入用户名',
    //                 newFiledObj.valid = false
    //             }
    //             break;
    //         }
    //         case 'age':{
    //             if(value < 1 || value > 100) {
    //                 newFiledObj.error = '请输入有效的年龄1~100',
    //                 newFiledObj.valid = false
    //             }
    //             break;
    //         }
    //         case 'gender':{
    //             if(!value) {
    //                 newFiledObj.error = '请选择性别',
    //                 newFiledObj.valid = false
    //             }
    //             break;
    //         }
    //     }

    //     this.setState({
    //         form:{
    //             ...form,               
    //             [filed]:newFiledObj 
    //         }    
    //     })
    //     console.log(this.state)
    // };
    fromSubmit(e){
        e.preventDefault();
        // alert(JSON.stringify(this.state))

        //ES6结构赋值拆解获取数据
        // const {name,age,gender} = this.state;
        // const {form:{name,age,gender}} = this.state;

        //formProvider接收一个fields参数，并返回一个函数，经过formProvider处理后的UserAdd组件会得到额外的props
        const {form:{name, age, gender}, formVaild} = this.props;

        //判断用户输入的是否合格
        // if(!name.valid || !age.valid || !gender.valid) {
        if(!formVaild) {
            alert('请填写正确的信息');
            return;
        }

        //使用fetch()提交数据
        fetch('http://localhost:3000/user',{
            method:'post',
            body:JSON.stringify({name:name.value,age:age.value,gender:gender.value}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            if(res.id){
                alert('用户添加成功');
                

                //添加完成，清空列表
                // this.setState({                   
                //     name:{
                //         valid:false,
                //         value:'',
                //         error:''
                //     },
                //     age:{
                //         valid:false,
                //         value:0,
                //         error:''
                //     },
                //     gender:{
                //         valid:false,
                //         value:'',
                //         error:''
                //     }                   
                // })

            } else {
                alert('添加失败')
            }
        })
        //处理提交失败
        .catch(err => console.error(err))
    };
    render(){
        //ES6结构赋值拆解获取数据
        // const {name,age,gender} = this.state;
        // const {form:{name,age,gender}} = this.state;

        //formProvider接收一个fields参数，并返回一个函数，经过formProvider处理后的UserAdd组件会得到额外的props
        const {form:{name, age, gender}, onFormChange} = this.props;

        return (
            <div>
                <header>
                    <h1>添加用户</h1>
                </header>
                <main>
                    <form onSubmit={e => this.fromSubmit(e)}>
                        <FormItem label="用户名：" valid={name.valid} error={name.error}>
                            <input type="text" 
                                value={name.value} 
                                onChange={e => onFormChange('name', e.target.value)}/>
                        </FormItem>
                        <br/>
                        <FormItem label="年龄：" valid={age.valid} error={age.error}>
                            <input type="number"
                                value={age.value || ''} 
                                onChange={e => onFormChange('age', +e.target.value)}/>
                        </FormItem>
                        <br/>
                        <FormItem label="性别：" valid={gender.valid} error={gender.error}>
                            <select value={gender.value} onChange={e => onFormChange('gender', e.target.value)}>
                                <option value="">请选择</option>
                                <option value="男">男</option>
                                <option value="女">女</option>
                            </select>
                        </FormItem> 
                        <br/>
                        <br/>
                        <input type="submit" value="提交"/>
                    </form>
                </main>
            </div>
        )
    };
}

UserAdd = formProvider({
    name : {
        defaultValue:'',
        rules : [
            {
                pattern:function(value){
                    return value.length > 0
                },
                error:'请输入用户名'
            },
            {
                pattern:/^.{1,4}$/,
                error:'用户最多可以输入四个字'
            }
        ]
    },
    age : {
        defaultValue:0,
        rules : [
            {
                pattern:function(value) {
                    return value >= 1 && value <= 100
                },
                error:'请输入有效的年龄1~100'
            }
        ]
    },
    gender : {
        defaultValue:'',
        rules : [
            {
                pattern:function(value) {
                    return !!value
                },
                error:'请选择性别'
            }
        ]
    }
})(UserAdd)

export default UserAdd