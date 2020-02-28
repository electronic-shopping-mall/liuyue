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

  newsDetail=[];
  newsID;
  theme; //双向数据绑定
  time; //双向数据绑定
  title; //双向数据绑定
  images;
  detail; //双向数据绑定
  detailArr; 
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateNewsPage');
  }

  // alterInfo(){
  //   var inp=document.getElementsByTagName('input');
  //   for(var i=0;i<inp.length;i++){
  //     inp[i].removeAttribute('readonly');  //去掉只读属性 修改信息
  //   };
  //   var textarea=document.getElementsByTagName('textarea');
  //   for(var j=0;j<textarea.length;j++){
  //     textarea[j].removeAttribute('readonly');
  //   }
  //   var btn=document.getElementById('btn');
  //   btn.removeAttribute('disabled');
  // }
  fileinp;
  img;
  newBack; //修改完成后从后端返回的数据
  string; //修改完后要传到数据库的数据
  save(){
    console.log("将资讯信息保存到数据库");
    //this.img=document.getElementById('img');
    this.fileinp=document.getElementById('fileinp');//获取file节点
    var getData=this.fileinp.files[0];//读取file数据
    console.log(getData.name);
    //对不起，这是投机取巧的方法
    this.images = '../assets/imgs/product/'+getData.name;//字符串拼接
    console.log(this.images);
    this.http.post('/api/news/create',{newsID:this.newsID,theme:this.theme,time:this.time,title:this.title,images:this.images,detail:this.detail}).subscribe(data=>{//添加数据到数据库
      this.newBack=data;
      if(this.newBack.status==1){
        const alert = this.alertCtrl.create({
          title: '添加成功',
          subTitle: '',
          buttons: ['OK']
        });
        alert.present();
      }
    })
  }

  back(){
    this.navCtrl.pop();
  }

  // upload(){  //上传文件
  //   this.img=document.getElementById('img');
  //   var btn=document.getElementById('btn');
  //   this.fileinp=document.getElementById('fileinp'); 
  //   // 2.获取上传的数据
  //   var getData=this.fileinp.files[0];
  //   console.log(getData.name);
  //   // 2.1创建格式化数据，
  //   var fd=new FormData();
  //   // 2.2格式化数据并以键值对的形式存放到fd对象中
  //   fd.append('imageIcon',getData);
  //   // 3.1创建XMLHttpRequest对象
  //   var xhr=new XMLHttpRequest();
  //   // 3.2使用open方法,设置请求
  //   xhr.open('POST','/api/news/uploadPicture',true)
  //   // 3.3使用send方法发送数据
  //   xhr.send(fd);
  //   // 3.4监听发送数据状态
  //   var that=this;
  //   xhr.onreadystatechange=function(){
  //     if(xhr.readyState===4){
  //       console.log(xhr.responseText);
  //       that.img.src=xhr.responseText;
  //       //imga.src='http://192.168.73.144:8080/avatar/1544688041115.jpg';
  //       //console.log(imga.src);
  //     }
  //   }
  // }

}
