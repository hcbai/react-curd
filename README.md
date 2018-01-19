## `http://blog.csdn.net/awaw00/article/category/6692955`

## 项目搭建，创建基本架构`cnpm init -y` ，下载核心包`cnpm i react react-dom react-router -S`

## 使用`json-server`搭建后台服务管理系统，在根目录下创建server文件夹保存数据库文件`db.json`json格式的文件
### 最后在/server目录执行`json-server db.json -w -p 3000`，访问网址`http://localhost:3000`,测试我们搭建的数据接口

## 安装react项目搭建工具`cnpm i roadhog -g`

* 新建/src目录，用于存放客户端代码
* 新建/public目录，用户存放项目的静态文件（图片等）
* 新建/src/index.js和/public/index.html两个文件，分别作为应用的入口文件和页面的入口文件

## 配置路由 `import {Router, Route, HashHistory} from 'react-router'`

## 注意：bug已经解决  注意 react-router 4.x 和之前版本不一样 

## 我们可以在添加用户之后，使用`this.context.router.push()`方法来跳转到用户列表页面：
## 必须给UserAdd定义一个包含router属性的contextTypes
## 使得组件中可以通过this.context.router来使用React Router提供的方法
`UserAdd.contextTypes = {
  router: React.PropTypes.object.isRequired 
};`






