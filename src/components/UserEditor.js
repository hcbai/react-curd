import React from 'react'
import HomeLayout from '../layouts/HomeLayout'
import FormItem from './FormItem'
import formProvider from '../utils/formProvider'

class UserEditor extends React.Component {
    componentDidMount(){
        const {editTarget, setFormValues} = this.props;
        if(editTarget){
            setFormValues(editTarget)
        }
    }
    fromSubmit(e){
        e.preventDefault();
        // alert(JSON.stringify(this.state))

        //formProvider接收一个fields参数，并返回一个函数，经过formProvider处理后的UserAdd组件会得到额外的props
        const {form:{name, age, gender}, formVaild, editTarget} = this.props;

        //判断用户输入的是否合格
        if(!formVaild) {
            alert('请填写正确的信息');
            return;
        }

        let editType = '添加';
        let apiUrl = 'http://localhost:3000/user';
        let method = 'post';
        if(editTarget) {
            editType = '编辑';
            apiUrl += '/' + editTarget.id;
            method = 'put'
        }

        //使用fetch()提交数据
        fetch(apiUrl,{
            method,
            body:JSON.stringify({name: name.value, age: age.value, gender: gender.value}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            if(res.id){
                alert(editType +'用户成功');
                //用户添加完成 跳转到用户列表页面
                this.context.router.push('/user/list');
                return             
            } else {
                alert(editType + '添加失败')
            }
        })
        //处理提交失败
        .catch(err => console.error(err))
    };
    render(){

        //formProvider接收一个fields参数，并返回一个函数，经过formProvider处理后的UserAdd组件会得到额外的props
        const {form:{name, age, gender}, onFormChange} = this.props;

        return (
            <HomeLayout title="添加用户">
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
                    <input type="submit" value="提交"/>
                </form>
            </HomeLayout>
        )
    };
}

UserEditor.contextTypes = {
    router: React.PropTypes.object.isRequired
}

UserEditor = formProvider({
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
})(UserEditor)

export default UserEditor