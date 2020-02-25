const express=require('express');
const mysql=require('mysql');
var bodyParser=require('body-parser');
const app=express();
const router=express.Router();
const log=console.log;
// const db=require('./db');
// var sql = require('mssql');

/*
const formidable=require('formidable');
        fs = require('fs'),
        TITLE = 'formidable上传示例',
        AVATAR_UPLOAD_FOLDER = './public/upload/',
        domain = "http://192.168.204.144:8000";
*/
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

//登录  已经成功
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

//向数据库请求管理员-1.按照手机号查询 没做出来
router.post('/api/search/phoneNum',function(req,res){
  const sql='select info.*,phoneNum,managerName from managerInfo and phoneNum=?';
  connection.query(sql,[req.body.phone],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});


//向数据库请求管理员-2.按照性别查询 没做出来
router.post('/api/search/sex',function(req,res){
  const sql='select info.*,phoneNumber,userStatus,status,userName from info,login,mine where info.ID=login.ID and mine.ID=info.ID and info.sex=?';
  connection.query(sql,[req.body.sex],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});


// //向数据库请求管理员-3.按照id号查询 没做出来
router.post('/api/searchone/id',function(req,res){
  const sql='select info.*,phoneNumber,userStatus,status,userName from info,login,mine where info.ID=login.ID and mine.ID=info.ID and info.ID=?';
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

//删除某个管理员
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


//向数据库请求商品信息
router.post('/api/productInfo',function(req,res){
  console.log(req.body.id);
  const sql ='select * from productInfo';
  connection.query(sql,[],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  })
})

//向数据库请求商品的detail图片
router.post('/api/productInfo/detail',function(req,res){
  console.log(req.body.productID);
  const sql ='select detail from productInfo where productID=?';
  connection.query(sql,[req.body.productID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.string(results);
  })
})

//向数据库请求商品的image图片
router.post('/api/productInfo/image',function(req,res){
  console.log(req.body.productID);
  const sql ='select images from productInfo where productID=?';
  connection.query(sql,[req.body.productID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.string(results);
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
    connection.query(sql2,[randomAddressID,req.body.userID,req.body.name,req.body.phone,req.body.area,req.body.detail,'true'],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });

    const sql3='update address set isDefault=? where userID=? and addressID!=?';
    connection.query(sql3,['false',req.body.userID,randomAddressID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      res.json({status:1}); //插入成功
    });
  }else{
    const sql2='insert into address values(?,?,?,?,?,?,?,null)';
    connection.query(sql2,[randomAddressID,req.body.userID,req.body.name,req.body.phone,req.body.area,req.body.detail,'false'],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      res.json({status:1}); //插入成功
    });
  }
});

//修改默认地址
router.post('/api/changeDefault',function(req,res){
  if(req.body.isDefault=='true'){
    const sql1='update address set isDefault=? where addressID=?';
    connection.query(sql1,['true',req.body.addressID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });

    const sql2='update address set isDefault=? where userID=? and addressID!=?';
    connection.query(sql2,['false',req.body.userID,req.body.addressID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });
  }else{
    const sql='update address set isDefault=? where addressID=?';
    connection.query(sql,['false',req.body.addressID],function(err,results){
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
    connection.query(sql1,[req.body.name,req.body.phone,req.body.area,req.body.detail,'true',req.body.addressID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
    });
    
    const sql2='update address set isDefault=? where userID=? and addressID!=?';
    connection.query(sql2,['false',req.body.userID,req.body.addressID],function(err,results){
      if(err){
        console.error(err);
        process.exit(1);
      }
      log('修改完毕');
      res.json({status:1}); //修改成功
    });
    
    
  }else{
    const sql='update address set name=?,phone=?,area=?,detail_address=?,isDefault=? where addressID=?';
    connection.query(sql,[req.body.name,req.body.phone,req.body.area,req.body.detail,'false',req.body.addressID],function(err,results){
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
  connection.query(sql1,[req.body.addressID],function(err,results){
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

//请求资讯 创意空间
router.post('/api/news/creative',function(req,res){
  const sql1='select * from news where type=?';
  connection.query(sql1,['创意空间'],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  });
});

//请求某一特定资讯
router.post('/api/news/specific',function(req,res){
  const sql1='select * from news where newsID=?';
  connection.query(sql1,[req.body.newsID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  });
});

//测试
router.post('/api/test',function(req,res){
  console.log(req.body.id);
  const sql='select * from managerInfo where managerID=?';
  connection.query(sql,[100001],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
    });
  });


//测试向数据库请求管理员信息managerInfo
// router.post('/api/managerInfo',function(req,res){
//   console.log(req.body.id);
//   const sql ='select * from managerInfo';
//   connection.query(sql,[],function(err,results){
//     if(err){
//       console.error(err);
//       process.exit(1);
//     }
//     res.json(results);
//   })
// })


app.use(router);

app.listen(8080);


