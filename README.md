<!--
 * @Author: your name
 * @Date: 2020-07-28 16:03:38
 * @LastEditTime: 2020-08-06 19:09:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-weibo-app\README.md
-->
# koa2-weibo-app

使用数据库 `use 数据库名;`

1. 查询 `select * from users;`
  - 按照名称查询 `select username, nickname from users;`
  - 按照条件查询 `select username, nickname from users where username='zhangsan'and`password`='123';`
  - 按照某个字段倒序排 `select * from blogs order by id desc;`
  - 限制行数查询 `select * from blogs order by id desc limit 2;`
  - 限制行数并按步长查询【用于分页】 `select * from blogs order by id desc limit 2 offset 2;`

2. 连表查询
  - 将blogs中关联users的表信息一块儿查询 `select * from blogs inner join users on users.id = blogs.userid;` 
  - 将users表中特定的字段做返回查询 `select blogs. * , users.username, users.nickname from blogs inner join users on users.id = blogs.userid;`
  - 加查询条件 `select blogs. * , users.username, users.nickname from blogs inner join users on users.id = blogs.userid where users.username='lisi';`

> inner join on 语句不一定需要外键


3. 新增 `insert into users(username, `password`, nickname) values('zhangsan', '123', '张三');`

4. 更新 `update blogs set content='内容1内容1' where id='1';`

5. 删除 `delete from blogs where id=1;`

6. 查询总数 `select count(*) as sum from blogs;`
  - 查询某一项总数 `select count(id) as sum from blogs;`

## 外键优点
- 更新限制 & 删除级联
- 连表查询

## sequelize
- `npm i mysql2 sequ3lize -d`


## 安装redis 及使用
- https://www.runoob.com/redis/redis-install.html


## inspect 断点调试
- dev 配置--inspect=9229
- 启动`yarn run dev`
- inspect 断点调试：打开chrome://inspect/#devices



## 技术方案-架构图

1. routes
   - 页面/view
   - API
   - 校验

2. controller
   - 业务逻辑
   - 返回格式

3. cache
   - 公共信息
   - redis

4. service
   - 数据处理
   - 格式化

5. db / sequelize
   - 定义模型
   - 封装操作
   - MySQL
