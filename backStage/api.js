const express=require('express');
const mysql=require('mysql');
var bodyParser=require('body-parser');
const app=express();
const router=express.Router();
const log=console.log;
// const formidable=require('formidable');
//         fs = require('fs'),
//         TITLE = 'formidable上传示例',
//         AVATAR_UPLOAD_FOLDER = './public/upload/',
//         domain = "http://192.168.218.1:8080";
// const db=require('./db');
// var sql = require('mssql');

app.use(express.static('./public'));

app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({extended: true}));

//创建数据库连接
const connection = mysql.createConnection({
      host:"localhost",
      user:"root",
      password:"",
      database:"home"
});
connection.connect();

//登录  成功
router.post('/api/login',function(req,res){
  //log(req.body.phone);
  const sql='select password,isForbid from managerinfo where phoneNum=?';
  connection.query(sql,[req.body.phone],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    if(results[0]==undefined){
      res.json({status:1}); //不存在此管理员
    }else{
      results.forEach(function(e){
        if(req.body.pwd!==e.password){
          res.json({status:2}); //密码错误
        }else if(e.isForbid=="是"){
          res.json({status:3}); //账号禁止使用
        }else{
          res.json({status:4});//成功，可以登录
        }
      });
    }
  });
});

//向数据库请求管理员信息 成功
router.post('/api/managerinfo',function(req,res){
  console.log(req.body.id);
  const sql ='select* from managerinfo';
  connection.query(sql,[],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  })
})
//封禁管理员 成功
router.post('/api/freezeManager',function(req,res){
  console.log(req.body.managerID);
  const sql='update managerinfo set isForbid=? where managerID=?';
  const tmp='是';
  connection.query(sql,[tmp,req.body.managerID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    log(results); 
    res.json({'info':'禁用'});
  });    
});

//启用管理员 成功
router.post('/api/unfreezeManager',function(req,res){
  const sql='update managerinfo set isForbid=? where managerID=?';
  const tmp='否';
  connection.query(sql,[tmp,req.body.managerID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    log(results); 
    res.json({'info':'正常'});
  });    
});

