import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-news-texr',
  templateUrl: 'news-texr.html',
})
export class NewsTexrPage {

  constructor(public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsTexrPage');
  }
  newsID;
  news;
  text;
  ionViewWillEnter(){
      this.newsID=localStorage.getItem('newsID');
      this.http.post('/api/news/texr',{newsID:this.newsID}).subscribe(data=>{
        this.news=JSON.stringify(data);
        this.text=this.news.slice(13,-3);
        // console.log(this.news);
      });
  }

  //返回上一页
  back(){
    this.navCtrl.pop();
  }
}
