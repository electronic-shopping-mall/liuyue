import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-create-news',
  templateUrl: 'create-news.html',
})
export class CreateNewsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient,public alertCtrl:AlertController) {
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateNewsPage');
  }
  timeget;
  getTime(){//.toLocaleString
    var timestr = new Date();
    this.timeget = timestr.toString();
    console.log(this.timeget);
    var newstime = document.getElementById("newstime");
    newstime.innerHTML=this.timeget;
  }
  fileinp;
  img;
  newBack; //修改完成后从后端返回的数据
  string; //修改完后要传到数据库的数据
  save(){
    this.time=this.timeget;
    console.log("将资讯信息保存到数据库");
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
          title: '添加成功',
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

  back(){
    this.navCtrl.pop();
  }


}
