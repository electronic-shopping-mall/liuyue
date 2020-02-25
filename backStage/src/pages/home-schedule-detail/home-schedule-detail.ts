import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the HomeScheduleDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-schedule-detail',
  templateUrl: 'home-schedule-detail.html',
})
export class HomeScheduleDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient,public alertCtrl:AlertController) {
  }

  hsID;
  detailoneID;
  detailtwoID;
  homeScheduleDetail=[];
  theme; //双向数据绑定
  time; //双向数据绑定
  title; //双向数据绑定
  detailTimeone; //双向数据绑定
  detailTimetwo; //双向数据绑定
  detailone=''; //双向数据绑定
  detailtwo=''; //双向数据绑定
  detailoneArr; 
  detailtwoArr;
  ionViewDidLoad() {
    this.hsID=localStorage.getItem('hsDetailID');
    this.http.post('/api/homeScheduleDetail',{hsID:this.hsID}).subscribe(data=>{
      this.homeScheduleDetail=Array.prototype.slice.call(data);
      console.log(this.homeScheduleDetail);
      this.theme=this.homeScheduleDetail[0].theme;
      this.time=this.homeScheduleDetail[0].time;
      this.title=this.homeScheduleDetail[0].title;
      this.detailoneID=this.homeScheduleDetail[0].hsdetailID;
      this.detailtwoID=this.homeScheduleDetail[1].hsdetailID;
      this.detailTimeone=this.homeScheduleDetail[0].detailTime;
      this.detailTimetwo=this.homeScheduleDetail[1].detailTime;
      this.detailoneArr=this.homeScheduleDetail[0].detail.split('|');
      this.detailtwoArr=this.homeScheduleDetail[1].detail.split('|');
      for(var i=0;i<this.detailoneArr.length;i++){
        this.detailone+=this.detailoneArr[i]+'\n';
      }
      for(var j=0;j<this.detailtwoArr.length;j++){
        this.detailtwo+=this.detailtwoArr[j]+'\n';
      }
      // for(var i=0;i<this.homeScheduleDetail.length;i++){
      //   this.detailArr=this.homeScheduleDetail[i].detail.split('|');
      //   for(var j=0;j<this.detailArr.length;j++){
      //     this.detail+=this.detailArr[j]+'\n';
      //   }
      // }
    });
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
    var btn=document.getElementById('btn');
    btn.removeAttribute('disabled');
  }

  alterBack; //修改完成后从后端返回的数据
  stringone; //修改完后要传到数据库的数据
  stringtwo;
  save(){
    console.log(this.detailoneID);
    console.log(this.detailtwoID);
    this.detailoneArr=this.detailone.split('\n');
    this.detailtwoArr=this.detailtwo.split('\n');
    this.stringone=this.detailoneArr.join('|');
    this.stringtwo=this.detailtwoArr.join('|');
    this.http.post('/api/alterHomeSchedule',{hsID:this.hsID,theme:this.theme,title:this.title,time:this.time,detailTimeone:this.detailTimeone,detailTimetwo:this.detailTimetwo,detailone:this.stringone,detailtwo:this.stringtwo,doneID:this.detailoneID,dtwoID:this.detailtwoID}).subscribe(data=>{
      this.alterBack=data;
      if(this.alterBack.status==1){
        const alert = this.alertCtrl.create({
          title: '修改成功',
          subTitle: '',
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }

  back(){
    this.navCtrl.pop();
  }

  fileinp;
  img;
  upload(){  //上传文件
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
        //imga.src='http://192.168.73.144:8080/avatar/1544688041115.jpg';
        //console.log(imga.src);
      }
    }
  }
}
