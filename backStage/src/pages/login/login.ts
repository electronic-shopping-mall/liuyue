import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  phone;
  pwd;
  arr;
  managerData;
  text;
  constructor(private http:HttpClient,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    //测试请求到一个数据项
    // this.http.post('/api/test',{"id":111123}).subscribe(data=>{
    //   console.log(data);
    //   this.text = data[0].sex;
    //   // this.text=Array.prototype.slice.call(data)
    //   console.log(this.text);
    // })
    //测试我写的请求管理员信息
    // this.http.post('/api/managerInfo',{}).subscribe(data=>{
    //   this.managerData = Array.prototype.slice.call(data);
    //   console.log(data);
    // })


    

    // this.http.post('/api/productInfo',{id:111123}).subscribe(data=>{
    //   this.product=Array.prototype.slice.call(data)[''];
    //   this.imgs=this.product.detail.split('|');
    //   // console.log(this.imgs);
    // })
  };
    // imgs;
    // product;



  //点击验证登录成功！
  btn(){
    console.log(this.phone);
    localStorage.setItem('managerName',this.phone);
    this.http.post('/api/login',{phone:this.phone,pwd:this.pwd}).subscribe(data=>{
        this.arr=data;
        console.log(this.arr);
        if(this.arr.status==1){ //不存在此管理员
          const alert = this.alertCtrl.create({
            title: '登录失败',
            subTitle: '您不是管理员',
            buttons: ['返回']
          });
          alert.present();
        }else if(this.arr.status==2){
          const alert2 = this.alertCtrl.create({
            title: '登录失败',
            subTitle: '请输入正确的密码信息',
            buttons: ['返回']
          });
          alert2.present();  
        }else if(this.arr.status==3){
          const alert3 = this.alertCtrl.create({
            title: '登录失败',
            subTitle: '您的账号已经被禁用',
            buttons: ['返回']
          });
          alert3.present();  
        }else{
          this.navCtrl.push(HomePage);
        }
      });
  }
}
