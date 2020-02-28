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
  connection.query(sql,['是',req.body.managerID],function(err,results){
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
  connection.query(sql,['否',req.body.managerID],function(err,results){
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

// //向数据库请求管理员-3.按照id号查询 成功
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
  connection.query(sql,[req.body.managerID,req.body.managerName,req.body.sex,req.body.email,req.body.password,req.body.phoneNum,req.body.isForbid,req.body.managerID],function(err){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({status:1});
  })
})

//向数据库请求用户信息
router.post('/api/userInfo',function(req,res){
  console.log(req.body.id);
  const sql = 'select * from userInfo';
  connection.query(sql,[],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  })
})

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

//向数据库请求商品信息-2.按照标题查询 失败
router.post('/api/searchthree/title',function(req,res){
  const sql="select product.*,specification.* from product,specification where product.productID = specification.productID and product.title like '%?%'";
  connection.query(sql,[req.body.title],function(err,results){
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

//添加新资讯 成功
router.post('/api/news/create',function(req,res){
  console.log(req.body.id);
  const sql = 'insert into news values(?,?,?,?,?,?)';
  connection.query(sql,[req.body.newsID,req.body.theme,req.body.time,req.body.title,req.body.images,req.body.detail],function (err,resluts){
    if(err){
      console.error(err);
      process.exit(1);
    }
    log(resluts);
    res.json({status:1});
  })
})




//查询收货地址
router.post('/api/address',function(req,res){
  const sql='select * from address where userID=? order by time asc';
  connection.query(sql,[req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  });
});

//添加收货地址
router.post('/api/addAddress',function(req,res){
  var num;
  var getRandom=function(){  //生成地址ID，6位随机数
    var arr=new Array();
    for(var j=1;j<=6;j++){
      arr.push(j);
    }

    var len=arr.length;
    var result=[];
    var r;
    for(var i=0;i<len;i++){
      r=Math.floor(Math.random()*arr.length);
      result.push(arr[r]);
    }
    var number='';
    for(var k=0;k<result.length;k++){
      number+=result[k];
    }
    return parseInt(number);

  }
  var randomAddressID=getRandom();
  log(randomAddressID);

  const sql1='select * from address where addressID=?';
  connection.query(sql1,[randomAddressID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    var rlen=results.length;
    while(rlen!=0){
      randomAddressID=getRandom();
      return connection.query(sql1,[randomAddressID],function(err,results){
        if(err){
          console.error(err);
          process.exit(1);
        }
        rlen=results.length;
      });
    }
  });

  if(req.body.isDefault==true){
    const sql2='insert into address values(?,?,?,?,?,?,?,null)';
    connection.query(sql2,[randomAddressID,req.body.userID,req.body.name,req.body.phone,req.body.area,req.body.detail,'true'],function(err,_results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });

    const sql3='update address set isDefault=? where userID=? and addressID!=?';
    connection.query(sql3,['false',req.body.userID,randomAddressID],function(err,_results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      res.json({status:1}); //插入成功
    });
  }else{
    const sql2='insert into address values(?,?,?,?,?,?,?,null)';
    connection.query(sql2,[randomAddressID,req.body.userID,req.body.name,req.body.phone,req.body.area,req.body.detail,'false'],function(err,_results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      res.json({status:1}); //插入成功
    });
  }
});

//修改默认地址
router.post('/api/changeDefault',function(req,_res){
  if(req.body.isDefault=='true'){
    const sql1='update address set isDefault=? where addressID=?';
    connection.query(sql1,['true',req.body.addressID],function(err,_results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });

    const sql2='update address set isDefault=? where userID=? and addressID!=?';
    connection.query(sql2,['false',req.body.userID,req.body.addressID],function(err,_results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });
  }else{
    const sql='update address set isDefault=? where addressID=?';
    connection.query(sql,['false',req.body.addressID],function(err,_results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });
  }
});

//查询某一特定地址
router.post('/api/specificAddress',function(req,res){
  const sql1='select * from address where addressID=?';
  connection.query(sql1,[req.body.addressID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  });
});

//修改收货地址
router.post('/api/editAddress',function(req,res){
  log(req.body.isDefault);
  log(req.body.addressID);
  if(req.body.isDefault==true){
    const sql1='update address set name=?,phone=?,area=?,detail_address=?,isDefault=? where addressID=?';
    connection.query(sql1,[req.body.name,req.body.phone,req.body.area,req.body.detail,'true',req.body.addressID],function(err,_results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });
    
    const sql2='update address set isDefault=? where userID=? and addressID!=?';
    connection.query(sql2,['false',req.body.userID,req.body.addressID],function(err,_results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      log('修改完毕');
      res.json({status:1}); //修改成功
    });
    
    
  }else{
    const sql='update address set name=?,phone=?,area=?,detail_address=?,isDefault=? where addressID=?';
    connection.query(sql,[req.body.name,req.body.phone,req.body.area,req.body.detail,'false',req.body.addressID],function(err,_results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      res.json({status:1}); //修改成功
    });
  }

});

//删除某一地址
router.post('/api/deleteAddress',function(req,res){
  const sql1='delete from address where addressID=?';
  connection.query(sql1,[req.body.addressID],function(err,_results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    const sql2='select * from address where userID=? order by time asc';
    connection.query(sql2,[req.body.userID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      res.json(results);
    });
  });
});





app.use(router);

app.listen(8080);


