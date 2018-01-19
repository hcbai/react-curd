import React from 'react'
//提取页面重复代码
class HomeLayout extends React.Component{
    render(){
        const {title, children} = this.props;
        console.log(this.props)
        return (
            <div>
                <header>
                    <h1>{title}</h1>
                </header>
                <main>
                    {children}
                </main>
            </div>
        )
    }
}

export default HomeLayout