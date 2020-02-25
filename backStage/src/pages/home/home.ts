import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, ModalController, App } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { HomeScheduleDetailPage } from '../home-schedule-detail/home-schedule-detail';
import { NewhomeSchedulePage } from '../newhome-schedule/newhome-schedule';
import { LoginPage } from '../login/login';
import { ProjectDetailPage } from '../project-detail/project-detail';
import { OfficalprojectPage } from '../officalproject/officalproject';
import { UserprojectPage } from '../userproject/userproject';
import { CreateprojectPage } from '../createproject/createproject';

import * as echarts from 'echarts'; 
import { CreateManagerPage } from '../create-manager/create-manager';
import { ProductDetailPage } from '../product-detail/product-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController,private http:HttpClient,public modalCtrl: ModalController,public app:App) {
    console.log(echarts);
  }
  goLogin(){ //退出登录
    this.app.getRootNavs()[0].setRoot(LoginPage);
  }
 
  num=10;
  managerName;
  flag=false;

// 2.20  18：00将user改为manager
  manager=[];  //用户账号管理
  ionViewDidLoad(){
    this.managerName=localStorage.getItem('managerName');
  }
  ionViewWillEnter(){

  }

  lis;
  fun(i){
    this.num=i;
    this.lis=document.getElementsByClassName('li');
    this.lis[i-1].style.backgroundColor='#18A0A9';
    for(var j=0;j<this.lis.length;j++){
      if(j!=i-1){
        this.lis[j].style.backgroundColor='#32c2cd';
      }
    }
    if(i==1){this.endOne(i);
    }else if(i==2){this.endTwo(i);
    }else if(i==3){this.endThree(i); 
    }else if(i==4){this.endFour(i);
    }else if(i==5){this.endFive(i);
    }else if(i==6){this.endSix(i);
    }else if(i==7){this.endSeven(i);
    }
  }

  //请求账号信息
  endOne(i){
    this.http.post('/api/managerinfo',{}).subscribe(data=>{   
      this.manager=Array.prototype.slice.call(data); 
    });
  }


  back;  //冻结账号返回的信息
  managerID;  //管理员的ID
  freeze(i){  //冻结账号
    this.managerID=this.manager[i].managerID;
    console.log(this.managerID);
    var us=document.getElementsByClassName('isForbid')[i];
    us.innerHTML='是';
    this.http.post('/api/freezeManager',{id:this.managerID}).subscribe(data=>{
      this.back=data;
      
      console.log(this.back.info);
    });
  }
  unfreeze(j){  //解冻账号
    this.managerID=this.manager[j].managerID;
    console.log(this.managerID);
    var us=document.getElementsByClassName('isForbid')[j];
    us.innerHTML='否';
    this.http.post('/api/unfreezeManager',{id:this.managerID}).subscribe(data=>{
      this.back=data;
      console.log(this.back.info);
    });
  } 


  typeTextone;
  textone;
  searchone(){
    console.log(this.typeTextone);
    console.log(this.textone);
    if(this.typeTextone=='all'){
      this.http.post('/api/managerInfo',{}).subscribe(data=>{
        this.manager=Array.prototype.slice.call(data); 
      });
    }else if(this.typeTextone=='phone'){
      this.http.post('/api/search/phoneNum',{phoneNum:this.textone}).subscribe(data=>{
        this.manager=Array.prototype.slice.call(data); 
      });
    }else if(this.typeTextone=='sex'){
      this.http.post('/api/search/sex',{sex:this.textone}).subscribe(data=>{
        this.manager=Array.prototype.slice.call(data); 
      });
    }else if(this.typeTextone=='id'){
      this.http.post('/api/searchone/id',{id:this.textone}).subscribe(data=>{
        this.manager=Array.prototype.slice.call(data); 
      });
    }
  }

  newManager(){//新建一个管理员
      let profileModal = this.modalCtrl.create(CreateManagerPage);
      profileModal.present();
  }

  managerDelete(i){ //删除一个管理员
    this.managerID=this.manager[i].managerID;
    this.http.post('/api/managerinfo/delete',{managerID:this.managerID}).subscribe(data=>{
      console.log(data);
    });
    this.http.post('/api/managerinfo',{}).subscribe(data=>{  
      this.manager=Array.prototype.slice.call(data); 
      console.log(this.manager);
    });
  }

  user=[];  //用户信息管理
  endTwo(i){
    this.http.get('/api/userInfo').subscribe(data=>{  //请求用户活动信息
      this.user=Array.prototype.slice.call(data); 
    });
  }

  typeTexttwo;
  texttwo;
  // searchtwo(){
  //   // console.log(this.typeTextone);
  //   // console.log(this.textone);
  //   if(this.typeTexttwo=='all'){
  //     this.http.get('/api/activity').subscribe(data=>{
  //       this.activity=Array.prototype.slice.call(data); 
  //     });
  //   }else if(this.typeTexttwo=='id'){
  //     this.http.post('/api/searchtwo/id',{id:this.texttwo}).subscribe(data=>{
  //       this.activity=Array.prototype.slice.call(data); 
  //     });
  //   }
  // }

  search;
  clear(){
    this.search=document.getElementsByClassName('search');
    console.log(this.search.length);
    for(var i=0;i<this.search.length;i++){
      console.log(this.search[i]);
      this.search[i].value='';
    }
  }

