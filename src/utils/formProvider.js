//表单验证提取  封装高阶组件模型
import React from 'react'

function formProvider(fields){
    return function(Comp){
        const initialFormField = {};
        for(const key in fields) {
            initialFormField[key] = {
                value : fields[key].defaultValue,
                error : ''
            }
        }
        class FormComponent extends React.Component {
            constructor (props){
                super(props);
                this.state = {
                    form : initialFormField,
                    formVaild : false //表示整个表单的校验状态
                };
                this.valueChange = this.valueChange.bind(this);
                this.setValueChange = this.setValueChange.bind(this);
            }
            //编辑用户 返回当前用户的值
            setValueChange(values){
                if(!values){
                    return
                }

                const {form} = this.state;
                let newForm = {...form};
                for(let field in form) {
                    if(form.hasOwnProperty(field)){
                        if(typeof values[field] !== 'undefined'){
                            newForm[field] = {...newForm[field], value: values[field]}
                        }
                        // 正常情况下主动设置的每个字段一定是有效的
                        newForm[field].valid = true;
                    }
                }
                this.setState({
                    form:newForm
                })
            }
            //添加用户
            valueChange(fieldName, value) {
                const {form} = this.state;
                const newFieldState = {value,valid:true,error:''};
                const fieldRules = fields[fieldName].rules;

                for(let i = 0; i < fieldRules.length; i++){
                    const {pattern, error} = fieldRules[i];
                    let valid = false;
                    if(typeof pattern === 'function') {
                        valid = pattern(value)
                    } else {
                        valid = pattern.test(value)
                    }
                    if(!valid){
                        newFieldState.valid = false;
                        newFieldState.error = error;
                        break;
                    }
                }
                const newForm = {...form, [fieldName] : newFieldState};
                const formVaild = Object.values(newForm).every(ref => ref.valid);

                this.setState({
                    form:newForm,
                    formVaild
                })
            }
            render(){
                const {form, formVaild} = this.state;
                return <Comp {...this.props} form={form} formVaild={formVaild} 
                onFormChange={this.valueChange} 
                setFormValues={this.setValueChange} />
            }
        }

        return FormComponent
    }
}

export default formProvider
