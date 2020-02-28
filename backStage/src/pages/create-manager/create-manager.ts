import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, TabHighlight } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-create-manager',
  templateUrl: 'create-manager.html',
})
export class CreateManagerPage {

  
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoa CreateManagerPage');
  }

  managerID;
  managerName;
  sex;
  email;
  phoneNum;
  password;
  isForbid;
  newBack;
  manager;
  
  save(){
    console.log("数据添加连接到数据库");
    this.http.post('/api/createManager',{managerID:this.managerID,managerName:this.managerName,sex:this.sex,email:this.email,password:this.password,phoneNum:this.phoneNum,isForbid:this.isForbid}).subscribe(data=>{
      this.newBack = data;
      if(this.newBack.status == 1){
        const alert = this.alertCtrl.create({
          title: '添加成功',
          subTitle: '',
          buttons: ['OK']
        });
        // this.http.post('/api/managerinfo',{}).subscribe(data=>{  
        // this.manager=Array.prototype.slice.call(data); 
        // console.log(this.manager);
        // });
       
        alert.present();
      }
      
    });

  }

  back(){
      this.navCtrl.pop();
      
  }
}