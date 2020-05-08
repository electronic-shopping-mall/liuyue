import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-revise-manager',
  templateUrl: 'revise-manager.html',
})
export class ReviseManagerPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient,public alertCtrl:AlertController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviseManagerPage');
    this.managerID=localStorage.getItem('managerID');
    this.http.post('/api/managerinfo/revise',{managerID:this.managerID}).subscribe(data=>{   
      this.manager=Array.prototype.slice.call(data);
    });
  }

  managerID;
  managerName;
  sex;
  email;
  phoneNum;
  password;
  isForbid;
  reviseBack;
  manager;
  /* */
  save(){
    console.log("数据修改连接到数据库");
    this.http.post('/api/reviseManager',{managerID:this.managerID,email:this.email,phoneNum:this.phoneNum}).subscribe(data=>{
      this.reviseBack = data;
      if(this.reviseBack.status == 1){
        const alert = this.alertCtrl.create({
          title: '修改成功',
          subTitle: '',
          buttons: ['OK']
        });
        this.managerID=localStorage.getItem('managerID');
        this.http.post('/api/managerinfo/revise',{managerID:this.managerID}).subscribe(data=>{   
          this.manager=Array.prototype.slice.call(data); 
        });
        alert.present();
      }    
    });
  }
 
  back(){
      this.navCtrl.pop();
      
  }

}
