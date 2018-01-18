//表单验证提取  封装高阶组件模型
import React from 'react'

function formProvider(fields){
    return function(Comp){

        const initialFormField = {};
        for(const key in fields) {
            initialFormField[key] = {
                value:fields[key].defaultValue,
                error:''
            }
        }

        class FormComponent extends React.Component {
            constructor (){
                super();
                this.state = {
                    form : initialFormField,
                    formVaild : false //表示整个表单的校验状态
                };
                this.valueChange = this.valueChange.bind(this);
            }
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
                        newFieldState.valid = true;
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
                return <Comp {...this.props} form={form} formVaild={formVaild} onFormChange={this.valueChange} />
            }
        }

        return FormComponent
    }
}

export default formProvider
