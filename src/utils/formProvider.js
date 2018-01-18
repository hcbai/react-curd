//表单验证提取  封装高阶组件模型
import React from 'react'

function formProvider(field){
    return function(Comp){

        const initialFormField = {};
        for(const key in field) {
            initialFormField[key] = {
                value:field[key].defaultValue,
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
                const newFieldState = {valid:false,value,error:''};
                const fieldRules = field[fieldName].rules;
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
                const newForm = {...form, [fieldName]:newFieldState};
                const formVaild = Object.values(newForm).every(f => f.valid)

                this.setState({
                    form:newForm,
                    formVaild
                })
            }
            render(){
                const {form, formVaild} = this.state;
                return (
                    <Comp {...this.props} form={form} formVaild={formVaild} onFormChange={this.valueChange} />
                )
            }
        }

        return FormComponent
    }
}

export default formProvider
