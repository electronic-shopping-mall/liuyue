import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html',
})
export class NewsDetailPage {
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsDetailPage');
    this.newsID=localStorage.getItem('newsID');
    // this.type=localStorage.getItem('type');
    this.http.post('/api/news/detail',{newsID:this.newsID}).subscribe(data=>{
      this.news=Array.prototype.slice.call(data); 
    // console.log(this.news);
    })
    
  }
  news;
  newsDetail=[];
  newsID;
  type; //双向数据绑定
  time; //双向数据绑定
  title; //双向数据绑定
  pictures;
  content; //双向数据绑定
  detailArr;  

  fileinp;
  img;

  newBack; //修改完成后从后端返回的数据
  string; //修改完后要传到数据库的数据
  save(){
    // this.time=this.timeget;
    // console.log("将资讯信息保存到数据库");
    this.img=document.getElementById('img');
    this.fileinp=document.getElementById('fileinp');//获取file节点
    var getData=this.fileinp.files[0];//读取file数据
    console.log(getData.name);
    //对不起，这是投机取巧的方法
    this.pictures = '../assets/imgs/news/'+getData.name;//字符串拼接
    console.log(this.pictures);
    this.http.post('/api/news/create',{newsID:this.newsID,type:this.type,title:this.title,content:this.content,pictures:this.pictures,time:this.time}).subscribe(data=>{//添加数据到数据库
      this.newBack=data;
      if(this.newBack.status==1){
        // this.navCtrl.pop();
        const alert = this.alertCtrl.create({
          title: '修改成功',
          subTitle: '',
          buttons: [
            {
              text:'ok',
              handler:()=>{
                // this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
      }
    })
    
  }

  alterInfo(){
    var inp=document.getElementsByTagName('input');
    for(var i=0;i<inp.length;i++){
      inp[i].removeAttribute('readonly');  //去掉只读属性 修改信息
    };
    var textarea=document.getElementsByTagName('textarea');
    for(var j=0;j<textarea.length;j++){
      textarea[j].removeAttribute('readonly');
    }
  }


  back(){
    this.navCtrl.pop();
  }
}
