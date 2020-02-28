# DLL组-电子购物商城-刘月
电子购物商城后台子系统的实现
>随着Internet技术的发展，人们的日常生活已经离不开网络，未来的生活和工作将越来越依赖数字技术的发展，越来越数字化、网络化、虚拟化。电子商务也随着网络的发展日益和人们的生活贴近。网上购物是以信息技术为基础的电子商务活动，他通过Internet使交易双方进行商品交易，由于双方不受时间和空间的局限，从而大大扩大了消费者和网络企业的商品交易机会，而且大大降低了商品交易的成本，于是我们研究电子购物商城。
同时，经过讨论，我们将电子购物商城的主题定为“家居”，其开发目的是将家居城电子化，给人们带来更便利的购买体验。摒除遥远的路线和复杂的寻找，通过电子商城简化您的家居需要。

### 项目完成内容（实时更新2.25）
- 基本结构：ionic+MYSQL+express
- 静态页面，使用ionic框架书写，包括管理员信息模块，用户信息模块，商品信息模块，资讯信息模块，销售信息模块，出库登记模块，评论管理模块，其中，除管理员模块外，其他模块仍需与小组另一成员商议后进行调整，基本框架已经搭好，调整的主要内容为不同信息的展示
- 数据库，使用MYSQL数据库，建立名为home的数据库，其中，管理员信息表managerInfo由我独立完成，其他的表仍需与小组另一成员共同完成
- 后端代码采用基于node.js封装的express框架，连接数据库与前端代码
- 目前已经实现的功能有：管理员信息的请求与读取，添加一个新管理员，删除一个管理员，禁用和解禁管理员；商品信息的请求与读取，点击显示商品图片
- 未实现的功能有：用户信息的请求与读取，查找用户，用户的封禁与解禁；商品信息的增删改查；销售信息查询（查询某个商品，某种商品的销售额计算）；资讯信息的请求与读取，资讯信息的增删；出库订单的状态改变；违法评论删除
- 基本操作有：增删改查，封禁解禁
- 其他操作有：①多个表连接查询，计算商品销售额，包括此商品，此类商品，全部商品的销售额，所得填入固定表格；②订单状态从“未发货”改为“已发货”时，该商品库存-1
- 标注：引入NavController，需要用到modalCtrl.create方法的界面有：①创建新管理员②修改管理员信息③创建新商品④商品图片查看⑤修改商品信息⑥创建新资讯
- 标注：需要用到关键字搜索的页面：all

### 更新内容（2.28）
- 图片上传功能的实现，通过获取路径保存至数据库
<!-- - [项目数据库设计书](https://github.com/electronic-shopping-mall/liuyue/blob/master/%E3%80%8A%E6%88%91%E7%88%B1%E6%88%91%E5%AE%B6%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E3%80%8B_%E6%95%B0%E6%8D%AE%E5%BA%93%E8%AE%BE%E8%AE%A1%E8%AF%B4%E6%98%8E%E4%B9%A6.docx) -->


<!-- ### 数据库表格
![image](https://github.com/electronic-shopping-mall/liuyue/blob/master/%E6%95%B0%E6%8D%AE%E5%BA%93%E8%A1%A8%E6%A0%BC/adminInfo.jpg)
![image](https://github.com/electronic-shopping-mall/liuyue/blob/master/%E6%95%B0%E6%8D%AE%E5%BA%93%E8%A1%A8%E6%A0%BC/productInfo.jpg)
![image](https://github.com/electronic-shopping-mall/liuyue/blob/master/%E6%95%B0%E6%8D%AE%E5%BA%93%E8%A1%A8%E6%A0%BC/salesInfo.jpg)
![image](https://github.com/electronic-shopping-mall/liuyue/blob/master/%E6%95%B0%E6%8D%AE%E5%BA%93%E8%A1%A8%E6%A0%BC/userInfo.jpg) -->