//向数据库请求管理员-1.按照手机号查询 成功
router.post('/api/searchone/phoneNum',function(req,res){
  const sql='select * from managerInfo where phoneNum=?';
  connection.query(sql,[req.body.phoneNum],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//向数据库请求管理员-2.按照性别查询 成功
router.post('/api/searchone/sex',function(req,res){
  const sql='select * from managerInfo where sex=?';
  connection.query(sql,[req.body.sex],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//向数据库请求管理员-3.按照id号查询 成功
router.post('/api/searchone/id',function(req,res){
  const sql='select * from managerInfo where managerID =?';
  connection.query(sql,[req.body.id],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
    //log(results);
    res.json(results);    
  });
});

//向数据库添加管理员 成功
router.post('/api/createManager',function(req,res){
  console.log(req.body.id);
  const sql = 'insert into managerInfo values(?,?,?,?,?,?,?)';
  connection.query(sql,[req.body.managerID,req.body.managerName,req.body.sex,req.body.email,req.body.password,req.body.phoneNum,req.body.isForbid],function (err,resluts){
    if(err){
      console.error(err);
      process.exit(1);
    }
    log(resluts);
    res.json({status:1});
  })
})

//删除某个管理员 成功
router.post('/api/managerinfo/delete',function(req,res){
  const sql='delete from managerInfo where managerID=?';
  connection.query(sql,[req.body.managerID],function(err,resluts){
    if(err){
      console.error(err);
      process.exit(1);
    }
    // log(results);
    res.json(resluts);
  })
});

//修改管理员信息弹出获取 成功
router.post('/api/managerinfo/revise',function(req,res){
  console.log(req.body.managerID);
  const sql = 'select * from managerInfo where managerID=?';
  connection.query(sql,[req.body.managerID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  })
})

//修改管理员信息保存至数据库 成功
router.post('/api/reviseManager',function(req,res){
  console.log(req.body.id);
  const sql='update managerInfo set managerID=?,managerName=?,sex=?,email=?,password=?,phoneNum=?,isForbid=? where managerID=?';
  connection.query(sql,[req.body.managerID,req.body.managerName,req.body.sex,req.body.email,req.body.password,req.body.phoneNum,req.body.isForbid],function(err){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({status:1});
  })
})

//向数据库请求用户信息 成功
router.post('/api/userInfo',function(req,res){
  console.log(req.body.id);
  const sql = 'select * from user';
  connection.query(sql,[],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  })
})

//冻结用户 成功
router.post('/api/freezeUser',function(req,res){
  console.log(req.body.userID);
  const sql='update user set status=? where userID=?';
  const tmp='禁用';
  connection.query(sql,[tmp,req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    log(results); 
    res.json({'info':'禁用'});
  });    
});

//解冻用户 成功
router.post('/api/unfreezeUser',function(req,res){
  const sql='update user set status=? where userID=?';
  const tmp='正常';
  connection.query(sql,[tmp,req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    log(results); 
    res.json({'info':'正常'});
  });    
});

//向数据库请求用户-1.按照id查询 成功
router.post('/api/searchtwo/id',function(req,res){
  const sql='select * from user where userID=?';
  connection.query(sql,[req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//向数据库请求管理员-2.按照姓名查询 成功
router.post('/api/searchtwo/name',function(req,res){
  const sql='select * from user where userName=?';
  connection.query(sql,[req.body.userName],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//向数据库请求商品信息 成功
router.post('/api/productInfo',function(req,res){
  console.log(req.body.id);
  const sql ='select product.*,specification.* from product,specification where product.productID = specification.productID;';
  connection.query(sql,[],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  })
})

//删除商品
router.post('/api/product/delete',function(req,res){
  const sql='delete from specification where specification.productID=? and specification.type=?';
  connection.query(sql,[req.body.productID,req.body.type],function(err,resluts){
    if(err){
      console.error(err);
      process.exit(1);
    }
    // log(results);
    res.json(resluts);
  })
});

//添加新商品
router.post('/api/product/createproductinfo',function(req,res){
  console.log(req.body.id);
  const sql = 'insert into product values(?,?,?,?,?,?,?,?)';
  connection.query(sql,[req.body.productID,req.body.title,req.body.price,req.body.parentType,req.body.childType,req.body.describeText,req.body.detail,req.body.images],function (err,resluts){
    if(err){
      console.error(err);
      process.exit(1);
    }
    log(resluts);
    res.json({status:1});
  })
});
router.post('/api/product/createspecification',function(req,res){
  console.log(req.body.id);
  const sql='insert into specification values(?,?,?,"0")';
  connection.query(sql,[req.body.productID,req.body.type,req.body.stockNum],function(err,resluts){
    if(err){
      console.error(err);
      process.exit(1);
    }
    log(resluts);
    res.json({status:1});
  })
});

//向数据库请求商品的detail图片 成功
router.post('/api/productInfo/detail',function(req,res){
  console.log(req.body.productID);
  const sql ='select detail from product where productID=?';
  connection.query(sql,[req.body.productID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  })
})

//向数据库请求商品的image图片 成功
router.post('/api/productInfo/image',function(req,res){
  console.log(req.body.productID);
  const sql ='select images from product where productID=?';
  connection.query(sql,[req.body.productID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  })
})

//向数据库请求商品信息-1.按照id号查询 成功
router.post('/api/searchthree/productID',function(req,res){
  const sql='select product.*,specification.* from product,specification where product.productID=specification.productID AND product.productID=?;';
  connection.query(sql,[req.body.productID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//向数据库请求商品信息-2.按照标题查询 成功
router.post('/api/searchthree/title',function(req,res){
  const sql="select product.*,specification.* from product,specification where product.productID = specification.productID and product.title like ?";
  var tmp='%'+req.body.title+'%';
  connection.query(sql,[tmp],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

// //向数据库请求商品信息-3.按照分类查询 成功
router.post('/api/searchthree/parentType',function(req,res){
  const sql='select product.*,specification.* from product,specification where product.productID = specification.productID and product.parentType=? ';
  connection.query(sql,[req.body.parentType],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
    //log(results);
    res.json(results);    
  });
});

//请求所有资讯 成功
router.post('/api/news',function(req,res){
  console.log(req.body.id);
  const sql='select * from news';
  connection.query(sql,[],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  });
});

//查看news详情 不需要
router.post('/api/news/detail',function(req,res){
  console.log(req.body.newsID);
  const sql ='select * from news where newsID=?';
  connection.query(sql,[req.body.newsID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  })
})

//删除news 成功
router.post('/api/news/delete',function(req,res){
  const sql='delete from news where newsID=?';
  connection.query(sql,[req.body.newsID],function(err,resluts){
    if(err){
      console.error(err);
      process.exit(1);
    }
    // log(results);
    res.json(resluts);
  })
});

//查看new的图片
router.post('/api/news/image',function(req,res){
  const sql ='select pictures from news where newsID=?';
  connection.query(sql,[req.body.newsID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  })
})

//查看news的内容
router.post('/api/news/texr',function(req,res){
  const sql ='select content from news where newsID=?';
  connection.query(sql,[req.body.newsID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  })
})

//向数据库请求news信息-1.按照类型查询 成功
router.post('/api/searchfour/type',function(req,res){
  const sql='select * from news where type=?';
  connection.query(sql,[req.body.type],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//向数据库请求news信息-2.按照标题查询 成功
router.post('/api/searchfour/title',function(req,res){
  const sql='select * from news where title like ?';
  var tmp='%'+req.body.title+'%';
  connection.query(sql,[tmp],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//添加新资讯
router.post('/api/news/create',function(req,res){
  console.log(req.body.id);
  const sql = 'insert into news values(?,?,?,?,?,?)';
  connection.query(sql,[req.body.newsID,req.body.type,req.body.title,req.body.content,req.body.pictures,req.body.time],function (err,resluts){
    if(err){
      console.error(err);
      process.exit(1);
    }
    log(resluts);
    res.json({status:1});
  })
})

//查询销售情况
router.post('/api/sales',function(req,res){
  console.log(req.body.id);
  const sql='select product.*,specification.* from product,specification where product.productID = specification.productID';
  connection.query(sql,[],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  });
});

//向数据库请求销售信息-1.按照子分类查询 成功
router.post('/api/searchfive/childType',function(req,res){
  const sql='select product.*,specification.* from product,specification where product.productID = specification.productID and product.childType=? ';
  connection.query(sql,[req.body.childType],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
    //log(results);
    res.json(results);    
  });
});

//向数据库请求销售信息-2.按照标题查询 成功
router.post('/api/searchfive/title',function(req,res){
  const sql="select product.*,specification.* from product,specification where product.productID = specification.productID and product.title like ?";
  var tmp='%'+req.body.title+'%';
  connection.query(sql,[tmp],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//向数据库请求销售信息-3.按照id号查询 成功
router.post('/api/searchfive/productID',function(req,res){
  const sql='select product.*,specification.* from product,specification where product.productID=specification.productID AND product.productID=?;';
  connection.query(sql,[req.body.productID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//查询订单信息 ok
router.post('/api/check/orderInfo',function(req,res){
  console.log(req.body.id);
  const sql = "select orderform.*,specification.* from specification,orderform where orderform.productID=specification.productID and orderform.type=specification.type order by createTime";
  connection.query(sql,[],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  });
});

//分类查询订单-1状态  ok
router.post('/api/searchsix/status',function(req,res){
  const sql='select * from orderform where orderStatus=? ';
  connection.query(sql,[req.body.orderStatus],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
    res.json(results);    
  });
});
//分类查询订单-2用户  ok
router.post('/api/searchsix/userID',function(req,res){
  const sql='select * from orderform where userID=? ';
  connection.query(sql,[req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
    res.json(results);    
  });
});
//分类查询订单-3商品  ok
router.post('/api/searchsix/productID',function(req,res){
  const sql='select * from orderform where productID=? ';
  connection.query(sql,[req.body.productID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
    res.json(results);    
  });
});

//修改订单状态
router.post('/api/order/out',function(req,res){
  const sql='update orderform set orderStatus=? where orderNumber=?;update specification set stockNum=stockNum-1 where productID=? and type=?;update specification set soldNum=soldNum+1 where productID=? and type=?';
  var tmp='已发货';
  connection.query(sql,[tmp,req.body.orderNumber,req.body.productID,req.body.type],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    log(results); 
    res.json({'info':'已发货'});
  });
})

app.use(router);

app.listen(8080);