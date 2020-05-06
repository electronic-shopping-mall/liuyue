import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, ModalController, App, AlertController, NavParams } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { LoginPage } from '../login/login';

import * as echarts from 'echarts'; 

import { CreateManagerPage } from '../create-manager/create-manager';
import { ProductDetailPage } from '../product-detail/product-detail';
import { ReviseManagerPage } from '../revise-manager/revise-manager';
import { CreateNewsPage } from '../create-news/create-news';
import { CreateProductPage } from '../create-product/create-product';
import { NewsDetailPage } from '../news-detail/news-detail';
import { NewsImagePage } from '../news-image/news-image';
import { NewsTexrPage } from '../news-texr/news-texr';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // alertCtrl: any;
  constructor(public navCtrl: NavController,public navParams: NavParams,public alertCtrl:AlertController,private http:HttpClient,public modalCtrl: ModalController,public app:App) {
    console.log(echarts);
  }
  goLogin(){ //退出登录
    this.app.getRootNavs()[0].setRoot(LoginPage);
  }
 
  num=10;
  managerName;
  flag=false;

  manager=[];  //用户账号管理
  ionViewDidLoad(){
    this.managerName=localStorage.getItem('managerName');
  }
  ionViewWillEnter(){
    // this.http.post('/api/managerinfo',{}).subscribe(data=>{   
    //   this.manager=Array.prototype.slice.call(data); 
    // });
    // this.http.post('/api/news',{id:4444}).subscribe(data=>{  
    //   this.news=Array.prototype.slice.call(data); 
    //   console.log(this.news);
    // });
  }

  //设置导航栏点击事件 成功
  lis;
  p;
  fun(i){
    this.p=document.getElementById("p");
    this.p.style.display="none";
    this.num=i;
    this.lis=document.getElementsByClassName('li');
    this.lis[i-1].style.backgroundColor='#18A0A9';
    for(var j=0;j<this.lis.length;j++){
      if(j!=i-1){
        this.lis[j].style.backgroundColor='#32c2cd';
      }
    }
    if(i==1){this.endOne(i);  //管理员信息
    }else if(i==2){this.endTwo(i);  //用户信息
    }else if(i==3){this.endThree(i);  //商品信息
    }else if(i==4){this.endFour(i); //资讯信息
    }else if(i==5){this.endFive(i); //销售管理
    }else if(i==6){this.endSix(i);  //出库登记
    }else{ this.endSeven()};
  }

  //请求管理员账号信息 成功
  endOne(i){
    this.http.post('/api/managerinfo',{}).subscribe(data=>{   
      this.manager=Array.prototype.slice.call(data); 
    });
  }


  isForbid;  //冻结账号返回的信息
  managerID;  //管理员的ID
  freeze(i){  //冻结管理员账号 成功
    this.managerID=this.manager[i].managerID;
    console.log(this.managerID);
    var us=document.getElementsByClassName('isForbid')[i];
    us.innerHTML='是';
    this.http.post('/api/freezeManager',{isForbid:this.isForbid,managerID:this.managerID}).subscribe(data=>{
      this.isForbid=data;
      console.log(this.isForbid.info);
    });
    const alert = this.alertCtrl.create({
      title: '禁用成功',
      subTitle: '',
      buttons: ['OK']
    });
    alert.present();
  }
  unfreeze(j){  //解冻管理员账号 成功
    this.managerID=this.manager[j].managerID;
    console.log(this.managerID);
    var us=document.getElementsByClassName('isForbid')[j];
    us.innerHTML='否';
    this.http.post('/api/unfreezeManager',{isForbid:this.isForbid,managerID:this.managerID}).subscribe(data=>{
      this.isForbid=data;
      console.log(this.isForbid.info);
      })
      const alert = this.alertCtrl.create({
        title: '解禁成功',
        subTitle: '',
        buttons: ['OK']
      });
      alert.present();
  } 

  typeTextone;
  textone;
  searchone(){//按照类型查询管理员信息 成功
    console.log(this.typeTextone);
    console.log(this.textone);
    if(this.typeTextone=='all'){
      this.http.post('/api/managerInfo',{}).subscribe(data=>{
        this.manager=Array.prototype.slice.call(data); 
      });
    }else if(this.typeTextone=='phone'){
      this.http.post('/api/searchone/phoneNum',{phoneNum:this.textone}).subscribe(data=>{
        this.manager=Array.prototype.slice.call(data); 
      });
    }else if(this.typeTextone=='sex'){
      this.http.post('/api/searchone/sex',{sex:this.textone}).subscribe(data=>{
        this.manager=Array.prototype.slice.call(data); 
      });
    }else if(this.typeTextone=='id'){
      this.http.post('/api/searchone/id',{id:this.textone}).subscribe(data=>{
        this.manager=Array.prototype.slice.call(data); 
      });
    }
  }

  newManager(){//新建一个管理员 成功
      let profileModal = this.modalCtrl.create(CreateManagerPage);
      profileModal.present();
  }

  managerDelete(i){ //删除一个管理员 成功
    this.managerID=this.manager[i].managerID;
    this.http.post('/api/managerinfo/delete',{managerID:this.managerID}).subscribe(data=>{
      console.log(data);
    });
    this.http.post('/api/managerinfo',{}).subscribe(data=>{  
      this.manager=Array.prototype.slice.call(data); 
      console.log(this.manager);
    });
    const alert = this.alertCtrl.create({
      title: '删除成功',
      subTitle: '',
      buttons: ['OK']
    });
    alert.present();
  }

  managerRevise(id){//修改管理员信息弹出页面 成功
    localStorage.setItem('managerID',id);
    let profileModal = this.modalCtrl.create(ReviseManagerPage);
    profileModal.present();
  }


  user=[];  //用户信息管理
  endTwo(i){
    this.http.post('/api/userInfo',{}).subscribe(data=>{  //请求用户活动信息
      this.user=Array.prototype.slice.call(data); 
    });
  }

  status;  //冻结账号返回的信息
  userID;  //用户的ID
  freezeUser(i){  //冻结用户账号 成功
    this.userID=this.user[i].userID;
    console.log(this.userID);
    var us=document.getElementsByClassName('userStatus')[i];
    us.innerHTML='禁用';
    this.http.post('/api/freezeUser',{userID:this.userID,status:this.status}).subscribe(data=>{
      this.status=data;
      console.log(this.status.info);
    });
    const alert = this.alertCtrl.create({
      title: '禁用成功',
      subTitle: '',
      buttons: ['OK']
    });
    alert.present();
  }
  unfreezeUser(j){  //解冻用户账号 成功
    this.userID=this.user[j].userID;
    console.log(this.userID);
    var us=document.getElementsByClassName('userStatus')[j];
    us.innerHTML='正常';
    this.http.post('/api/unfreezeUser',{userID:this.userID,status:this.status}).subscribe(data=>{
      this.status=data;
      console.log(this.status.info);
      })
  }

  //分类查询用户信息 成功
  typeTexttwo;
  texttwo;
  searchtwo(){
    console.log(this.typeTexttwo);
    console.log(this.texttwo);
    if(this.typeTexttwo=='all'){//查询all用户信息
      this.http.post('/api/userInfo',{}).subscribe(data=>{
        this.user=Array.prototype.slice.call(data); 
      });
    }else if(this.typeTexttwo=='id'){//按照id号查询用户信息
      this.http.post('/api/searchtwo/id',{userID:this.texttwo}).subscribe(data=>{
        this.user=Array.prototype.slice.call(data); 
      });
    }else if(this.typeTexttwo=='name'){//按照name查询用户信息
      this.http.post('/api/searchtwo/name',{userName:this.texttwo}).subscribe(data=>{
        this.user=Array.prototype.slice.call(data); 
      });
    }
  }

  search;
  clear(){
    this.search=document.getElementsByClassName('search');
    console.log(this.search.length);
    for(var i=0;i<this.search.length;i++){
      console.log(this.search[i]);
      this.search[i].value='';
    }
  }

