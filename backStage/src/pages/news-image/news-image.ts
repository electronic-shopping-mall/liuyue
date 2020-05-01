import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-news-image',
  templateUrl: 'news-image.html',
})
export class NewsImagePage {

  constructor(public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsImagePage');
  }
  newsID;
  news;
  image;
  str;
  num=0;
  ionViewWillEnter(){
      this.newsID=localStorage.getItem('newsID');
      this.http.post('/api/news/image',{newsID:this.newsID}).subscribe(data=>{
        this.news=JSON.stringify(data);
        this.str=this.news.slice(15,-3);
        this.image=this.str.split("|");
        // console.log(this.image);
      });
  }

  //返回上一页
  back(){
    this.navCtrl.pop();
  }
}
