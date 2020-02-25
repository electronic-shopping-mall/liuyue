import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the NewhomeSchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newhome-schedule',
  templateUrl: 'newhome-schedule.html',
})
export class NewhomeSchedulePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewhomeSchedulePage');
  }

  theme; //双向数据绑定
  time; //双向数据绑定
  title; //双向数据绑定
  detailTimeone; //双向数据绑定
  detailTimetwo; //双向数据绑定
  detailone=''; //双向数据绑定
  detailtwo=''; //双向数据绑定
  detailoneArr; 
  detailtwoArr;
  stringone;
  stringtwo;

  fileinp;
  img;
  imgUrl;
  newBack;
  save(){  
    this.img=document.getElementById('img');
    var btn=document.getElementById('btn');
    this.fileinp=document.getElementById('fileinp'); 
    // 2.获取上传的数据
    var getData=this.fileinp.files[0];
    console.log(getData.name);
    // 2.1创建格式化数据，
    var fd=new FormData();
    // 2.2格式化数据并以键值对的形式存放到fd对象中
    fd.append('imageIcon',getData);
    // 3.1创建XMLHttpRequest对象
    var xhr=new XMLHttpRequest();
    // 3.2使用open方法,设置请求
    xhr.open('POST','/api/uploadhsPicture',true)
    // 3.3使用send方法发送数据
    xhr.send(fd);
    // 3.4监听发送数据状态
    var that=this;
    xhr.onreadystatechange=function(){
      if(xhr.readyState===4){
        console.log(xhr.responseText);
        that.img.src=xhr.responseText;
        that.imgUrl=xhr.responseText;
        that.detailoneArr=that.detailone.split('\n');
        that.detailtwoArr=that.detailtwo.split('\n');
        that.stringone=that.detailoneArr.join('|');
        that.stringtwo=that.detailtwoArr.join('|');
        console.log(that.imgUrl);
        that.http.post('/api/newHomeSchedule',{theme:that.theme,time:that.time,title:that.title,imgUrl:that.imgUrl,detailTimeone:that.detailTimeone,detailTimetwo:that.detailTimetwo,detailone:that.stringone,detailtwo:that.stringtwo}).subscribe(data=>{
          that.newBack=data;
          if(that.newBack.status==1){
            const alert = that.alertCtrl.create({
              title: '添加成功',
              subTitle: '',
              buttons: ['OK']
            });
            alert.present();
          }
        });     
      }
    }
  }

  sure(){
    //检查是否为图像文件
    this.fileinp = document.getElementById("fileinp");
    var file=this.fileinp.files[0];
    if(!/image\/\w+/.test(file.type))
    {
      alert("请确保文件为图像类型");
      return false;
    }    
    var reader = new FileReader();
    reader.readAsDataURL(file);
    var that=this;
    reader.onload = function(e)
    {
      that.img=document.getElementById("img");
      that.img.src = this.result; //this.result属性代表文件读取结果
    }
  }

  back(){
    this.navCtrl.pop();
  }
}