//商品信息请求 成功
productInfo;
endThree(i){
  this.http.post('/api/productInfo',{}).subscribe(data=>{  
    this.productInfo=Array.prototype.slice.call(data); 
  });
}

type;
//删除商品
productDelete(i){
  this.productID=this.productInfo[i].productID;
  this.type=this.productInfo[i].type;
  this.http.post('/api/product/delete',{productID:this.productID,type:this.type}).subscribe(data=>{
    console.log(data);
  });
  this.http.post('/api/productInfo',{}).subscribe(data=>{  
    this.productInfo=Array.prototype.slice.call(data);
  });
  const alert = this.alertCtrl.create({
    title: '删除成功',
    subTitle: '',
    buttons: ['OK']
  });
  alert.present();
}

productID;
//商品两种类型图片的查看 成功
productDetail(id){
    localStorage.setItem('productID',id);
    let profileModal = this.modalCtrl.create(ProductDetailPage);
    profileModal.present();
  
}

//分类查询商品信息 成功
typeTextthree;
textthree;
searchthree(){
  console.log(this.typeTextthree);
  console.log(this.textthree);
  if(this.typeTextthree=='all'){//请求所有商品
    this.http.post('/api/productInfo',{}).subscribe(data=>{  
      this.productInfo=Array.prototype.slice.call(data); 
    });
  }else if(this.typeTextthree=='productID'){//请求商品ID号为...的商品
    this.http.post('/api/searchthree/productID',{productID:this.textthree}).subscribe(data=>{
      this.productInfo=Array.prototype.slice.call(data); 
    })
  }else if(this.typeTextthree=='title'){//请求title为...的商品
    this.http.post('/api/searchthree/title',{title:this.textthree}).subscribe(data=>{
      this.productInfo=Array.prototype.slice.call(data); 
    })
  }else if(this.typeTextthree=='parentType'){//请求parentType为..的商品
    this.http.post('/api/searchthree/parentType',{parentType:this.textthree}).subscribe(data=>{
      this.productInfo=Array.prototype.slice.call(data);
    });
  }
}