//商品信息管理
productInfo;//
endThree(i){
  this.http.post('/api/productInfo',{}).subscribe(data=>{  
    this.productInfo=Array.prototype.slice.call(data); 
    // this.detail=this.productInfo.detail.split("|");
    // console.log(this.detail);
    // console.log(this.productInfo);
  });
}

productID;
//商品两种类型图片的查看
productDetail(id){
    // var productID=document.getElementsByClassName('product')[i];
    // this.productID=this.productInfo[i].productID;
    // console.log(productID); 
    localStorage.setItem('productID',id);

    let profileModal = this.modalCtrl.create(ProductDetailPage);
    profileModal.present();
  
}


homeProject;
endFour(i){
  // this.http.get('/api/officialProject').subscribe(data=>{  //请求系统推荐作品
  //   this.homeProject=Array.prototype.slice.call(data); 
  //   console.log(this.homeProject);
  // });
}

endFive(i){
  this.http.get('/api/userProject').subscribe(data=>{  //请求系统推荐作品
    this.homeProject=Array.prototype.slice.call(data); 
    console.log(this.homeProject);
  });
}

comment;//所有评论Sven
endSeven(i){
  this.http.get('/api/comment').subscribe(data=>{  
    this.comment=Array.prototype.slice.call(data); 
    console.log(this.comment);
  });
}
//分类查询首页作品e
typeTextthree;
textthree;
searchthree(){
  // console.log(this.typeTextone);
  // console.log(this.textone);
  if(this.typeTextthree=='all'){
    this.http.get('/api/homeProject').subscribe(data=>{  //请求首页推荐作品
      this.homeProject=Array.prototype.slice.call(data); 
    });
  }else if(this.typeTextthree=='projectID'){//请求作品ID号为...的作品
    this.http.post('/api/searchthree/projectID',{projectID:this.textthree}).subscribe(data=>{
      this.homeProject=Array.prototype.slice.call(data); 
    })
  }else if(this.typeTextthree=='userID'){//请求用户ID号为...的作品
    this.http.post('/api/searchthree/userID',{projectID:this.textthree}).subscribe(data=>{
      this.homeProject=Array.prototype.slice.call(data); 
    })
  }else if(this.typeTextthree=='palce'){//请求地点在哪的作品(待添加)
    this.http.post('/api/searchthree/place',{place:this.textthree}).subscribe(data=>{
      this.homeProject=Array.prototype.slice.call(data); 
      console.log("按地点搜索：",this.homeProject);
    });
  }
}

//分类查看系统作品
typeTextfour;
textfour;
searchfour(){
  // console.log(this.typeTextone);
  // console.log(this.textone);
  if(this.typeTextfour=='all'){
    this.http.get('/api/officialProject').subscribe(data=>{  //请求首页推荐作品
      this.homeProject=Array.prototype.slice.call(data); 
    });
  }else if(this.typeTextfour=='projectID'){//请求作品ID号为...的作品
    this.http.post('/api/searchfour/projectID',{projectID:this.textfour}).subscribe(data=>{
      this.homeProject=Array.prototype.slice.call(data); 
    })
  }else if(this.typeTextfour=='palce'){//请求地点在哪的作品(待添加)
    this.http.post('/api/searchfour/place',{place:this.textfour}).subscribe(data=>{
      this.homeProject=Array.prototype.slice.call(data); 
      console.log("按地点搜索：",this.homeProject);
    });
  }
}

//分类查看用户作品
typeTextfive;
textfive;
searchfive(){
  // console.log(this.typeTextone);
  // console.log(this.textone);
  if(this.typeTextfive=='all'){
    this.http.get('/api/userProject').subscribe(data=>{  //请求用户作品
      this.homeProject=Array.prototype.slice.call(data); 
    });
  }else if(this.typeTextfive=='projectID'){//请求作品ID号为...的作品
    this.http.post('/api/searchfive/projectID',{projectID:this.textfive}).subscribe(data=>{
      this.homeProject=Array.prototype.slice.call(data); 
    })
  }else if(this.typeTextfive=='userID'){//请求用户ID号为...的作品
    this.http.post('/api/searchfive/userID',{userID:this.textfive}).subscribe(data=>{
      this.homeProject=Array.prototype.slice.call(data); 
    })
  }else if(this.typeTextfive=='palce'){//请求地点在哪的作品(待添加)
    this.http.post('/api/searchfive/place',{place:this.textfive}).subscribe(data=>{
      this.homeProject=Array.prototype.slice.call(data); 
      console.log("按地点搜索：",this.homeProject);
    });
  }
}

