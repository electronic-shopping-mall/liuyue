import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  constructor(public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }
  
  productID;//商品id号
  product;//商品
  detail;//详情图
  str1;//详情图切割后字符串
  image;//轮播图
  str2;//轮播图切割后字符串
  num=0;
  ionViewWillEnter(){
      this.productID=localStorage.getItem('productID');
      this.http.post('/api/productInfo/detail',{productID:this.productID}).subscribe(data=>{
        this.product=JSON.stringify(data);
        this.str1=this.product.slice(12,-3);
        this.detail=this.str1.split("|");
        // console.log(this.str1);
      });
      this.http.post('/api/productInfo/image',{productID:this.productID}).subscribe(data=>{
        this.product=JSON.stringify(data);
        this.str2=this.product.slice(12,-3);
        this.image=this.str2.split("|");
        // console.log(this.str2);
      })
  }

  

  //返回上一页
  back(){
    this.navCtrl.pop();
  }
}