//添加一个新商品
createProduct(){
  let profileModal = this.modalCtrl.create(CreateProductPage);
  profileModal.present();
}

//请求所有资讯信息 成功啦
news;
endFour(i){//请求资讯
  this.http.post('/api/news',{id:4444}).subscribe(data=>{  
    this.news=Array.prototype.slice.call(data); 
  });
  
  
}

//查看修改资讯 废弃
newsDetail(id){ 
  localStorage.setItem('newsID',id);
  let profileModal = this.modalCtrl.create(NewsDetailPage);
  profileModal.present();
}
//删除资讯
newsDelete(i){
  this.newsID=this.news[i].newsID;
  this.http.post('/api/news/delete',{newsID:this.newsID}).subscribe(data=>{
    console.log(data);
  });
  this.http.post('/api/news',{}).subscribe(data=>{  
    this.news=Array.prototype.slice.call(data); 
    console.log(this.news);
  });
  const alert = this.alertCtrl.create({
    title: '删除成功',
    subTitle: '',
    buttons: ['OK']
  });
  alert.present();
}

//查看news文本文字 成功
newsTexr(id){
  localStorage.setItem('newsID',id);
  let profileModal = this.modalCtrl.create(NewsTexrPage);
  profileModal.present();
}

//查看news图片 成功
newsID;
newsImg(id){
  localStorage.setItem('newsID',id);
  let profileModal = this.modalCtrl.create(NewsImagePage);
  profileModal.present();
}

//新建资讯 成功啦
createNews(){ 
  let profileModal = this.modalCtrl.create(CreateNewsPage);
  profileModal.present();
}

//分类查询资讯 成功
typeTextfour;
textfour;
searchfour(){
  if(this.typeTextfour=='all'){
    this.http.post('/api/news',{}).subscribe(data=>{  //请求所有资讯
      this.news=Array.prototype.slice.call(data); 
    });
  }else if(this.typeTextfour=='type'){//按照类型查询
    this.http.post('/api/searchfour/type',{type:this.textfour}).subscribe(data=>{
      this.news=Array.prototype.slice.call(data); 
      console.log("按类型搜索：",this.news);
    })
  }else if(this.typeTextfour=='title'){//请求标题查询
    this.http.post('/api/searchfour/title',{title:this.textfour}).subscribe(data=>{
      this.news=Array.prototype.slice.call(data); 
      console.log("按标题搜索：",this.news);
    });
  }
}


sales;
count=[];
allprice;
//查看商品销售额
endFive(i){
  this.http.post('/api/sales',{}).subscribe(data=>{
    this.sales=Array.prototype.slice.call(data);

    for(i=0;i<this.sales.length;i++){
      var price = this.sales[i].price;
      var soldNum = this.sales[i].soldNum;
      this.count[i] = price * soldNum;     
    }
    var s = 0;
    for(i=0;i<this.count.length;i++){
      s += this.count[i];
    }
    this.allprice = s;
  })
  
}

