import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ProjectDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-detail',
  templateUrl: 'project-detail.html',
})
export class ProjectDetailPage {

  constructor(public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  projectID;//作品id
  project;//作品
  imgs;//作品轮播图
  context;
  ionViewWillEnter(){
      this.projectID=localStorage.getItem('projectdetailID');
      this.http.post('/api/searchthree/projectID',{projectID:this.projectID}).subscribe(data=>{
        this.project=Array.prototype.slice.call(data)[0];
        this.imgs=this.project.imgs.split("|");
        console.log(this.project);
      })
  }
  ionViewDidLoad(){
    
  }
  //返回上一页
  back(){
    this.navCtrl.pop();
  }
  btnDel;//获取删除按钮
  delete(){
    this.http.post('/api/homeProject/delete',{projectID:this.projectID}).subscribe(data=>{
      console.log(data);
    })
  }
}