//分类查询评论
typeTextnine;
textnine;
searchnine(){
  // console.log(this.typeTextone);
  // console.log(this.textone);
  if(this.typeTextnine=='all'){
    this.http.get('/api/comment').subscribe(data=>{  //请求用户作品
      this.comment=Array.prototype.slice.call(data); 
    });
  }else if(this.typeTextnine=='projectID'){//请求作品ID号为...的作品
    this.http.post('/api/searchnine/projectID',{projectID:this.textnine}).subscribe(data=>{
      this.comment=Array.prototype.slice.call(data); 
    })
  }else if(this.typeTextnine=='userID'){//请求用户ID号为...的作品
    this.http.post('/api/searchnine/userID',{userID:this.textnine}).subscribe(data=>{
      this.comment=Array.prototype.slice.call(data); 
    })
  }
}

//删除评论
commentID;
commentdelete(i){
  this.commentID=this.comment[i].RowGuid;
  this.http.post('/api/comment/delete',{RowGuid:this.commentID}).subscribe(data=>{
    console.log(data);
  });
  this.http.get('/api/comment').subscribe(data=>{  
    this.comment=Array.prototype.slice.call(data); 
    console.log(this.comment);
  });
}

//创建新的系统作品
createOproject(){
  let profileModal = this.modalCtrl.create(CreateprojectPage);
  profileModal.present();
}

//查看作品详情
projectdetailID;//记录点击的是哪个作品ID。
pcheck(i){//查看推荐作品详情
  this.projectdetailID=this.homeProject[i].projectID;
  localStorage.setItem("projectdetailID",this.projectdetailID);

  let profileModal = this.modalCtrl.create(ProjectDetailPage);
  profileModal.present();
}
opcheck(i){//查看系统作品详情
  this.projectdetailID=this.homeProject[i].projectID;
  localStorage.setItem("projectdetailID",this.projectdetailID);

  let profileModal = this.modalCtrl.create(OfficalprojectPage);
  profileModal.present();
}
upcheck(i){//查看用户作品详情
  this.projectdetailID=this.homeProject[i].pID;
  localStorage.setItem("projectdetailID",this.projectdetailID);

  let profileModal = this.modalCtrl.create(UserprojectPage);
  profileModal.present();
}
//删除作品
pdelete(i){//删除推荐作品
  this.projectdetailID=this.homeProject[i].projectID;
  this.http.post('/api/homeProject/delete',{projectID:this.projectdetailID}).subscribe(data=>{
    console.log(data);
  });
  this.http.get('/api/homeProject').subscribe(data=>{  //请求首页推荐作品
    this.homeProject=Array.prototype.slice.call(data); 
    console.log(this.homeProject);
  });
}
opdelete(i){//删除系统作品
  this.projectdetailID=this.homeProject[i].projectID;
  this.http.post('/api/officialProject/delete',{projectID:this.projectdetailID}).subscribe(data=>{
    console.log(data);
  })
}
updelete(i){//删除用户作品
  this.projectdetailID=this.homeProject[i].projectID;
  this.http.post('/api/userProject/delete',{projectID:this.projectdetailID}).subscribe(data=>{
    console.log(data);
  })
}

//推送用户作品到推荐
uppush(i){
  this.projectdetailID=this.homeProject[i].pID;
  this.http.post('/api/userProject/push',{projectID:this.projectdetailID}).subscribe(data=>{
    console.log(data);
  })
}

  homeSchedule=[]; //推荐日程管理
  endSix(i){
    this.http.get('/api/homeSchedule').subscribe(data=>{  //请求首页推荐日程信息
      this.homeSchedule=Array.prototype.slice.call(data);
    });
  }

  hsID; //首页推荐日程id
  homeScheduleCheck(i){ //查看首页推荐日程详情
    this.hsID=this.homeSchedule[i].hsID;
    console.log(this.hsID);
    localStorage.setItem("hsDetailID",this.hsID);
    let profileModal = this.modalCtrl.create(HomeScheduleDetailPage);
    profileModal.present();
  }

  newHS(){ //新建首页推荐日程详情
    let profileModal = this.modalCtrl.create(NewhomeSchedulePage);
    profileModal.present();
  }

  

  file;
  img;
  inp;
  upload(){  //上传文件
    this.img=document.getElementById('img');
    var btn=document.getElementById('btn');
    this.inp=document.getElementById('inp'); 
    // 2.获取上传的数据
    var getData=this.inp.files[0];
    console.log(getData.name);
    // 2.1创建格式化数据，
    var fd=new FormData();
    // 2.2格式化数据并以键值对的形式存放到fd对象中
    fd.append('imageIcon',getData);
    // 3.1创建XMLHttpRequest对象
    var xhr=new XMLHttpRequest();
    // 3.2使用open方法,设置请求
    xhr.open('POST','/api/ajaxUpload',true)
    // 3.3使用send方法发送数据
    xhr.send(fd);
    // 3.4监听发送数据状态
    var that=this;
    xhr.onreadystatechange=function(){
      if(xhr.readyState===4){
        console.log(xhr.responseText);
        that.img.src=xhr.responseText;
        //imga.src='http://192.168.73.144:8080/avatar/1544688041115.jpg';
        //console.log(imga.src);
      }
    }
  }
  
  
}