//分类查询销售情况 成功
typeTextfive;
textfive;
searchfive(i){
  console.log(this.typeTextfive);
  console.log(this.textfive);
  if(this.typeTextfive=='all'){//请求所有商品
    this.http.post('/api/sales',{}).subscribe(data=>{  
      this.sales=Array.prototype.slice.call(data);
      for(i=0;i<this.sales.length;i++){
        var price = this.sales[i].price;
        var soldNum = this.sales[i].soldNum;
        this.count[i] = price * soldNum;     
      }
      var s = 0;
      for(i=0;i<this.count.length;i++){
        s += this.count[i];
      }
      this.allprice = s;
    });
  }else if(this.typeTextfive=='childType'){
    this.http.post('/api/searchfive/childType',{childType:this.textfive}).subscribe(data=>{
      this.sales=Array.prototype.slice.call(data); 
      for(i=0;i<this.sales.length;i++){
        var price = this.sales[i].price;
        var soldNum = this.sales[i].soldNum;
        this.count[i] = price * soldNum;     
      }
      var s = 0;
      for(i=0;i<this.count.length;i++){
        s += this.count[i];
      }
      this.allprice = s;
    })
  }else if(this.typeTextfive=='title'){
    this.http.post('/api/searchfive/title',{title:this.textfive}).subscribe(data=>{
      this.sales=Array.prototype.slice.call(data); 
      for(i=0;i<this.sales.length;i++){
        var price = this.sales[i].price;
        var soldNum = this.sales[i].soldNum;
        this.count[i] = price * soldNum;     
      }
      var s = 0;
      for(i=0;i<this.count.length;i++){
        s += this.count[i];
      }
      this.allprice = s;
    })
  }else if(this.typeTextfive=='productID'){
    this.http.post('/api/searchfive/productID',{productID:this.textfive}).subscribe(data=>{
      this.sales=Array.prototype.slice.call(data);
      for(i=0;i<this.sales.length;i++){
        var price = this.sales[i].price;
        var soldNum = this.sales[i].soldNum;
        this.count[i] = price * soldNum;     
      }
      var s = 0;
      for(i=0;i<this.count.length;i++){
        s += this.count[i];
      }
      this.allprice = s;
    });
  }
}

//查看订单 ok
orders=[];
endSix(i){
  this.http.post('/api/check/orderInfo',{}).subscribe(data=>{  
    this.orders=Array.prototype.slice.call(data); 
  });
}

//分类查询订单
typeTextsix;
textsix;
searchsix(){
  if(this.typeTextsix=='all'){
    this.http.post('/api/check/orderInfo',{}).subscribe(data=>{
      this.orders=Array.prototype.slice.call(data);
       console.log(this.orders)
    });
  }else if(this.typeTextsix=='orderStatus'){
    this.http.post('/api/searchsix/status',{orderStatus:this.textsix}).subscribe(data=>{
      this.orders=Array.prototype.slice.call(data);
      console.log(this.orders)
    })
  }else if(this.typeTextsix=='userID'){
    this.http.post('/api/searchsix/userID',{userID:this.textsix}).subscribe(data=>{
      this.orders=Array.prototype.slice.call(data);
    });
  }else if(this.typeTextsix=='productID'){
    this.http.post('/api/searchsix/productID',{productID:this.textsix}).subscribe(data=>{
      this.orders=Array.prototype.slice.call(data);
    });
  }
}

//修改订单状态 失败
orderStatus;
orderNumber;
statusback;
stockNum;
soldNum;
amount;
out(i){
    this.orderNumber=this.orders[i].orderNumber;
    this.productID=this.orders[i].productID;
    this.type=this.orders[i].type;
    this.stockNum=this.orders[i].stockNum;
    this.soldNum=this.orders[i].soldNum;
    this.amount=this.orders[i].amount;
    console.log(this.amount);
    console.log(this.orderNumber);
    console.log(this.productID);
    console.log(this.type);
    var ors=document.getElementsByClassName('orderstatus')[i];
    ors.innerHTML='已发货';
    var stock =document.getElementsByClassName('stockNum')[i];
    this.stockNum = this.stockNum -this.amount;
    this.soldNum = this.soldNum +this.amount;
    console.log(this.stockNum);
    console.log(this.soldNum);
    this.http.post('/api/order/out',{orderNumber:this.orderNumber,productID:this.productID,type:this.type,stockNum:this.stockNum,soldNum:this.soldNum,amount:this.amount}).subscribe(data=>{
      this.statusback=data;
      console.log(this.statusback.info);    
    });
    
    const alert = this.alertCtrl.create({
      title: '出库成功',
      subTitle: '',
      buttons: ['OK']
    });
    alert.present();
 } 

endSeven(){

}

}


