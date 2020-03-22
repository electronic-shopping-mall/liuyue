import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-create-product',
  templateUrl: 'create-product.html',
})
export class CreateProductPage {

  constructor(public http:HttpClient,public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProductPage');
  }
  productDetails=[];
  products;
  productID;
  title; //双向数据绑定
  parentType;
  childType;
  describeText;
  detail;
  images;

  type;
  price;
  stockNum;

  detailimg;
  imageimg;
  detailFile;
  imagesFile;
  
  newBack; //修改完成后从后端返回的数据
  string; //修改完后要传到数据库的数据
  create(){
    this.detailimg=document.getElementById('detailimg');
    this.imageimg=document.getElementById('imageimg');
    this.detailFile=document.getElementById('detailFile');//获取file节点
    this.imagesFile=document.getElementById('imagesFile');//获取file节点
      var getData1=this.detailFile.files[0];//读取file数据
      var getData11=this.detailFile.files[1];
      var getData12=this.detailFile.files[2];
      var getData13=this.detailFile.files[3];
      this.detail= '../assets/imgs/product/'+getData1.name +'|'+'../assets/imgs/product/'+getData11.name+'|'+'../assets/imgs/product/'+getData12.name+'|'+'../assets/imgs/product/'+getData13.name;//字符串拼接

      var getData2=this.imagesFile.files[0];//读取file数据
      var getData21=this.imagesFile.files[1];
      var getData22=this.imagesFile.files[2];
      var getData23=this.imagesFile.files[3];
      this.images= '../assets/imgs/product/'+getData2.name+'|'+'../assets/imgs/product/'+getData21.name+'|'+'../assets/imgs/product/'+getData22.name+'|'+'../assets/imgs/product/'+getData23.name;//字符串拼接

    console.log(this.detail);
    console.log(this.images);

    this.http.post('/api/product/createproductinfo',{productID:this.productID,title:this.title,price:this.price,parentType:this.parentType,childType:this.childType,describeText:this.describeText,detail:this.detail,images:this.images}).subscribe(data=>{//添加数据到数据库
      this.newBack=data;
      if(this.newBack.status==1){
        this.navCtrl.pop();
        const alert = this.alertCtrl.create({
          title: '添加成功',
          subTitle: '',
          buttons: ['OK']
        });
        alert.present();
      }
    })
    
    this.http.post('/api/product/createspecification',{productID:this.productID,type:this.type,stockNum:this.stockNum}).subscribe(data=>{
      this.newBack=data;
    })

  }
  back(){
    this.navCtrl.pop();
  }
}
